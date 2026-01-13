<script lang="ts">
  import HexagonBackground from '$lib/components/HexagonBackground.svelte';
  import CircuitBackground from '$lib/components/CircuitBackground.svelte';
  import Icon from '@iconify/svelte';

  const projects = [
    {
      name: 'When Should I Take a Vacation?',
      tags: [ 'Svelte', 'TypeScript', 'Tailwind CSS', 'Vercel' ],
      description: 'A silly, yet useful tool that offers personalized vacation date recommendations based on your available paid time off and federal holidays.',
      icon: 'mdi:beach',
      href: 'https://www.whenshoulditakeavacation.com/'
    },
    {
      name: 'URL Shortener',
      tags: [ 'Nuxt', 'TypeScript', 'Tailwind CSS', 'MongoDB', 'Vercel'],
      description: 'A simple and efficient URL shortening service that allows users to create and use shortened links with ease.',
      icon: 'mdi:link-variant',
      href: 'https://short.app.brandontaylor.dev/'
    }
  ];
</script>

<svelte:head>
  <title>Projects | Brandon Taylor</title>
  <meta name="description" content="A showcase of projects and applications I've built." />
</svelte:head>

<div class="min-h-screen bg-zinc-900 text-zinc-100">
  <!-- Hero Section -->
  <section class="relative overflow-hidden py-24">
    <HexagonBackground opacity={15} fadeType="radial" />
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <a href="/" class="text-zinc-400 hover:text-teal-400 transition-colors mb-6 inline-flex items-center gap-2 group">
        <Icon icon="mdi:arrow-left" class="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
        <span>Back to Home</span>
      </a>
      <div class="text-center">
        <h1 class="text-5xl md:text-6xl font-bold mb-6">
          <span class="text-teal-400">Projects</span> & Applications
        </h1>
        <p class="text-xl text-zinc-400 max-w-3xl mx-auto">
          A collection of platforms, tools, and systems I've created to solve both simple and complex problems,
          and sometimes just for fun.
        </p>
      </div>
    </div>
  </section>

  <!-- Projects Grid Section -->
  <section class="relative overflow-hidden py-24">
    <CircuitBackground opacity={30} />
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] justify-items-center gap-8">
        {#each projects as project, i}
          <div 
            class="group relative bg-zinc-800 border border-zinc-700 rounded-lg p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-teal-500 w-full max-w-sm"
            style="animation-delay: {i * 100}ms"
          >
            <!-- Icon -->
            <div class="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div class="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center shadow-lg group-hover:bg-teal-500 transition-colors">
                <Icon icon={project.icon} class="w-8 h-8 text-white" />
              </div>
            </div>

            <!-- Content -->
            <div class="mt-4 flex flex-col h-full">
              <h2 class="text-2xl font-bold mb-4 text-center group-hover:text-teal-400 transition-colors">
                {project.name}
              </h2>
              
              <div class="flex flex-wrap gap-2 mb-6 justify-center">
                {#each project.tags as tag}
                  <span class="text-xs px-3 py-1 bg-zinc-900 rounded-full text-zinc-300 border border-zinc-700">
                    {tag}
                  </span>
                {/each}
              </div>
              
              <p class="text-zinc-400 leading-relaxed text-center flex-1">
                {project.description}
              </p>

              <a 
                href={project.href}
                class="mt-6 inline-flex items-center justify-center gap-1 text-teal-400 hover:text-teal-300 transition-colors"
              >
                Check it out
                <Icon icon="mdi:arrow-right" class="w-4 h-4" />
              </a>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>
</div>
