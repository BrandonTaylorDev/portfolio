<script lang="ts">
  import { projects } from '$lib/data/projects';
</script>

<section class="py-16">
  <div class="space-y-8">
    <div>
      <h2 class="text-3xl font-bold mb-2">Projects</h2>
      <p class="text-zinc-400">Explore the applications and systems I've built</p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each projects.slice(0, 3) as project}
        <div class="border border-zinc-800 rounded-lg p-6 hover:border-zinc-700 transition-colors">
          <h3 class="text-xl font-semibold mb-2">{project.name}</h3>
          <div class="flex flex-wrap gap-2 mb-4">
            {#each project.tags as tag}
              <span class="text-xs px-2 py-1 bg-zinc-800 rounded-full text-zinc-300">{tag}</span>
            {/each}
          </div>
          <p class="text-zinc-400 text-sm">{project.description}</p>
        </div>
      {/each}
    </div>

    <div class="text-center">
      <a 
        href="/projects" 
        class="inline-block px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors font-medium"
      >
        View All Projects →
      </a>
    </div>
  </div>
</section>
