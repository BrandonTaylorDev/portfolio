<script lang="ts">
	import Section from './Section.svelte';
	import { achievements, jobFor } from '$lib/data/profile';
</script>

<Section
	id="impact"
	label="Selected impact"
	title="Progress you can measure."
	intro="A selection of outcomes from my work in support operations and platform engineering."
>
	<div class="impact-grid">
		{#each achievements as achievement}
			{@const job = jobFor(achievement.jobId)}
			<article class="impact-card">
				<p class="impact-value">{achievement.value}</p>
				<h3>{achievement.label}</h3>
				<p class="impact-context">{achievement.context}</p>
				<p class="attribution">{job.company}</p>
			</article>
		{/each}
	</div>
</Section>
