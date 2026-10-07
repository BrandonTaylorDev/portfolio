import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';

// Exercise the component's actual mount callback with an asynchronous script loader.
const component = readFileSync(
	new URL('../src/lib/components/sections/ContactSection.svelte', import.meta.url),
	'utf8'
);
const source = component.match(/<script lang="ts">([\s\S]*?)<\/script>/)[1];
const { outputText } = ts.transpileModule(
	`${source}
	turnstileContainer = testContainer;
	export const snapshot = () => ({ token: turnstileToken, error: turnstileError });`,
	{ compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }
);

function mount({ dev = false, preloaded = false, failRender = false } = {}) {
	const container = {};
	const scripts = [];
	const renders = [];
	const removed = [];
	const api = {
		ready() {
			throw new Error('ready() cannot be used with an async script');
		},
		render(target, options) {
			if (failRender) throw new Error('Widget initialization failed');
			renders.push({ target, options });
			return 'test-widget';
		},
		remove(id) {
			removed.push(id);
		}
	};
	const window = preloaded ? { turnstile: api } : {};
	let onMount;
	const exports = {};
	const modules = {
		'$app/environment': { dev },
		'$env/dynamic/public': { env: { PUBLIC_TURNSTILE_SITE_KEY: 'test-site-key' } },
		svelte: { onMount: (callback) => (onMount = callback), tick: async () => {} }
	};
	runInNewContext(outputText, {
		exports,
		require: (name) => {
			assert.ok(name in modules, `Unexpected module: ${name}`);
			return modules[name];
		},
		$state: (value) => value,
		testContainer: container,
		window,
		document: {
			createElement: () => ({ remove() {} }),
			head: { append: (script) => scripts.push(script) }
		}
	});
	const cleanup = onMount();
	return { container, scripts, renders, removed, api, window, cleanup, snapshot: exports.snapshot };
}

test('production renders after the async script loads without calling ready()', () => {
	const view = mount();
	assert.equal(view.renders.length, 0);
	assert.equal(view.scripts.length, 1);
	assert.equal(view.scripts[0].async, true);
	view.window.turnstile = view.api;
	view.scripts[0].onload();
	assert.equal(view.renders.length, 1);
	assert.equal(view.renders[0].target, view.container);
	view.renders[0].options.callback('verified-token');
	assert.equal(view.snapshot().token, 'verified-token');
	assert.equal(view.snapshot().error, '');
	view.cleanup();
	assert.deepEqual(view.removed, ['test-widget']);
});

test('returning to the page renders using the already loaded API', () => {
	const view = mount({ preloaded: true });
	assert.equal(view.scripts.length, 0);
	assert.equal(view.renders.length, 1);
});

test('script loading failures show a usable error', () => {
	const view = mount();
	view.scripts[0].onerror();
	assert.match(view.snapshot().error, /Unable to load security verification/);
});

test('widget initialization failures show a usable error instead of escaping the callback', () => {
	const view = mount({ preloaded: true, failRender: true });
	assert.match(view.snapshot().error, /Unable to load security verification/);
});

test('navigating away before the script loads does not render a detached widget', () => {
	const view = mount();
	const delayedLoad = view.scripts[0].onload;
	view.cleanup();
	view.window.turnstile = view.api;
	delayedLoad();
	assert.equal(view.renders.length, 0);
});

test('development continues to skip verification', () => {
	const view = mount({ dev: true });
	assert.equal(view.scripts.length, 0);
	assert.equal(view.renders.length, 0);
});
