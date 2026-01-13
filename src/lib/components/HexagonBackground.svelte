<script lang="ts">
	let { opacity = 15, fadeType = 'radial' } = $props();
</script>

<div class="pointer-events-none absolute inset-0">
	<svg
		class="hex-fade hex-soften h-full w-full"
		style="opacity: {opacity / 100}"
		xmlns="http://www.w3.org/2000/svg"
	>
		<defs>
			<pattern id="hexagons" width="60" height="60" patternUnits="userSpaceOnUse">
				<polygon
					points="30,5 50,17.5 50,42.5 30,55 10,42.5 10,17.5"
					fill="none"
					stroke="#14b8a6"
					stroke-width="1"
				/>
			</pattern>
		</defs>
		<rect width="100%" height="100%" fill="url(#hexagons)" />
	</svg>

	{#if fadeType === 'radial'}
		<div
			class="bg-gradient-radial absolute inset-0 from-transparent via-transparent to-zinc-900"
		></div>
	{/if}
</div>

<style>
	.hex-fade {
		mask-image: radial-gradient(ellipse at center, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 80%);
		-webkit-mask-image: radial-gradient(
			ellipse at center,
			rgba(0, 0, 0, 1) 0%,
			rgba(0, 0, 0, 0) 80%
		);
		mask-mode: alpha;
	}

	.hex-soften {
		filter: blur(0.3px);
	}
</style>
