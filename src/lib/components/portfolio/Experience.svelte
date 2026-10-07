<script lang="ts">
	import Section from './Section.svelte';
	import { jobFor, leadershipExperience } from '$lib/data/profile';
	import { formatLocalMonthYear } from '$lib/utils/date';

	const timeline = [...leadershipExperience].sort((a, b) =>
		jobFor(b.jobId).start.localeCompare(jobFor(a.jobId).start)
	);
</script>

<Section
	id="experience"
	label="Leadership in practice"
	title="Leading teams. Improving services. Delivering change."
	intro="From managing a support team to expanding customer services and guiding complex projects, my work connects people, operations, and business priorities."
>
	<ol class="experience-list" role="list" aria-label="Selected experience, newest to oldest">
		{#each timeline as experience (experience.jobId)}
			{@const job = jobFor(experience.jobId)}
			<li class="experience-item">
				<article class="experience-row">
					<span class="timeline-marker" class:current={!job.end} aria-hidden="true"></span>
					<div class="experience-meta">
						<p class="experience-dates">
							<time datetime={job.start}>{formatLocalMonthYear(job.start)}</time> — {#if job.end}<time
									datetime={job.end}>{formatLocalMonthYear(job.end)}</time
								>{:else}Present{/if}
						</p>
						<p class="experience-company">{job.company}</p>
						<p class="experience-role">{job.title}</p>
					</div>
					<div class="experience-copy">
						<p class="eyebrow">{experience.focus}</p>
						<h3>{experience.title}</h3>
						<p>{experience.copy}</p>
						<p class="experience-outcome">{experience.outcome}</p>
						<p class="contributions">{experience.contribution}</p>
					</div>
				</article>
			</li>
		{/each}
	</ol>
	<a class="text-link" href="/resume">View my full experience <span aria-hidden="true">↗</span></a>
</Section>
