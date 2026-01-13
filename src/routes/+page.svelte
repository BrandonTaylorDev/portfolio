<script lang="ts">
	import { fly } from 'svelte/transition';
	import Portfolio from '$lib/components/portfolio/index.svelte';
	import Resume from '$lib/components/resume/index.svelte';

	let showResume = $state(false);

	function handleUpdateShowResume(val: boolean) {
		showResume = val;
	}
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

<div class="relative h-screen w-screen overflow-hidden bg-zinc-900">
	{#if !showResume}
		<div
			class="absolute inset-0 flex"
			in:fly={{ x: '-100%', duration: 700 }}
			out:fly={{ x: '-100%', duration: 700 }}
		>
			<Portfolio {showResume} onUpdateShowResume={handleUpdateShowResume} />
		</div>
	{:else}
		<div
			class="absolute inset-0 flex"
			in:fly={{ x: '100%', duration: 700 }}
			out:fly={{ x: '100%', duration: 700 }}
		>
			<Resume {showResume} onUpdateShowResume={handleUpdateShowResume} />
		</div>
	{/if}
</div>
