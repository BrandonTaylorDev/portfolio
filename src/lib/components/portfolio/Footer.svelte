<script lang="ts">
	import { profile } from '$lib/data/profile';
	let { resume = false }: { resume?: boolean } = $props();
</script>

<footer class="site-footer">
	<div class="site-container footer-inner">
		<div>
			<a class="footer-name" href="/">{profile.name}</a>
			<p>{profile.positioning}</p>
		</div>
		<div class="footer-links">
			<a href="/resume">Résumé</a>
			<a href={resume ? '/#contact' : '#contact'}>Contact <span aria-hidden="true">↗</span></a>
		</div>
	</div>
</footer>
