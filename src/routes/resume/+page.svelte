<script lang="ts">
	import Navigation from '$lib/components/portfolio/Navigation.svelte';
	import Footer from '$lib/components/portfolio/Footer.svelte';
	import DateRange from '$lib/components/resume/DateRange.svelte';
	import JobEntry from '$lib/components/resume/JobEntry.svelte';
	import { jobs } from '$lib/data/jobs';
	import { education } from '$lib/data/education';
	import { skills } from '$lib/data/skills';
	import '$lib/styles/profile.css';
	import '$lib/styles/resume.css';

	const skillGroups = [
		{ label: 'Platforms', items: skills.platforms },
		{ label: 'Languages', items: skills.languages },
		{ label: 'Frameworks', items: skills.frameworks },
		{ label: 'Cloud & Automation', items: skills.cloudInfrastructure },
		{ label: 'Data & Delivery Tools', items: skills.databaseTools }
	];
</script>

<svelte:head>
	<title>Brandon Taylor | Résumé</title>
	<meta
		name="description"
		content="Brandon Taylor’s professional experience, technical skills, and education across IT services, team management, and technology delivery."
	/>
	<link rel="canonical" href="https://www.brandontaylor.dev/resume" />
</svelte:head>

<div class="professional-site resume-site">
	<a class="skip-link" href="#resume-content">Skip to Résumé</a>
	<Navigation resume />
	<main id="resume-content" class="site-container resume-main" tabindex="-1">
		<div class="resume-actions">
			<a class="button button-secondary resume-back" href="/">
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
					<path
						d="M19 12H5m7-7-7 7 7 7"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
				Back to Portfolio
			</a>
			<button class="button button-secondary" type="button" onclick={() => window.print()}>
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
					<path
						d="M7 8V3h10v5M7 17H4V8h16v9h-3M7 14h10v7H7zM17 11h.01"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
				Print Résumé
			</button>
		</div>

		<article class="resume-document" aria-label="Brandon Taylor’s résumé">
			<header class="resume-identity">
				<div>
					<h1>Brandon Taylor</h1>
					<p class="resume-specialties">IT Leadership · Service Delivery · Technology Projects</p>
					<p class="resume-summary">
						Experience across technology services and higher education, with a focus on team
						development, service improvement, and technology delivery.
					</p>
				</div>
				<div class="resume-document-label">
					<p>Résumé</p>
					<a href="https://www.brandontaylor.dev/">brandontaylor.dev</a>
				</div>
			</header>

			<nav class="resume-section-nav" aria-label="Résumé sections">
				<a href="#work-experience">Professional Experience</a>
				<a href="#resume-skills">Technical Skills</a>
				<a href="#resume-education">Education</a>
			</nav>

			<section id="work-experience" class="resume-section" aria-labelledby="work-heading">
				<h2 id="work-heading">Professional Experience</h2>
				<ol class="resume-jobs" role="list" aria-label="Work experience, newest to oldest">
					{#each jobs as job (job.id)}<li><JobEntry {job} /></li>{/each}
				</ol>
			</section>

			<section id="resume-skills" class="resume-section" aria-labelledby="skills-heading">
				<h2 id="skills-heading">Technical Skills</h2>
				<div class="resume-skill-groups">
					{#each skillGroups as group}
						<div class="resume-skill-group">
							<h3>{group.label}</h3>
							<ul class="resume-skill-list" role="list">
								{#each group.items as skill}<li>{skill}</li>{/each}
							</ul>
						</div>
					{/each}
				</div>
			</section>

			<section id="resume-education" class="resume-section" aria-labelledby="education-heading">
				<h2 id="education-heading">Education</h2>
				<div class="resume-education-list">
					{#each education as item (item.id)}
						<article class="resume-education-entry">
							<div class="resume-education-heading">
								<div>
									<h3>{item.degree}</h3>
									<p class="resume-institution">{item.institution}</p>
								</div>
								<DateRange start={item.start} end={item.end} />
							</div>
							<p class="resume-gpa">GPA {item.gpa}</p>
						</article>
					{/each}
				</div>
			</section>
		</article>
	</main>
	<Footer resume />
</div>
