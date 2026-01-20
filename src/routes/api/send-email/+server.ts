import {
	SMTP2GO_API_KEY,
	SMTP2GO_FROM,
	SMTP2GO_TO,
	TURNSTILE_SECRET_KEY,
	TURNSTILE_CHALLENGE_URI
} from '$env/static/private';
import { env } from '$env/dynamic/private';
import { PUBLIC_SMTP2GO_SEND_URI } from '$env/static/public';
import { json, type RequestHandler } from '@sveltejs/kit';
import { dev } from '$app/environment';

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

function rateLimit(key: string): { allowed: boolean; retryAfterSeconds?: number } {
	const now = Date.now();
	const existing = buckets.get(key);

	if (!existing || existing.resetAt <= now) {
		buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
		return { allowed: true };
	}

	if (existing.count >= MAX_PER_WINDOW) {
		return { allowed: false, retryAfterSeconds: Math.ceil((existing.resetAt - now) / 1000) };
	}

	existing.count += 1;
	buckets.set(key, existing);
	return { allowed: true };
}

function isNonEmptyString(value: unknown): value is string {
	return typeof value === 'string' && value.trim().length > 0;
}

function isPlausibleEmail(email: string): boolean {
	// Basic sanity check (avoid overly strict validation).
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

type SendEmailBody = {
	name: string;
	email: string;
	subject: string;
	message: string;
	turnstileToken: string;
};

export const POST: RequestHandler = async (event) => {
	const clientAddress = event.getClientAddress();
	const forwardedFor = event.request.headers.get('x-forwarded-for');
	const ip = (forwardedFor?.split(',')[0]?.trim() || clientAddress || 'unknown').slice(0, 128);

	const limit = rateLimit(ip);
	if (!limit.allowed) {
		return json(
			{
				ok: false,
				message: 'Too many requests. Please wait a bit and try again.'
			},
			{
				status: 429,
				headers: {
					'cache-control': 'no-store',
					...(limit.retryAfterSeconds ? { 'retry-after': String(limit.retryAfterSeconds) } : {})
				}
			}
		);
	}

	let body: unknown;
	try {
		body = await event.request.json();
	} catch {
		return json(
			{ ok: false, message: 'Invalid request. Please try again.' },
			{ status: 400, headers: { 'cache-control': 'no-store' } }
		);
	}

	const { name, email, subject, message, turnstileToken } = (body ?? {}) as Partial<SendEmailBody>;

	// Validate required fields
	if (!isNonEmptyString(name)) {
		return json(
			{ ok: false, message: 'Please enter your name.' },
			{ status: 400, headers: { 'cache-control': 'no-store' } }
		);
	}

	if (!isNonEmptyString(email)) {
		return json(
			{ ok: false, message: 'Please enter your email address.' },
			{ status: 400, headers: { 'cache-control': 'no-store' } }
		);
	}

	const trimmedEmail = email.trim();
	if (!isPlausibleEmail(trimmedEmail)) {
		return json(
			{ ok: false, message: 'Please enter a valid email address.' },
			{ status: 400, headers: { 'cache-control': 'no-store' } }
		);
	}

	if (!isNonEmptyString(subject)) {
		return json(
			{ ok: false, message: 'Please enter a subject.' },
			{ status: 400, headers: { 'cache-control': 'no-store' } }
		);
	}

	if (!isNonEmptyString(message)) {
		return json(
			{ ok: false, message: 'Please enter a message.' },
			{ status: 400, headers: { 'cache-control': 'no-store' } }
		);
	}

	// Verify Turnstile token
	if (!turnstileToken || typeof turnstileToken !== 'string' || turnstileToken.trim() === '') {
		return json(
			{
				ok: false,
				message: 'Security verification is required. Please refresh the page and try again.'
			},
			{ status: 400, headers: { 'cache-control': 'no-store' } }
		);
	}

	if (!TURNSTILE_SECRET_KEY || !TURNSTILE_CHALLENGE_URI) {
		console.error('Turnstile configuration missing');
		return json(
			{ ok: false, message: 'Unable to verify request. Please try again later.' },
			{ status: 500, headers: { 'cache-control': 'no-store' } }
		);
	}

	try {
		const formData = new URLSearchParams();
		formData.append('secret', TURNSTILE_SECRET_KEY);
		formData.append('response', turnstileToken);
		formData.append('remoteip', ip);

		const turnstileResponse = await fetch(TURNSTILE_CHALLENGE_URI, {
			method: 'POST',
			body: formData
		});

		if (!turnstileResponse.ok) {
			console.error('Turnstile API error', { status: turnstileResponse.status });
			return json(
				{ ok: false, message: 'Unable to verify request. Please try again.' },
				{ status: 502, headers: { 'cache-control': 'no-store' } }
			);
		}

		const outcome = (await turnstileResponse.json()) as {
			success: boolean;
			'error-codes'?: string[];
		};

		if (!outcome.success) {
			const errorCodes = outcome['error-codes'] || [];
			console.warn('Turnstile verification failed', { ip, errors: errorCodes });

			// Provide user-friendly messages based on error codes
			if (errorCodes.includes('timeout-or-duplicate')) {
				return json(
					{ ok: false, message: 'Verification expired. Please try again.' },
					{ status: 400, headers: { 'cache-control': 'no-store' } }
				);
			}

			return json(
				{ ok: false, message: 'Security verification failed. Please try again.' },
				{ status: 400, headers: { 'cache-control': 'no-store' } }
			);
		}
	} catch (err) {
		console.error('Turnstile verification error', err);
		return json(
			{ ok: false, message: 'Unable to verify request. Please try again.' },
			{ status: 502, headers: { 'cache-control': 'no-store' } }
		);
	}

	if (!SMTP2GO_API_KEY || !SMTP2GO_FROM || !SMTP2GO_TO || !PUBLIC_SMTP2GO_SEND_URI) {
		return json(
			{ ok: false, message: 'Email service is not configured. Please try again later.' },
			{ status: 500, headers: { 'cache-control': 'no-store' } }
		);
	}

	const textBody = [
		`New message from your portfolio contact form:`,
		``,
		`Name: ${name.trim()}`,
		`Email: ${trimmedEmail}`,
		`Subject: ${subject.trim()}`,
		``,
		message.trim()
	].join('\n');

	const htmlBody = `
		<div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial; line-height: 1.5;">
			<h2 style="margin: 0 0 12px;">New portfolio message</h2>
			<p style="margin: 0 0 12px;"><strong>Name:</strong> ${escapeHtml(name.trim())}<br/>
			<strong>Email:</strong> ${escapeHtml(trimmedEmail)}<br/>
			<strong>Subject:</strong> ${escapeHtml(subject.trim())}</p>
			<pre style="white-space: pre-wrap; background: #0b0b0e; color: #eaeaf0; padding: 12px; border-radius: 10px;">${escapeHtml(
				message.trim()
			)}</pre>
		</div>
	`;

	// Check if email sending is enabled based on environment
	if (dev && env.SMTP2GO_ENABLED !== 'true') {
		return json(
			{
				ok: true,
				message:
					'Email not sent (development environment). Your message was received but not delivered.'
			},
			{ status: 200, headers: { 'cache-control': 'no-store' } }
		);
	}

	try {
		const response = await fetch(PUBLIC_SMTP2GO_SEND_URI, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-Smtp2go-Api-Key': SMTP2GO_API_KEY
			},
			body: JSON.stringify({
				sender: SMTP2GO_FROM,
				to: [SMTP2GO_TO],
				subject: `Portfolio: ${subject.trim()}`,
				text_body: textBody,
				html_body: htmlBody,
				custom_headers: [
					{
						header: 'Reply-To',
						value: trimmedEmail
					}
				]
			})
		});

		const payload = (await response.json().catch(() => null)) as any;
		const succeeded =
			Boolean(response.ok) &&
			(payload?.data?.succeeded ??
				payload?.data?.success ??
				payload?.data?.success_count ??
				payload?.data?.email_id);

		if (!succeeded) {
			// Avoid leaking provider details to client; log minimal server-side context.
			console.error('SMTP2GO send failed', { status: response.status, payload });
			return json(
				{
					ok: false,
					message: 'Sorry — I could not send your message right now. Please try again shortly.'
				},
				{ status: 502, headers: { 'cache-control': 'no-store' } }
			);
		}

		return json(
			{ ok: true, message: "Thanks! Your message was sent — I'll get back to you soon." },
			{ status: 200, headers: { 'cache-control': 'no-store' } }
		);
	} catch (err) {
		console.error('SMTP2GO request error', err);
		return json(
			{
				ok: false,
				message: 'Sorry — something went wrong sending your message. Please try again.'
			},
			{ status: 502, headers: { 'cache-control': 'no-store' } }
		);
	}
};

function escapeHtml(value: string): string {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#39;');
}
