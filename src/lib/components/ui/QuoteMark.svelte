<script lang="ts">
	export let position: 'left' | 'right' = 'left';
</script>

<div class="shrink-0" aria-hidden="true">
	<svg
		class="h-10 w-10 text-teal-400 opacity-60"
		viewBox="0 0 24 24"
		style={position === 'right' ? 'transform: scale(-1, -1)' : ''}
	>
		<path fill="currentColor" d="M10,7L8,11H11V17H5V11L7,7H10M18,7L16,11H19V17H13V11L15,7H18Z" />
	</svg>
</div>
