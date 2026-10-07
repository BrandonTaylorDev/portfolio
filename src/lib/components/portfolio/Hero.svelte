<script lang="ts">
	import { profile } from '$lib/data/profile';
</script>

<section class="hero" aria-labelledby="hero-heading">
	<div class="hero-copy">
		<p class="eyebrow">{profile.positioning}</p>
		<h1 id="hero-heading">
			Stronger teams.<br />Smarter IT.<br /><span>Better outcomes.</span>
		</h1>
		<p class="hero-introduction">{profile.introduction}</p>
		<div class="hero-actions">
			<a class="button button-primary" href="/resume"
				>View résumé <span aria-hidden="true">↗</span></a
			>
			<a class="button button-secondary" href="#contact"
				>Get in touch <span aria-hidden="true">→</span></a
			>
		</div>
		<p class="hero-note">People leadership. Operational focus. Business perspective.</p>
	</div>
	<figure class="hero-portrait">
		<div class="portrait-frame">
			<img
				src="/portfolio.webp"
				alt="Brandon Taylor"
				width="1000"
				height="953"
				fetchpriority="high"
			/>
		</div>
		<figcaption>
			<strong>{profile.name}</strong><span>People leadership. Technical depth.</span>
		</figcaption>
	</figure>
</section>
