import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';

// Compile the real endpoint and supply SvelteKit's environment modules for each scenario.
const source = readFileSync(
	new URL('../src/routes/api/send-email/+server.ts', import.meta.url),
	'utf8'
);
const { outputText } = ts.transpileModule(source, {
	compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }
});
const emailEnv = {
	SMTP2GO_API_KEY: 'email-test-key',
	SMTP2GO_FROM: 'sender@example.com',
	SMTP2GO_TO: 'recipient@example.com'
};
const emailUri = 'https://api.smtp2go.com/v3/email/send';
const verificationUri = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const validBody = {
	name: 'Test Sender',
	email: 'test@example.com',
	subject: 'Test subject',
	message: 'Test message',
	turnstileToken: 'test-token'
};

async function submit({ dev = false, env = {}, body = validBody, verify, send } = {}) {
	const calls = [];
	const exports = {};
	const modules = {
		'$app/environment': { dev },
		'$env/dynamic/private': { env },
		'$env/dynamic/public': { env: { PUBLIC_SMTP2GO_SEND_URI: emailUri } },
		'@sveltejs/kit': {
			json: (body, init) => Response.json(body, init)
		}
	};
	runInNewContext(outputText, {
		exports,
		require: (name) => {
			assert.ok(name in modules, `Unexpected module: ${name}`);
			return modules[name];
		},
		URLSearchParams,
		AbortSignal,
		console: { error() {} }
	});
	const response = await exports.POST({
		request: new Request('http://localhost/api/send-email', {
			method: 'POST',
			body: JSON.stringify(body)
		}),
		getClientAddress: () => '127.0.0.1',
		fetch: async (url, options) => {
			calls.push({ url, options });
			if (url === emailUri) return send?.() ?? Response.json({ data: { succeeded: 1 } });
			assert.equal(url, env.TURNSTILE_CHALLENGE_URI || verificationUri);
			return verify?.() ?? Response.json({ success: true });
		}
	});
	assert.equal(response.headers.get('cache-control'), 'no-store');
	return { status: response.status, payload: await response.json(), calls };
}

test('development accepts a form without any keys or token and makes no external requests', async () => {
	const { turnstileToken, ...body } = validBody;
	const result = await submit({ dev: true, body });
	assert.equal(result.status, 200);
	assert.equal(result.payload.ok, true);
	assert.match(result.payload.message, /not delivered/);
	assert.equal(result.calls.length, 0);
});

test('development still validates required fields', async () => {
	const result = await submit({ dev: true, body: { ...validBody, email: 'invalid' } });
	assert.equal(result.status, 400);
	assert.equal(result.calls.length, 0);
});

test('explicitly enabled development email skips Turnstile', async () => {
	const { turnstileToken, ...body } = validBody;
	const result = await submit({ dev: true, env: { ...emailEnv, SMTP2GO_ENABLED: 'true' }, body });
	assert.equal(result.status, 200);
	assert.deepEqual(
		result.calls.map(({ url }) => url),
		[emailUri]
	);
});

for (const token of [undefined, '', ' ', 123, 'a'.repeat(2049)]) {
	test(`production rejects an invalid token (${typeof token}, length ${String(token).length})`, async () => {
		const result = await submit({ body: { ...validBody, turnstileToken: token } });
		assert.equal(result.status, 400);
		assert.equal(result.calls.length, 0);
	});
}

test('production fails closed when the secret is missing', async () => {
	const result = await submit({ env: emailEnv });
	assert.equal(result.status, 500);
	assert.equal(result.calls.length, 0);
});

const productionEnv = { ...emailEnv, TURNSTILE_SECRET_KEY: 'secret-test-key' };
for (const outcome of [
	{ success: false },
	{ success: false, 'error-codes': ['timeout-or-duplicate'] },
	{},
	{ success: 'true' }
]) {
	test(`production blocks email for verification outcome ${JSON.stringify(outcome)}`, async () => {
		const result = await submit({ env: productionEnv, verify: () => Response.json(outcome) });
		assert.equal(result.status, 400);
		assert.equal(result.calls.length, 1);
	});
}

for (const verify of [
	() => new Response('', { status: 503 }),
	() => new Response('invalid JSON'),
	() => {
		throw new Error('Network unavailable');
	}
]) {
	test('production blocks email when Cloudflare is unavailable or returns an invalid response', async () => {
		const result = await submit({ env: productionEnv, verify });
		assert.equal(result.status, 502);
		assert.equal(result.calls.length, 1);
	});
}

test('production verifies the token before sending email even with SMTP2GO_ENABLED=false', async () => {
	const result = await submit({ env: { ...productionEnv, SMTP2GO_ENABLED: 'false' } });
	assert.equal(result.status, 200);
	assert.deepEqual(
		result.calls.map(({ url }) => url),
		[verificationUri, emailUri]
	);
	assert.equal(result.calls[0].options.method, 'POST');
	assert.equal(result.calls[0].options.body.get('secret'), productionEnv.TURNSTILE_SECRET_KEY);
	assert.equal(result.calls[0].options.body.get('response'), validBody.turnstileToken);
	assert.equal(JSON.parse(result.calls[1].options.body).subject, 'Portfolio: Test subject');
});

test('the existing verification endpoint override is supported', async () => {
	const uri = 'https://verification.example.com/siteverify';
	const result = await submit({ env: { ...productionEnv, TURNSTILE_CHALLENGE_URI: uri } });
	assert.equal(result.status, 200);
	assert.equal(result.calls[0].url, uri);
});
