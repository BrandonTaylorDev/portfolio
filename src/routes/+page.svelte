<script lang="ts">
	import HeroSection from '$lib/components/sections/HeroSection.svelte';
	import TaglineSection from '$lib/components/sections/TaglineSection.svelte';
	import ExpertiseSection from '$lib/components/sections/ExpertiseSection.svelte';
	import ToolStackSection from '$lib/components/sections/ToolStackSection.svelte';
	import ContactSection from '$lib/components/sections/ContactSection.svelte';
</script>

<svelte:head>
	<title>Brandon Taylor | brandontaylor.dev</title>
	<meta
		name="description"
		content="Brandon Taylor - Platform Engineer - I build resilient infrastructure, scalable platforms, and secure systems."
	/>
	<meta property="og:title" content="Brandon Taylor | brandontaylor.dev" />
	<meta
		property="og:description"
		content="Brandon Taylor - Platform Engineer - I build resilient infrastructure, scalable platforms, and secure systems."
	/>
	<meta property="og:image" content="/portfolio.webp" />
	<meta property="og:url" content="https://www.brandontaylor.dev" />
</svelte:head>

<div class="parallax bg-zinc-900 text-zinc-100">
	<HeroSection />
	<TaglineSection />
	<ExpertiseSection />
	<ToolStackSection />
	<ContactSection />
</div>
