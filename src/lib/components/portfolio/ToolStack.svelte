<script lang="ts">
	import ParticleFieldBackground from '../ParticleFieldBackground.svelte';
	import { skills } from '$lib/data/skills';

	const categories = [
		{ title: 'Platforms', items: skills.platforms, prefix: 'SYS' },
		{ title: 'Languages & Frameworks', items: skills.languagesFrameworks, prefix: 'DEV' },
		{ title: 'Cloud & Infrastructure', items: skills.cloudInfrastructure, prefix: 'OPS' },
		{ title: 'Database & Tools', items: skills.databaseTools, prefix: 'DATA' }
	];
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

	<div class="relative z-10 mx-auto max-w-7xl px-6 py-12">
		<!-- Terminal Header -->
		<div class="mb-12 border border-teal-500/30 bg-black/60 p-6 font-mono backdrop-blur-sm">
			<div class="mb-3 flex items-center gap-3">
				<!-- <div class="flex gap-1.5">
					<div class="h-3 w-3 rounded-full bg-red-500"></div>
					<div class="h-3 w-3 rounded-full bg-yellow-500"></div>
					<div class="h-3 w-3 rounded-full bg-green-500"></div>
				</div> -->
				<span class="text-xs text-teal-400">TECHSTACK.SYS v2.0.1</span>
			</div>
			<div class="border-t border-zinc-800 pt-3">
				<p class="text-sm text-zinc-400">
					<span class="text-teal-400">$</span> display --capabilities --all
				</p>
			</div>
		</div>

		<!-- Categories Grid -->
		<div class="grid gap-6 md:grid-cols-2 md:auto-rows-fr">
			{#each categories as category, idx}
				<div class="group relative flex">
					<!-- Corner Brackets -->
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
						<!-- Scanline Effect -->
						<div
							class="pointer-events-none absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(20,184,166,0.03)_50%)] bg-size-[100%_4px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
						></div>

						<!-- Category Header -->
						<div class="mb-4 flex items-center justify-between border-b border-teal-500/20 pb-3">
							<div class="flex items-center gap-3">
								<span
									class="rounded bg-teal-500/10 px-2 py-1 font-mono text-xs font-bold text-teal-400"
								>
									{category.prefix}
								</span>
								<h3 class="font-mono text-sm font-semibold uppercase tracking-wider text-zinc-100">
									{category.title}
								</h3>
							</div>
							<span class="font-mono text-xs text-zinc-600">
								[{category.items.length.toString().padStart(2, '0')}]
							</span>
						</div>

						<!-- Tools List -->
						<div class="flex flex-1 flex-col space-y-2">
							{#each category.items as tool, toolIdx}
								<div
									class="group/tool flex items-center gap-3 border-l-2 border-transparent pl-3 transition-all duration-200 hover:border-teal-500 hover:bg-teal-500/5"
								>
									<span class="font-mono text-xs text-teal-600">
										{(toolIdx + 1).toString().padStart(2, '0')}
									</span>
									<span
										class="flex-1 font-mono text-sm text-zinc-400 transition-colors duration-200 group-hover/tool:text-teal-300"
									>
										{tool}
									</span>
									<div
										class="h-1.5 w-1.5 rounded-full bg-teal-500 opacity-0 transition-opacity duration-200 group-hover/tool:opacity-100"
									></div>
								</div>
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Status Bar -->
		<div class="mt-8 border border-teal-500/30 bg-black/60 p-4 font-mono backdrop-blur-sm">
			<div class="flex items-center justify-between text-xs">
				<div class="flex items-center gap-4">
					<span class="text-teal-400">STATUS:</span>
					<span class="text-zinc-400">READY</span>
				</div>
				<div class="flex items-center gap-4">
					<span class="text-zinc-600">
						TOTAL: {categories.reduce((acc, cat) => acc + cat.items.length, 0)} TECHNOLOGIES
					</span>
					<div class="flex items-center gap-1">
						<div class="h-2 w-2 animate-pulse rounded-full bg-teal-500"></div>
						<span class="text-teal-400">ONLINE</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
