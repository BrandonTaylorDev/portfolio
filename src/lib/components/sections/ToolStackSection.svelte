<script lang="ts">
  import ParallaxGroup from '$lib/components/parallax/ParallaxGroup.svelte';
  import ParallaxLayerBase from '$lib/components/parallax/ParallaxLayerBase.svelte';
  import ParallaxContent from '$lib/components/parallax/ParallaxContent.svelte';
	import ParallaxLayerBack from '$lib/components/parallax/ParallaxLayerBack.svelte';
  import ParticleFieldBackground from '$lib/components/backgrounds/ParticleFieldBackground.svelte';
	import { skills } from '$lib/data/skills';

  const categories = [
		{
			title: 'Platforms',
			items: skills.platforms,
			icon: 'M4,6H20V16H4M20,18A2,2 0 0,0 22,16V6C22,4.89 21.1,4 20,4H4C2.89,4 2,4.89 2,6V16A2,2 0 0,0 4,18H0V20H24V18H20Z'
		},
		{
			title: 'Languages & Frameworks',
			items: skills.languagesFrameworks,
			icon: 'M14.6,16.6L19.2,12L14.6,7.4L16,6L22,12L16,18L14.6,16.6M9.4,16.6L4.8,12L9.4,7.4L8,6L2,12L8,18L9.4,16.6Z'
		},
		{
			title: 'Cloud & Infrastructure',
			items: skills.cloudInfrastructure,
			icon: 'M19.35,10.04C18.67,6.59 15.64,4 12,4C9.11,4 6.6,5.64 5.35,8.04C2.34,8.36 0,10.91 0,14A6,6 0 0,0 6,20H19A5,5 0 0,0 24,15C24,12.36 21.95,10.22 19.35,10.04Z'
		},
		{
			title: 'Database & Tools',
			items: skills.databaseTools,
			icon: 'M12,3C7.58,3 4,4.79 4,7C4,9.21 7.58,11 12,11C16.42,11 20,9.21 20,7C20,4.79 16.42,3 12,3M4,9V12C4,14.21 7.58,16 12,16C16.42,16 20,14.21 20,12V9C20,11.21 16.42,13 12,13C7.58,13 4,11.21 4,9M4,14V17C4,19.21 7.58,21 12,21C16.42,21 20,19.21 20,17V14C20,16.21 16.42,18 12,18C7.58,18 4,16.21 4,14Z'
		}
	];
</script>

<ParallaxGroup>
  <ParallaxLayerBack>
    <ParticleFieldBackground
      opacity={50}
      fadeType="radial"
      primaryColor="#14b8a6"
      secondaryColor="#0891b2"
      animationSpeed={1.0}
      nodeCount={200}
    />
  </ParallaxLayerBack>
  <ParallaxLayerBase>
    <ParallaxContent>
      <div class="relative z-50 mx-auto max-w-6xl px-6 py-12">
        <h2 class="mb-16 text-center text-3xl font-bold text-teal-400">Tool Stack</h2>

        <!-- Categories Grid -->
        <div class="grid gap-8 md:grid-cols-2">
          {#each categories as category}
            <div
              class="group relative overflow-hidden rounded-lg border-2 border-zinc-700 bg-zinc-800/70 p-8 shadow-lg transition-all duration-300 hover:border-teal-500 hover:shadow-2xl"
            >
              <!-- Icon and Title Row -->
              <div class="mb-6 flex items-center gap-4 border-b border-zinc-700 pb-4">
                <div
                  class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-zinc-900 transition-all duration-300 group-hover:bg-teal-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-6 w-6 fill-teal-400 transition-colors duration-300 group-hover:fill-white">
                    <path d={category.icon} />
                  </svg>
                </div>
                <div class="flex-1">
                  <h3 class="text-lg font-bold text-zinc-100 transition-colors duration-300 group-hover:text-teal-400">
                    {category.title}
                  </h3>
                  <p class="text-xs text-zinc-500">
                    {category.items.length} technologies
                  </p>
                </div>
              </div>

              <!-- Tools Grid -->
              <div class="flex flex-wrap gap-2">
                {#each category.items as tool}
                  <span
                    class="rounded-md border border-zinc-700 bg-zinc-800/70 px-3 py-1.5 text-sm text-zinc-300 transition-all duration-200 hover:border-teal-500 hover:bg-zinc-800 hover:text-teal-400 hover:shadow-md"
                  >
                    {tool}
                  </span>
                {/each}
              </div>
            </div>
          {/each}
        </div>
      </div>
    </ParallaxContent>
  </ParallaxLayerBase>
</ParallaxGroup>
