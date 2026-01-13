<script lang="ts">
  import HexagonBackground from '../HexagonBackground.svelte';
  
  let { showResume = false, onUpdateShowResume } = $props();
</script>

<section class="h-full flex flex-col items-center justify-center px-6 relative overflow-hidden gap-4 md:gap-16 py-32">
  <HexagonBackground opacity={15} fadeType="radial" />

  <div class="max-w-5xl mx-auto flex flex-row items-center justify-center">
    <div class="flex flex-col items-center lg:items-end text-center lg:text-right duration-500 ease-in-out max-w-2xl lg:max-w-full">
      <div class="space-y-4 lg:text-start">
        <div>
          <h2 class="animate-fade-in-left text-3xl xl:text-4xl font-light text-zinc-400 tracking-wide transition-[font-size]">
            Hi! <span class="animate-shaka animation-delay-1.5s inline-block">🤙</span>
          </h2>

          <h1 class="animate-fade-in-left animation-delay-100 text-6xl xl:text-7xl font-bold transition-[font-size]">
            I'm <span class="text-teal-500">Brandon</span> <span class="initial">Taylor</span>
          </h1>
        </div>

        <div>
          <p class="animate-fade-in-left animation-delay-200 lg:text-lg font-light text-zinc-300 max-w-3xl mx-auto lg:mx-0 leading-relaxed transition-[font-size]">
            A passionate enterprise platform engineer specializing in building scalable solutions and services tailored for the modern world.
          </p>
        </div>

        <div class="flex flex-col sm:flex-row gap-4">
          <button
            class="animate-fade-in-left animation-delay-300 inline-flex items-center gap-3 px-8 py-4 bg-teal-600 hover:bg-teal-500 text-zinc-100 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
            onclick={() => onUpdateShowResume?.(!showResume)}
          >
            <svg class="w-7 h-7" viewBox="0 0 24 24">
              <path fill="currentColor" d="M6,2A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6M6,4H13V9H18V20H6V4M8,12V14H16V12H8M8,16V18H13V16H8Z" />
            </svg>
            <span>View Resume</span>
          </button>
          
          <a
            href="/projects"
            class="animate-fade-in-left animation-delay-400 inline-flex items-center gap-3 px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border border-zinc-700 hover:border-zinc-600"
          >
            <svg class="w-7 h-7" viewBox="0 0 24 24">
              <path fill="currentColor" d="M16,20H20V16H16M16,14H20V10H16M10,8H14V4H10M16,8H20V4H16M10,14H14V10H10M4,14H8V10H4M4,20H8V16H4M10,20H14V16H10M4,8H8V4H4V8Z" />
            </svg>
            <span>View Projects</span>
          </a>
        </div>
      </div>
    </div>

    <div class="hidden w-96 lg:flex justify-center items-center animate-fade-in animation-delay-500 duration-300 ease-in-out">
      <img
        class="rounded-full h-auto w-full shadow-2xl border-4 border-zinc-700 transition-[width,height]"
        src="/portfolio.webp"
        alt="Brandon Taylor"
      />
    </div>
  </div>
</section>

<style>
  @keyframes shaka-in {
    0%, 100% { transform: rotate(0deg) scale(1); }
    25% { transform: rotate(-15deg) scale(1.1); }
    50% { transform: rotate(10deg) scale(1.05); }
    75% { transform: rotate(-5deg) scale(1.02); }
  }

  @keyframes shaka {
    0%, 100% { transform: rotate(0deg) scale(1); }
    25% { transform: rotate(-15deg) scale(1.1); }
    50% { transform: rotate(10deg) scale(1.05); }
    75% { transform: rotate(-5deg) scale(1.02); }
  }

  .animate-shaka { 
    animation: shaka-in 0.6s ease-in-out 0.8s both; 
  }

  .animate-shaka:hover { 
    animation: shaka 0.6s ease-in-out both; 
  }
</style>
