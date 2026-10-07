<script lang="ts">
	import Section from './Section.svelte';
	import { foundations } from '$lib/data/profile';
</script>

<Section
	id="foundation"
	label="Operational & technical depth"
	title="Leadership informed by experience."
	intro="A practical understanding of IT services, business continuity, security, and automation informs how I lead projects and work with teams."
>
	<div class="foundation-grid">
		{#each foundations as foundation}
			<article class="foundation-item">
				<h3>{foundation.title}</h3>
				<p>{foundation.copy}</p>
				<p class="technology-list">{foundation.technologies}</p>
			</article>
		{/each}
	</div>
</Section>
