<script lang="ts">
	import type { Snippet } from 'svelte';
	let {
		id,
		label,
		title,
		intro,
		children
	}: { id: string; label: string; title: string; intro?: string; children: Snippet } = $props();
</script>

<section {id} class="profile-section" aria-labelledby={`${id}-heading`}>
	<div class="section-heading">
		<p class="eyebrow">{label}</p>
		<h2 id={`${id}-heading`}>{title}</h2>
		{#if intro}<p class="section-intro">{intro}</p>{/if}
	</div>
	{@render children()}
</section>
