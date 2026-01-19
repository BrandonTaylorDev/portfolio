<script lang="ts">
	import QuoteMark from '$lib/components/ui/QuoteMark.svelte';
</script>

<div
	class="animate-fade-in-bottom relative mx-auto flex min-h-48 transform-gpu items-center justify-center gap-4 text-center will-change-transform [animation-delay:600ms]"
>
	<div
		class="pointer-events-none absolute inset-0 top-1/2 flex -translate-y-16 justify-center opacity-15"
	>
		<div class="h-32 w-32 rotate-45 rounded-full border-4 border-teal-400"></div>
	</div>

	<QuoteMark position="left" />

	<div class="relative z-10 px-2 md:px-6">
		<span class="text-xl leading-relaxed font-light tracking-wide md:text-2xl">
			Fueled by
			<span
				class="coffee-cursor font-semibold text-teal-300 transition-colors duration-300 hover:text-teal-200"
			>
				Coffee</span
			>, Driven by Ambition
		</span>
	</div>

	<QuoteMark position="right" />
</div>

<style>
	@keyframes fadeInBottom {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-fade-in-bottom {
		animation: fadeInBottom 0.5s ease-out both;
	}

	.coffee-cursor {
		cursor:
			url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>☕</text></svg>")
				16 0,
			auto;
		position: relative;
	}

	.coffee-cursor::after {
		content: '';
		position: absolute;
		bottom: -2px;
		left: 0;
		width: 100%;
		height: 2px;
		background: linear-gradient(90deg, transparent, #14b8a6, transparent);
		transform: scaleX(0);
		transform-origin: center;
		transition: transform 0.3s ease;
	}

	.coffee-cursor:hover::after {
		transform: scaleX(1);
	}
</style>
