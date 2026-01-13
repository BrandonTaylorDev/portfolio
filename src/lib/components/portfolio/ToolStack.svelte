<script lang="ts">
	import ParticleFieldBackground from '../ParticleFieldBackground.svelte';
	import { skills } from '$lib/data/skills';

	const stack = [
		{
			title: 'Platforms',
			items: skills.platforms,
			icon: 'M3,17V19H9V17H3M3,5V7H13V5H3M13,21V19H21V17H13V15H11V21H13M7,9V11H3V13H7V15H9V9H7M21,13V11H11V13H21M15,9H17V7H21V5H17V3H15V9Z'
		},
		{
			title: 'Languages',
			items: skills.languages,
			icon: 'M14.6,16.6L19.2,12L14.6,7.4L16,6L22,12L16,18L14.6,16.6M9.4,16.6L4.8,12L9.4,7.4L8,6L2,12L8,18L9.4,16.6Z'
		},
		{
			title: 'Frameworks',
			items: skills.frameworks,
			icon: 'M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z'
		},
		{
			title: 'Other',
			items: skills.other,
			icon: 'M6,2L4,6V8H21V6L19,2H6M3,9V11H4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V11H21V9H3M6,20V11H11V13H13V11H18V20H6Z'
		}
	];

	const tools = (() => {
		const list: string[] = [];
		stack.forEach((s) => {
			if (Array.isArray(s.items)) list.push(...s.items);
		});
		return Array.from(new Set(list)).sort((a, b) => a.localeCompare(b));
	})();
</script>

<section class="relative mt-64 flex w-full items-center justify-center overflow-hidden py-32">
	<ParticleFieldBackground
		opacity={50}
		fadeType="radial"
		primaryColor="#14b8a6"
		secondaryColor="#0891b2"
		nodeCount={100}
		connectionDistance={150}
		animationSpeed={1}
	/>

	<div class="mx-auto max-w-5xl px-6 py-12">
		<h2 class="mb-8 text-center text-3xl font-bold text-teal-400">Tool Stack</h2>

		<div class="flex w-full justify-center">
			<div class="relative w-full max-w-4xl">
				<div class="flex flex-wrap justify-center gap-3" role="list">
					{#each tools as tool}
						<button
							class="transform-gpu cursor-pointer rounded-full bg-zinc-800 px-4 py-2 text-sm text-zinc-100 transition duration-300 hover:scale-105 hover:bg-teal-600 hover:text-zinc-100 focus:scale-105 focus:ring-2 focus:ring-teal-500 focus:outline-none"
							type="button"
							aria-label={tool}
						>
							{tool}
						</button>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>
