<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { onDestroy } from 'svelte';
	import { profile } from '$lib/data/profile';
	let { resume = false }: { resume?: boolean } = $props();
	let activeSection = $state('');
	let anchorTimer: ReturnType<typeof setTimeout>;

	afterNavigate(({ to, type }) => {
		if (resume || !['enter', 'link', 'goto'].includes(type)) return;
		const id = to?.url.hash.slice(1);
		if (!id || !['impact', 'experience', 'foundation', 'contact'].includes(id)) return;
		// Apply the header offset after the router restores focus on a new page.
		anchorTimer = setTimeout(() => document.getElementById(id)?.scrollIntoView(), 0);
	});
	onDestroy(() => clearTimeout(anchorTimer));

	function trackNavigation(header: HTMLElement) {
		const site = header.closest<HTMLElement>('.professional-site')!;
		const nav = header.querySelector<HTMLElement>('nav')!;
		const indicator = nav.querySelector<HTMLElement>('.nav-indicator')!;
		const sections = resume
			? []
			: ['impact', 'experience', 'foundation', 'contact']
					.map((id) => site.querySelector<HTMLElement>(`#${id}`))
					.filter((section): section is HTMLElement => section !== null);
		let frame = 0;
		let headerHeight = 0;
		let animateIndicator = false;

		function updateIndicator(active: string) {
			const link = active ? nav.querySelector<HTMLAnchorElement>(`a[href="#${active}"]`) : null;
			if (!link) {
				indicator.dataset.visible = 'false';
				return;
			}

			// Follow the text, including inside the outlined Contact link.
			const text = document.createRange();
			text.selectNodeContents(link);
			const bounds = text.getBoundingClientRect();
			const origin = nav.getBoundingClientRect();
			indicator.dataset.moving = String(animateIndicator && indicator.dataset.visible === 'true');
			indicator.style.transform = `translate3d(${bounds.left - origin.left}px, ${bounds.bottom - origin.top + 4}px, 0)`;
			indicator.style.width = `${bounds.width}px`;
			indicator.dataset.visible = 'true';
		}

		function updateActiveSection() {
			frame = 0;
			const marker = headerHeight + 25;
			let active = '';
			for (const section of sections) {
				if (section.getBoundingClientRect().top <= marker) active = section.id;
			}
			// A short final section may not reach the header before the page ends.
			if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
				const lastSection = sections.at(-1);
				if (lastSection && lastSection.getBoundingClientRect().top < window.innerHeight) {
					active = lastSection.id;
				}
			}
			activeSection = active;
			updateIndicator(active);
			animateIndicator = true;
		}

		function scheduleUpdate() {
			if (!frame) frame = window.requestAnimationFrame(updateActiveSection);
		}

		function updateHeaderOffset() {
			headerHeight = header.getBoundingClientRect().height;
			site.style.setProperty('--anchor-offset', `${headerHeight + 24}px`);
			animateIndicator = false;
			scheduleUpdate();
		}

		const observer = new ResizeObserver(updateHeaderOffset);
		observer.observe(header);
		observer.observe(nav);
		updateHeaderOffset();
		window.addEventListener('scroll', scheduleUpdate, { passive: true });
		window.addEventListener('resize', scheduleUpdate);

		return {
			destroy() {
				observer.disconnect();
				window.cancelAnimationFrame(frame);
				window.removeEventListener('scroll', scheduleUpdate);
				window.removeEventListener('resize', scheduleUpdate);
				site.style.removeProperty('--anchor-offset');
			}
		};
	}
</script>

<header class="site-header" use:trackNavigation>
	<div class="site-container header-inner">
		<a class="wordmark" href="/" aria-label={`${profile.name}, home`}>
			<span class="monogram" aria-hidden="true">BT<span>.</span></span>
			<span>{profile.name}</span>
		</a>
		<nav aria-label="Main navigation">
			<a
				href={resume ? '/#impact' : '#impact'}
				aria-current={activeSection === 'impact' ? 'location' : undefined}>Impact</a
			>
			<a
				href={resume ? '/#experience' : '#experience'}
				aria-current={activeSection === 'experience' ? 'location' : undefined}>Experience</a
			>
			<a
				href={resume ? '/#foundation' : '#foundation'}
				aria-current={activeSection === 'foundation' ? 'location' : undefined}>Approach</a
			>
			<a
				class="nav-contact"
				href={resume ? '/#contact' : '#contact'}
				aria-current={activeSection === 'contact' ? 'location' : undefined}
				>Contact <span aria-hidden="true">↗</span></a
			>
			<span class="nav-indicator" aria-hidden="true"></span>
		</nav>
	</div>
</header>
