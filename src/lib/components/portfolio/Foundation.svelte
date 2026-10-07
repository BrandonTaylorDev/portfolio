<script lang="ts">
	import Section from './Section.svelte';
	import { foundations } from '$lib/data/profile';
</script>

<Section
	id="foundation"
	label="The foundation for better decisions"
	title="Leadership informed by experience."
	intro="Technical depth helps me ask informed questions, guide teams and projects, and weigh service quality, continuity, and risk against organizational priorities."
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
