<script lang="ts">
	import { fly, scale } from 'svelte/transition';
	import { backOut, elasticOut } from 'svelte/easing';
	import { toasts, type Toast } from '$lib/stores/toast';
	import Icon from '@iconify/svelte';

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
</script>

<div class="pointer-events-none fixed right-4 top-4 z-50 flex w-[min(420px,calc(100vw-2rem))] flex-col gap-3">
	{#each $toasts as toast (toast.id)}
		{@const { icon, color } = iconAndColor(toast.type)}
		<div
			class={`pointer-events-auto overflow-hidden rounded-lg border-2 bg-zinc-800/70 p-4 shadow-lg backdrop-blur-md transition-all duration-300 ${cardClass(toast.type)}`}
			in:fly={{ y: -20, duration: 400, easing: backOut }}
			out:scale={{ start: 0.95, duration: 150 }}
		>
			<div class="flex items-start gap-3">
				<Icon {icon} class={`h-6 w-6 shrink-0 ${iconClass(toast.type)}`} />
				<div class="min-w-0 flex-1">
					{#if toast.title}
						<p class="mb-1 font-semibold text-zinc-100">{toast.title}</p>
					{/if}
					<p class="text-sm text-zinc-300 font-light">{toast.message}</p>
				</div>
				<button
					type="button"
					class="shrink-0 rounded-md p-1 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100 focus:outline-none"
					on:click={() => toasts.dismiss(toast.id)}
					aria-label="Dismiss"
				>
					<Icon icon="mdi:close" class="h-5 w-5" />
				</button>
			</div>
		</div>
	{/each}
</div>
