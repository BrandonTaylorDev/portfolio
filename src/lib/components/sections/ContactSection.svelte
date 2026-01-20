<script lang="ts">
	import ParallaxGroup from '$lib/components/parallax/ParallaxGroup.svelte';
	import ParallaxLayerBase from '$lib/components/parallax/ParallaxLayerBase.svelte';
	import ParallaxContent from '$lib/components/parallax/ParallaxContent.svelte';
	import Icon from '@iconify/svelte';
	import { toasts } from '$lib/stores/toast';
	import { PUBLIC_TURNSTILE_SITE_KEY } from '$env/static/public';
	import { onMount } from 'svelte';

	let formElement: HTMLFormElement | undefined;
	let turnstileContainer: HTMLDivElement | undefined;
	let isSubmitting = false;
	let turnstileWidgetId: string | null = null;

	// Field error states
	let errors = {
		name: '',
		email: '',
		subject: '',
		message: ''
	};

	// Track initial values to detect changes
	let initialValues = {
		name: '',
		email: '',
		subject: '',
		message: ''
	};

	// Track if fields have been modified (user has typed something)
	let touched = {
		name: false,
		email: false,
		subject: false,
		message: false
	};

	onMount(() => {
		renderTurnstile();
	});

	function renderTurnstile() {
		if (!turnstileContainer || typeof window === 'undefined') return;

		// Wait for turnstile to be available
		const interval = setInterval(() => {
			if (window.turnstile && turnstileContainer) {
				clearInterval(interval);
				turnstileWidgetId = window.turnstile.render(turnstileContainer, {
					sitekey: PUBLIC_TURNSTILE_SITE_KEY,
					theme: 'dark',
					size: 'normal'
				});
			}
		}, 100);

		// Cleanup after 10 seconds if turnstile doesn't load
		setTimeout(() => clearInterval(interval), 10000);
	}

	function resetTurnstile() {
		if (turnstileWidgetId && window.turnstile) {
			window.turnstile.reset(turnstileWidgetId);
		}
	}

	function validateEmail(email: string): boolean {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	}

	function handleBlur(field: keyof typeof errors, currentValue: string) {
		const trimmedValue = currentValue.trim();

		// Only validate if the field has been touched (user has typed something)
		if (!touched[field]) {
			return;
		}

		switch (field) {
			case 'name':
				errors.name = trimmedValue === '' ? 'Please enter your name.' : '';
				break;
			case 'email':
				if (trimmedValue === '') {
					errors.email = 'Please enter your email address.';
				} else if (!validateEmail(trimmedValue)) {
					errors.email = 'Please enter a valid email address.';
				} else {
					errors.email = '';
				}
				break;
			case 'subject':
				errors.subject = trimmedValue === '' ? 'Please enter a subject.' : '';
				break;
			case 'message':
				errors.message = trimmedValue === '' ? 'Please enter a message.' : '';
				break;
		}
	}

	function handleInput(field: keyof typeof errors) {
		// Mark field as touched when user types
		touched[field] = true;
		// Clear error when user starts typing again
		errors[field] = '';
	}

	async function handleSubmit(event: Event) {
		event.preventDefault();
		if (!formElement) return;

		const formData = new FormData(formElement);
		const name = String(formData.get('name') ?? '').trim();
		const email = String(formData.get('email') ?? '').trim();
		const subject = String(formData.get('subject') ?? '').trim();
		const message = String(formData.get('message') ?? '').trim();

		// Mark all fields as touched on submit
		touched = { name: true, email: true, subject: true, message: true };

		// Client-side validation for better UX
		let hasErrors = false;

		if (!name) {
			errors.name = 'Please enter your name.';
			hasErrors = true;
		}

		if (!email) {
			errors.email = 'Please enter your email address.';
			hasErrors = true;
		} else if (!validateEmail(email)) {
			errors.email = 'Please enter a valid email address.';
			hasErrors = true;
		}

		if (!subject) {
			errors.subject = 'Please enter a subject.';
			hasErrors = true;
		}

		if (!message) {
			errors.message = 'Please enter a message.';
			hasErrors = true;
		}

		if (hasErrors) {
			toasts.show({ type: 'error', message: 'Please fix the errors before submitting.' });
			return;
		}

		// Get turnstile token
		const turnstileToken = formData.get('cf-turnstile-response');
		if (!turnstileToken || typeof turnstileToken !== 'string') {
			toasts.show({
				type: 'error',
				message: 'Security verification required. Please wait for the verification to load.'
			});
			return;
		}

		isSubmitting = true;
		try {
			// Send email with turnstile token
			const response = await fetch('/api/send-email', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ name, email, subject, message, turnstileToken })
			});

			const payload = (await response.json().catch(() => null)) as {
				ok?: boolean;
				message?: string;
			} | null;

			if (response.ok && payload?.ok) {
				toasts.show({
					type: 'success',
					message: payload.message ?? 'Thanks! Your message was sent.'
				});
				formElement.reset();
				resetTurnstile();
				// Reset error and touched states
				errors = { name: '', email: '', subject: '', message: '' };
				touched = { name: false, email: false, subject: false, message: false };
				initialValues = { name: '', email: '', subject: '', message: '' };
			} else {
				// Display server-provided error message or fallback
				const errorMessage = payload?.message ?? 'Unable to send message. Please try again.';
				toasts.show({ type: 'error', message: errorMessage });

				// Only reset turnstile on verification errors or network errors
				if (response.status === 400 || response.status === 502) {
					resetTurnstile();
				}
			}
		} catch (err) {
			console.error('Form submission error:', err);
			toasts.show({
				type: 'error',
				message: 'Network error. Please check your connection and try again.'
			});
			resetTurnstile();
		} finally {
			isSubmitting = false;
		}
	}
</script>

<ParallaxGroup>
	<ParallaxLayerBase>
		<ParallaxContent>
			<div class="relative z-50 mx-auto max-w-2xl px-6 py-12">
				<!-- Form Header -->
				<div class="mb-8 text-center">
					<h2 class="animate-fade-in-bottom mb-4 text-3xl font-bold text-teal-400">Get In Touch</h2>
					<p class="animate-fade-in-bottom animation-delay-100 font-light text-zinc-300">
						Have a question or want to work together? Fill out the form below.
					</p>
				</div>

				<!-- Form -->
				<form
					bind:this={formElement}
					on:submit={handleSubmit}
					class="animate-fade-in-bottom animation-delay-200 rounded-lg border-2 border-zinc-700 bg-zinc-800/70 p-8 shadow-lg transition-all duration-300 hover:border-teal-500"
				>
					<!-- User Info Section -->
					<section class="mb-6">
						<div class="mb-4">
							<label for="name" class="mb-2 block text-left text-sm font-medium text-zinc-300">
								Name <span class="text-teal-500">*</span>
							</label>
							<input
								id="name"
								type="text"
								name="name"
								placeholder="Your name"
								on:blur={(e) => handleBlur('name', e.currentTarget.value)}
								on:input={() => handleInput('name')}
								class="w-full rounded-lg border-2 bg-zinc-900 p-4 text-zinc-200 placeholder-zinc-500 transition-all duration-200 focus:border-teal-500 focus:outline-none {errors.name
									? 'border-red-500'
									: 'border-zinc-700'}"
							/>
							{#if errors.name}
								<p class="mt-1 text-sm text-red-400">{errors.name}</p>
							{/if}
						</div>

						<div class="mb-4">
							<label for="email" class="mb-2 block text-left text-sm font-medium text-zinc-300">
								Email <span class="text-teal-500">*</span>
							</label>
							<input
								id="email"
								type="email"
								name="email"
								placeholder="your.email@example.com"
								on:blur={(e) => handleBlur('email', e.currentTarget.value)}
								on:input={() => handleInput('email')}
								class="w-full rounded-lg border-2 bg-zinc-900 p-4 text-zinc-200 placeholder-zinc-500 transition-all duration-200 focus:border-teal-500 focus:outline-none {errors.email
									? 'border-red-500'
									: 'border-zinc-700'}"
							/>
							{#if errors.email}
								<p class="mt-1 text-sm text-red-400">{errors.email}</p>
							{/if}
						</div>
					</section>

					<!-- Message Info Section -->
					<section class="mb-6">
						<div class="mb-4">
							<label for="subject" class="mb-2 block text-left text-sm font-medium text-zinc-300">
								Subject <span class="text-teal-500">*</span>
							</label>
							<input
								id="subject"
								type="text"
								name="subject"
								placeholder="What's this about?"
								on:blur={(e) => handleBlur('subject', e.currentTarget.value)}
								on:input={() => handleInput('subject')}
								class="w-full rounded-lg border-2 bg-zinc-900 p-4 text-zinc-200 placeholder-zinc-500 transition-all duration-200 focus:border-teal-500 focus:outline-none {errors.subject
									? 'border-red-500'
									: 'border-zinc-700'}"
							/>
							{#if errors.subject}
								<p class="mt-1 text-sm text-red-400">{errors.subject}</p>
							{/if}
						</div>

						<div class="mb-4">
							<label for="message" class="mb-2 block text-left text-sm font-medium text-zinc-300">
								Message <span class="text-teal-500">*</span>
							</label>
							<textarea
								id="message"
								name="message"
								placeholder="Tell me more..."
								rows="6"
								on:blur={(e) => handleBlur('message', e.currentTarget.value)}
								on:input={() => handleInput('message')}
								class="w-full resize-none rounded-lg border-2 bg-zinc-900 p-4 text-zinc-200 placeholder-zinc-500 transition-all duration-200 focus:border-teal-500 focus:outline-none {errors.message
									? 'border-red-500'
									: 'border-zinc-700'}"
							></textarea>
							{#if errors.message}
								<p class="mt-1 text-sm text-red-400">{errors.message}</p>
							{/if}
						</div>
					</section>

					<!-- Turnstile Widget -->
					<div bind:this={turnstileContainer} class="mb-6"></div>

					<!-- Form Actions -->
					<div class="flex items-center justify-between gap-4">
						<button
							type="submit"
							disabled={isSubmitting}
							aria-busy={isSubmitting}
							class="group inline-flex flex-1 cursor-pointer items-center justify-center gap-3 rounded-full bg-teal-600/50 px-8 py-4 text-lg font-medium text-zinc-100 shadow-lg transition-all duration-200 hover:bg-teal-500/70 hover:shadow-teal-500/15 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
						>
							<span>{isSubmitting ? 'Sending…' : 'Send'}</span>
							<Icon
								icon={isSubmitting ? 'mdi:loading' : 'mdi:send'}
								class="h-6 w-6 transition-transform duration-200 group-hover:translate-x-1 {isSubmitting
									? 'animate-spin'
									: ''}"
							/>
						</button>
					</div>
				</form>
			</div>
		</ParallaxContent>
	</ParallaxLayerBase>
</ParallaxGroup>
