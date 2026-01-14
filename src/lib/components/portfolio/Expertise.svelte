<script lang="ts">
	import CircuitBackground from '../CircuitBackground.svelte';

	const expertise = [
		{
			code: 'CLOUD-01',
			title: 'Cloud Infrastructure',
			icon: 'M3,17V19H9V17H3M3,5V7H13V5H3M13,21V19H21V17H13V15H11V21H13M7,9V11H3V13H7V15H9V9H7M21,13V11H11V13H21M15,9H17V7H21V5H17V3H15V9Z',
			description:
				'Architecting and maintaining scalable cloud environments with AWS, Azure, and GCP, focusing on cost optimization, resilience, and automated provisioning through infrastructure-as-code practices.',
			tags: ['AWS', 'Azure', 'GCP', 'IaC']
		},
		{
			code: 'DEVOPS-02',
			title: 'DevOps & Automation',
			icon: 'M6,2L4,6V8H21V6L19,2H6M3,9V11H4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V11H21V9H3M6,20V11H11V13H13V11H18V20H6Z',
			description:
				'Implementing CI/CD workflows, configuration management, and observability pipelines that accelerate delivery, reduce human error, and promote reliability across complex systems.',
			tags: ['CI/CD', 'Jenkins', 'GitHub Actions', 'Terraform']
		},
		{
			code: 'OBSERVE-03',
			title: 'Observability & Reliability Engineering',
			icon: 'M16,11.78L20.24,4.45L21.97,5.45L16.74,14.5L10.23,10.75L5.46,19H22V21H2V3H4V17.54L9.5,8L16,11.78Z',
			description:
				'Building proactive monitoring, logging, and alerting systems with Prometheus, Grafana, and ELK to ensure visibility, performance insights, and rapid incident response.',
			tags: ['Prometheus', 'Grafana', 'ELK', 'SRE']
		},
		{
			code: 'NETWORK-04',
			title: 'Network Engineering',
			icon: 'M15,20A1,1 0 0,0 14,19H13V17H17A2,2 0 0,0 19,15V8H17V15H14V8H12V15A2,2 0 0,0 14,17V19A1,1 0 0,0 15,20H9A1,1 0 0,0 10,19V17A2,2 0 0,0 12,15V8H10V15H7V8H5V15A2,2 0 0,0 7,17H11V19A1,1 0 0,0 12,20H9M15,6V4H9V6H15M2,2H22V4H2V2M2,20H22V22H2V20Z',
			description:
				'Designing secure and efficient network topologies with VLANs, VPNs, and firewalls to ensure high-performance connectivity across distributed systems.',
			tags: ['VPN', 'VLAN', 'Firewall', 'Load Balancer']
		},
		{
			code: 'AUTO-05',
			title: 'Automation & Scripting',
			icon: 'M4,1H20A1,1 0 0,1 21,2V6A1,1 0 0,1 20,7H4A1,1 0 0,1 3,6V2A1,1 0 0,1 4,1M4,9H20A1,1 0 0,1 21,10V14A1,1 0 0,1 20,15H4A1,1 0 0,1 3,14V10A1,1 0 0,1 4,9M4,17H20A1,1 0 0,1 21,18V22A1,1 0 0,1 20,23H4A1,1 0 0,1 3,22V18A1,1 0 0,1 4,17M9,5H10V3H9V5M9,13H10V11H9V13M9,21H10V19H9V21M5,3V5H7V3H5M5,11V13H7V11H5M5,19V21H7V19H5Z',
			description:
				'Creating automation tools and scripts using Python, Bash, and PowerShell to eliminate manual workflows and increase operational efficiency.',
			tags: ['Python', 'Bash', 'PowerShell', 'Ansible']
		},
		{
			code: 'SECURITY-06',
			title: 'Cloud Security',
			icon: 'M21,11C21,16.55 17.16,21.74 12,23C6.84,21.74 3,16.55 3,11V5L12,1L21,5V11M12,21C15.75,20 19,15.54 19,11.22V6.3L12,3.18L5,6.3V11.22C5,15.54 8.25,20 12,21M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9',
			description:
				'Integrating security best practices across cloud environments—managing IAM, encryption, and compliance frameworks to safeguard assets and data.',
			tags: ['IAM', 'Encryption', 'Compliance', 'Zero Trust']
		}
	];
</script>

<section class="relative mt-64 w-full overflow-hidden py-32">
	<CircuitBackground opacity={30} />
	<div class="mx-auto max-w-7xl px-6 py-12">
		<!-- Terminal Header -->
		<div class="mb-12 border border-teal-500/30 bg-black/60 p-6 font-mono backdrop-blur-sm">
			<div class="mb-3 flex items-center gap-3">
				<span class="text-xs text-teal-400">EXPERTISE.SYS v3.1.4</span>
			</div>
			<div class="border-t border-zinc-800 pt-3">
				<p class="text-sm text-zinc-400">
					<span class="text-teal-400">$</span> cat /usr/local/expertise/core-competencies.log
				</p>
			</div>
		</div>

		<!-- Expertise Grid -->
		<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each expertise as item, idx}
				<div class="group relative flex">
					<!-- Corner Brackets (matching ToolStack) -->
					<div
						class="absolute -left-1 -top-1 h-4 w-4 border-l-2 border-t-2 border-teal-500 transition-all duration-300 group-hover:h-6 group-hover:w-6"
					></div>
					<div
						class="absolute -right-1 -top-1 h-4 w-4 border-r-2 border-t-2 border-teal-500 transition-all duration-300 group-hover:h-6 group-hover:w-6"
					></div>
					<div
						class="absolute -bottom-1 -left-1 h-4 w-4 border-b-2 border-l-2 border-teal-500 transition-all duration-300 group-hover:h-6 group-hover:w-6"
					></div>
					<div
						class="absolute -bottom-1 -right-1 h-4 w-4 border-b-2 border-r-2 border-teal-500 transition-all duration-300 group-hover:h-6 group-hover:w-6"
					></div>

					<!-- Panel Content -->
					<div class="flex flex-1 flex-col border border-teal-500/20 bg-black/40 p-6 backdrop-blur-sm">
						<!-- Scanline Effect (matching ToolStack) -->
						<div
							class="pointer-events-none absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(20,184,166,0.03)_50%)] bg-size-[100%_4px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
						></div>

						<!-- Hexagon Icon -->
						<div class="relative -mt-12 mb-4 flex justify-center">
							<div class="hexagon flex items-center justify-center bg-teal-600">
								<svg class="h-6 w-6 text-white" viewBox="0 0 24 24">
									<path fill="currentColor" d={item.icon} />
								</svg>
							</div>
						</div>

						<!-- Code Header -->
						<div class="relative mb-3 flex items-center justify-center">
							<span
								class="rounded-sm bg-teal-500/20 px-2 py-1 font-mono text-xs font-bold tracking-wider text-teal-400"
							>
								{item.code}
							</span>
						</div>

						<!-- Title -->
						<h3
							class="relative mb-3 text-center font-mono text-base font-bold uppercase tracking-wide text-zinc-100"
						>
							{item.title}
						</h3>

						<!-- Description -->
						<p class="relative mb-4 flex-1 text-center text-sm leading-relaxed text-zinc-400">
							{item.description}
						</p>

						<!-- Tags -->
						<div class="relative flex flex-wrap justify-center gap-2 border-t border-teal-500/10 pt-3">
							{#each item.tags as tag}
								<span
									class="rounded bg-zinc-900/80 px-2 py-1 font-mono text-xs text-zinc-500 transition-all duration-200 group-hover:bg-teal-500/10 group-hover:text-teal-400"
								>
									{tag}
								</span>
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Footer Stats -->
		<div class="mt-8 border border-teal-500/30 bg-black/60 p-4 font-mono backdrop-blur-sm">
			<div class="flex items-center justify-between text-xs">
				<div class="flex items-center gap-4">
					<span class="text-teal-400">EXPERTISE_MODULES:</span>
					<span class="text-zinc-400">{expertise.length} LOADED</span>
				</div>
				<div class="flex items-center gap-4">
					<span class="text-zinc-600">UPTIME: 100%</span>
					<div class="flex items-center gap-1">
						<div class="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
						<span class="text-green-400">OPERATIONAL</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.hexagon {
		width: 60px;
		height: 60px;
		clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
