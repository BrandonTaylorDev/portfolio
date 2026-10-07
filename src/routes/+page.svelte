<script lang="ts">
	import Navigation from '$lib/components/portfolio/Navigation.svelte';
	import Footer from '$lib/components/portfolio/Footer.svelte';
	import Hero from '$lib/components/portfolio/Hero.svelte';
	import Impact from '$lib/components/portfolio/Impact.svelte';
	import Experience from '$lib/components/portfolio/Experience.svelte';
	import Foundation from '$lib/components/portfolio/Foundation.svelte';
	import ContactSection from '$lib/components/sections/ContactSection.svelte';
	import { scrollReveal } from '$lib/actions/scrollReveal';
	import '$lib/styles/profile.css';

	const title = 'Brandon Taylor | IT Leadership';
	const description =
		'IT leadership focused on people, service delivery, and business outcomes. Explore Brandon Taylor’s experience developing teams, improving operations, and delivering technology projects.';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href="https://www.brandontaylor.dev/" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="https://www.brandontaylor.dev/portfolio.webp" />
	<meta property="og:image:alt" content="Brandon Taylor" />
	<meta property="og:url" content="https://www.brandontaylor.dev/" />
</svelte:head>

<div class="professional-site">
	<a class="skip-link" href="#main-content">Skip to content</a>
	<Navigation />
	<main id="main-content" class="site-container" tabindex="-1" use:scrollReveal>
		<Hero />
		<Impact />
		<Experience />
		<Foundation />
		<ContactSection />
	</main>
	<Footer />
</div>
