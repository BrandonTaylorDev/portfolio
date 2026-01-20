<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import ToastHost from '$lib/components/ui/ToastHost.svelte';
	import { onNavigate } from '$app/navigation';

	let { children } = $props();

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
</svelte:head>

<div class="h-0 min-h-screen min-w-screen overflow-x-hidden p-0">
	{@render children()}
	<ToastHost />
</div>

<style>
	@keyframes fade-in {
		from {
			opacity: 0;
		}
	}

	@keyframes fade-out {
		to {
			opacity: 0;
		}
	}

	:global(::view-transition-old(root)) {
		animation: 300ms cubic-bezier(0.4, 0, 1, 1) both fade-out;
	}

	:global(::view-transition-new(root)) {
		animation: 300ms cubic-bezier(0, 0, 0.2, 1) both fade-in;
	}
</style>
