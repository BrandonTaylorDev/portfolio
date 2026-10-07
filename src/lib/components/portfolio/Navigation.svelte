<script lang="ts">
	import { profile } from '$lib/data/profile';
	let { resume = false }: { resume?: boolean } = $props();
</script>

<header class="site-header">
	<div class="site-container header-inner">
		<a class="wordmark" href="/" aria-label={`${profile.name}, home`}>
			<span class="monogram" aria-hidden="true">BT<span>.</span></span>
			<span>{profile.name}</span>
		</a>
		<nav aria-label="Main navigation">
			<a href={resume ? '/#impact' : '#impact'}>Impact</a>
			<a href={resume ? '/#experience' : '#experience'}>Experience</a>
			<a href="/resume" aria-current={resume ? 'page' : undefined}>Résumé</a>
			<a class="nav-contact" href={resume ? '/#contact' : '#contact'}
				>Contact <span aria-hidden="true">↗</span></a
			>
		</nav>
	</div>
</header>
