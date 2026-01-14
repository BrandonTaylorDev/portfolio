<script lang="ts">;
	import Portfolio from '$lib/components/portfolio/index.svelte';
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

<div class="relative h-screen w-screen bg-zinc-900">
	<Portfolio />
</div>
