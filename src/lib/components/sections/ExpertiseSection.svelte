<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
  import ParallaxGroup from '$lib/components/parallax/ParallaxGroup.svelte';
  import ParallaxLayerBase from '$lib/components/parallax/ParallaxLayerBase.svelte';
  import ParallaxContent from '$lib/components/parallax/ParallaxContent.svelte';

	const cards = [
		{
			icon: 'M3,17V19H9V17H3M3,5V7H13V5H3M13,21V19H21V17H13V15H11V21H13M7,9V11H3V13H7V15H9V9H7M21,13V11H11V13H21M15,9H17V7H21V5H17V3H15V9Z',
			title: 'Cloud Infrastructure',
			copy: 'Architecting and maintaining scalable cloud environments with AWS, Azure, and GCP, focusing on cost optimization, resilience, and automated provisioning through infrastructure-as-code practices.'
		},
		{
			icon: 'M6,2L4,6V8H21V6L19,2H6M3,9V11H4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V11H21V9H3M6,20V11H11V13H13V11H18V20H6Z',
			title: 'DevOps & Automation',
			copy: 'Implementing CI/CD workflows, configuration management, and observability pipelines that accelerate delivery, reduce human error, and promote reliability across complex systems.'
		},
		{
			icon: 'M16,11.78L20.24,4.45L21.97,5.45L16.74,14.5L10.23,10.75L5.46,19H22V21H2V3H4V17.54L9.5,8L16,11.78Z',
			title: 'Observability & Reliability Engineering',
			copy: 'Building proactive monitoring, logging, and alerting systems with Prometheus, Grafana, and ELK to ensure visibility, performance insights, and rapid incident response.'
		},
		{
			icon: 'M15,20A1,1 0 0,0 14,19H13V17H17A2,2 0 0,0 19,15V8H17V15H14V8H12V15A2,2 0 0,0 14,17V19A1,1 0 0,0 15,20H9A1,1 0 0,0 10,19V17A2,2 0 0,0 12,15V8H10V15H7V8H5V15A2,2 0 0,0 7,17H11V19A1,1 0 0,0 12,20H9M15,6V4H9V6H15M2,2H22V4H2V2M2,20H22V22H2V20Z',
			title: 'Network Engineering',
			copy: 'Designing secure and efficient network topologies with VLANs, VPNs, and firewalls to ensure high-performance connectivity across distributed systems.'
		},
		{
			icon: 'M4,1H20A1,1 0 0,1 21,2V6A1,1 0 0,1 20,7H4A1,1 0 0,1 3,6V2A1,1 0 0,1 4,1M4,9H20A1,1 0 0,1 21,10V14A1,1 0 0,1 20,15H4A1,1 0 0,1 3,14V10A1,1 0 0,1 4,9M4,17H20A1,1 0 0,1 21,18V22A1,1 0 0,1 20,23H4A1,1 0 0,1 3,22V18A1,1 0 0,1 4,17M9,5H10V3H9V5M9,13H10V11H9V13M9,21H10V19H9V21M5,3V5H7V3H5M5,11V13H7V11H5M5,19V21H7V19H5Z',
			title: 'Automation & Scripting',
			copy: 'Creating automation tools and scripts using Python, Bash, and PowerShell to eliminate manual workflows and increase operational efficiency.'
		},
		{
			icon: 'M21,11C21,16.55 17.16,21.74 12,23C6.84,21.74 3,16.55 3,11V5L12,1L21,5V11M12,21C15.75,20 19,15.54 19,11.22V6.3L12,3.18L5,6.3V11.22C5,15.54 8.25,20 12,21M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9',
			title: 'Cloud Security',
			copy: 'Integrating security best practices across cloud environments—managing IAM, encryption, and compliance frameworks to safeguard assets and data.'
		}
	];

	let cardRefs = $state<HTMLElement[]>([]);
	let titleRef = $state<HTMLHeadingElement | null>(null);
	let observer: IntersectionObserver | undefined;

	const baseDelay = 200;
	const delayStep = 100;

	function handleIntersection(entries: IntersectionObserverEntry[]) {
		for (const entry of entries) {
			if (entry.isIntersecting) {
				const el = entry.target;

				if (el === titleRef) {
					el.classList.add('animate-fade-in');
					el.classList.remove('opacity-0');
					observer?.unobserve(el);
					continue;
				}

				if (el instanceof HTMLElement) {
					const idx = Number(el.dataset.index ?? 0);
					const delay = baseDelay + idx * delayStep;

					el.style.animationDelay = `${delay}ms`;
					el.classList.add('animate-fade-in-bottom');
					el.classList.remove('opacity-0');
					observer?.unobserve(entry.target);
				}
			}
		}
	}

	onMount(() => {
		if (!browser) return;

		observer = new IntersectionObserver(handleIntersection, {
			threshold: 0.1,
			rootMargin: '0px 0px -50px 0px'
		});

		cardRefs.forEach((el) => el && observer?.observe(el));
		titleRef && observer?.observe(titleRef);

		return () => observer?.disconnect();
	});
</script>

<ParallaxGroup>
  <ParallaxLayerBase>
    <ParallaxContent>
			<div class="mx-auto max-w-5xl px-6 py-12">
				<h2 bind:this={titleRef} class="mb-12 text-center text-3xl font-bold text-teal-400 opacity-0">
					Core Engineering & Technical Expertise
				</h2>
				<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
					{#each cards as card, i}
						<div
							bind:this={cardRefs[i]}
							data-index={i}
							class="relative rounded-lg border border-zinc-600 bg-zinc-800/70 p-6 opacity-0 shadow-lg transition-all duration-300 hover:scale-105 hover:border-teal-500 hover:shadow-2xl"
						>
							<div class="absolute -top-6 left-1/2 -translate-x-1/2 transform">
								<div class="hexagon flex items-center justify-center bg-teal-600">
									<svg class="h-6 w-6 text-white" viewBox="0 0 24 24">
										<path fill="currentColor" d={card.icon} />
									</svg>
								</div>
							</div>

							<div class="mt-4">
								<h3 class="mb-4 text-center text-xl font-semibold text-teal-400">
									{card.title}
								</h3>
								<p class="text-center text-sm text-zinc-300">
									{card.copy}
								</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</ParallaxContent>
  </ParallaxLayerBase>
</ParallaxGroup>

<style>
	.hexagon {
		width: 48px;
		height: 48px;
		position: relative;
		clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.hexagon::before {
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		background: inherit;
		z-index: -1;
	}
</style>

