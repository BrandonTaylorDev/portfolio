<script lang="ts">
	import type { Job } from '$lib/data/jobs';
	import DateRange from './DateRange.svelte';
	let { job }: { job: Job } = $props();
</script>

<article class="resume-job" aria-labelledby={`job-${job.id}`}>
	<div class="resume-job-heading">
		<div>
			<h3 id={`job-${job.id}`}>{job.title}</h3>
			<p class="resume-company">{job.company}</p>
		</div>
		<DateRange start={job.start} end={job.end} />
	</div>
	<ul class="resume-bullets">
		{#each job.bullets as bullet}<li>{bullet}</li>{/each}
	</ul>
</article>
