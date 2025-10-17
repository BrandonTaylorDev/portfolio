<script setup lang="ts">
  type Props = {
    showResume?: boolean
  }
  withDefaults(defineProps<Props>(), { showResume: false });
  defineEmits([ 'updateShowResume' ]);
</script>

<template>
  <rail-side class="bg-zinc-900 text-zinc-100">
    <div class="h-full flex flex-col items-center justify-center px-6 py-12">
      
      <!-- Main hero content with portrait -->
      <div class="max-w-8xl mx-auto flex flex-row items-center justify-center gap-8 lg:gap-16">
        
        <!-- Hero text - center/left -->
        <div class="flex flex-col items-center lg:items-end text-center lg:text-right">
          <div class="text-left space-y-4 w-fit">
            <div class="space-y-2 animate-fade-in-left">
              <h2 class="text-5xl sm:text-6xl font-light text-zinc-400 tracking-wide">
                Hi!<span class="animate-shaka animation-delay-1.5s inline-block">🤙</span>
              </h2>
            </div>

            <div class="space-y-4 animate-fade-in-left animation-delay-100">
              <h1 class="text-5xl sm:text-6xl font-bold leading-tight">
                 I'm <span class="text-teal-500">Brandon</span> Taylor
              </h1>
            </div>

            <div class="space-y-4 animate-fade-in-left animation-delay-200">
              <p class="text-xl md:text-2xl lg:text-3xl font-light text-zinc-300 max-w-3xl mx-auto lg:mx-0 leading-relaxed">
                Fueled by <span class="coffee-cursor">coffee</span>, driven by ambition.
              </p>
            </div>

            <div class="pt-8 animate-fade-in-left animation-delay-300">
              <button 
                class="inline-flex items-center gap-3 px-8 py-4 bg-teal-600 hover:bg-teal-500 text-zinc-100 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                @click="$emit('updateShowResume', !showResume);"
              >
                <icon name="mdi:document" size="1.75rem" />
                <span>View Resume</span>
              </button>
            </div>
          </div>
        </div>
        
        <!-- Portrait - prominent on right -->
        <div class="hidden lg:inline-block flex justify-center items-center animate-fade-in animation-delay-500">
          <img
            class="rounded-full w-48 h-48 md:w-64 md:h-64 lg:w-96 lg:h-96 xl:w-[28rem] xl:h-[28rem] shadow-2xl border-4 border-zinc-700"
            src="/portfolio.webp"
            alt="Brandon Taylor"
          />
        </div>
      </div>
    </div>
  </rail-side>
</template>

<style scoped>
  .coffee-cursor {
    cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>☕</text></svg>") 16 0, auto;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeInLeft {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  /* played when page loads. */
  @keyframes shaka-in {
    0%, 100% {
      transform: rotate(0deg) scale(1);
    }
    25% {
      transform: rotate(-15deg) scale(1.1);
    }
    50% {
      transform: rotate(10deg) scale(1.05);
    }
    75% {
      transform: rotate(-5deg) scale(1.02);
    }
  }

  /* played on hover */
  @keyframes shaka {
    0%, 100% {
      transform: rotate(0deg) scale(1);
    }
    25% {
      transform: rotate(-15deg) scale(1.1);
    }
    50% {
      transform: rotate(10deg) scale(1.05);
    }
    75% {
      transform: rotate(-5deg) scale(1.02);
    }
  }

  .animate-fade-in {
    animation: fadeIn 0.25s ease-out forwards;
    opacity: 0;
  }

  .animate-fade-in-left {
    animation: fadeInLeft 0.25s ease-out forwards;
    opacity: 0;
  }

  .animate-shaka { animation: shaka-in 0.6s ease-in-out 0.8s both; }
  .animate-shaka:hover { animation: shaka 0.6s ease-in-out both; }

  .animation-delay-100 {
    animation-delay: 0.1s;
  }

  .animation-delay-200 {
    animation-delay: 0.2s;
  }

  .animation-delay-300 {
    animation-delay: 0.3s;
  }

  .animation-delay-400 {
    animation-delay: 0.4s;
  }

  .animation-delay-500 {
    animation-delay: 0.5s;
  }

  .animation-delay-1\.5s {
    animation-delay: 1.5s;
  }
</style>
