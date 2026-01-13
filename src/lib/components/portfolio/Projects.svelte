<script lang="ts">
	import { projects } from '$lib/data/projects';
</script>

<section class="py-16">
	<div class="space-y-8">
		<div>
			<h2 class="mb-2 text-3xl font-bold">Projects</h2>
			<p class="text-zinc-400">Explore the applications and systems I've built</p>
		</div>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each projects.slice(0, 3) as project}
				<div class="rounded-lg border border-zinc-800 p-6 transition-colors hover:border-zinc-700">
					<h3 class="mb-2 text-xl font-semibold">{project.name}</h3>
					<div class="mb-4 flex flex-wrap gap-2">
						{#each project.tags as tag}
							<span class="rounded-full bg-zinc-800 px-2 py-1 text-xs text-zinc-300">{tag}</span>
						{/each}
					</div>
					<p class="text-sm text-zinc-400">{project.description}</p>
				</div>
			{/each}
		</div>

		<div class="text-center">
			<a
				href="/projects"
				class="inline-block rounded-lg bg-zinc-800 px-6 py-3 font-medium transition-colors hover:bg-zinc-700"
			>
				View All Projects →
			</a>
		</div>
	</div>
</section>
