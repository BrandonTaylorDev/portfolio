<script lang="ts">
	import { fly, scale } from 'svelte/transition';
	import { backOut } from 'svelte/easing';
	import { toasts, type Toast } from '$lib/stores/toast';
	import Icon from '@iconify/svelte';

	let hoveredToast: string | null = null;

	function iconAndColor(type: Toast['type']) {
		switch (type) {
			case 'success':
				return { icon: 'mdi:check-circle', color: 'teal' };
			case 'error':
				return { icon: 'mdi:alert-circle', color: 'rose' };
			default:
				return { icon: 'mdi:information', color: 'sky' };
		}
	}

	function cardClass(type: Toast['type']) {
		switch (type) {
			case 'success':
				return 'border-teal-500/40 shadow-teal-500/20';
			case 'error':
				return 'border-rose-500/40 shadow-rose-500/20';
			default:
				return 'border-sky-500/40 shadow-sky-500/20';
		}
	}

	function iconClass(type: Toast['type']) {
		switch (type) {
			case 'success':
				return 'text-teal-400';
			case 'error':
				return 'text-rose-400';
			default:
				return 'text-sky-400';
		}
	}

	function progressBarClass(type: Toast['type']) {
		switch (type) {
			case 'success':
				return 'bg-teal-500';
			case 'error':
				return 'bg-rose-500';
			default:
				return 'bg-sky-500';
		}
	}

	function getElapsedTime(toast: Toast): number {
		if (toast.pausedAt !== undefined) {
			// Paused: return elapsed time at pause
			return toast.elapsedBeforePause;
		}
		// Running: calculate current elapsed time using resumedAt
		const currentRunDuration = toast.resumedAt ? Date.now() - toast.resumedAt : 0;
		return toast.elapsedBeforePause + currentRunDuration;
	}

	function handleMouseEnter(toastId: string) {
		hoveredToast = toastId;
		toasts.pause(toastId);
	}

	function handleMouseLeave(toastId: string) {
		hoveredToast = null;
		toasts.resume(toastId);
	}
</script>

<div
	class="pointer-events-none fixed top-4 right-4 z-50 flex w-[min(420px,calc(100vw-2rem))] flex-col gap-3"
>
	{#each $toasts as toast, index (toast.id)}
		{@const { icon } = iconAndColor(toast.type)}
		{@const isHovered = hoveredToast === toast.id}
		<div
			class={`pointer-events-auto relative overflow-hidden rounded-lg border-2 bg-zinc-800/70 p-4 shadow-lg backdrop-blur-md transition-all duration-300 ${cardClass(toast.type)}`}
			style="transform: translateY({index * 4}px); opacity: {1 - index * 0.1}"
			in:fly={{ y: -20, duration: 400, easing: backOut }}
			out:scale={{ start: 0.95, duration: 150 }}
			on:mouseenter={() => handleMouseEnter(toast.id)}
			on:mouseleave={() => handleMouseLeave(toast.id)}
			role="status"
			aria-live="polite"
		>
			<div class="flex items-start gap-3">
				<Icon {icon} class={`h-6 w-6 shrink-0 ${iconClass(toast.type)}`} />
				<div class="min-w-0 flex-1">
					{#if toast.title}
						<p class="mb-1 font-semibold text-zinc-100">{toast.title}</p>
					{/if}
					<p class="text-sm font-light text-zinc-300">{toast.message}</p>
				</div>
				<button
					type="button"
					class="shrink-0 cursor-pointer rounded-md p-1 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100 focus:outline-none"
					on:click={() => toasts.dismiss(toast.id)}
					aria-label="Dismiss"
				>
					<Icon icon="mdi:close" class="h-5 w-5" />
				</button>
			</div>

			<!-- Progress bar -->
			<div class="absolute right-0 bottom-0 left-0 h-1 bg-zinc-700/30">
				{#if isHovered}
					<div
						class={`h-full ${progressBarClass(toast.type)}`}
						style="width: {Math.max(0, 100 - (getElapsedTime(toast) / toast.durationMs) * 100)}%"
					></div>
				{:else}
					{#key toast.animationKey}
						<div
							class={`h-full ${progressBarClass(toast.type)} progress-running`}
							style="animation-duration: {toast.durationMs}ms; animation-delay: -{toast.elapsedBeforePause}ms;"
						></div>
					{/key}
				{/if}
			</div>
		</div>
	{/each}
</div>

<style>
	@keyframes progress {
		from {
			width: 100%;
		}
		to {
			width: 0%;
		}
	}

	.progress-running {
		animation: progress linear forwards;
	}

	.progress-paused {
		animation-play-state: paused;
	}
</style>
