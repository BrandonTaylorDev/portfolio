<script setup lang="ts">
  type Props = {
    showResume?: boolean
  }
  withDefaults(defineProps<Props>(), { showResume: false });
  defineEmits([ 'updateShowResume' ]);
</script>

<template>
  <div class="h-3/4 flex flex-col items-center justify-center px-6">

    <!-- Main hero content with portrait -->
    <div class="max-w-5xl mx-auto flex flex-row items-center justify-center">
      
      <!-- Hero text - center/left -->
      <div class="flex flex-col items-center lg:items-end text-center lg:text-right duration-500 ease-in-out max-w-2xl lg:max-w-full">
        <div class="text-left space-y-4 w-fit">

          <!-- Greeting & Name -->
          <div>
            <h2 class="animate-fade-in-left text-3xl xl:text-4xl font-light text-zinc-400 tracking-wide transition-[font-size]">
              Hi! <span class="animate-shaka animation-delay-1.5s inline-block">🤙</span>
            </h2>

            <h1 class="animate-fade-in-left animation-delay-100 text-6xl xl:text-7xl font-bold transition-[font-size]">
              I'm <span class="text-teal-500">Brandon</span> <span class="initial">Taylor</span>
            </h1>
          </div>

          <!-- Bio -->
          <div>
            <p class="animate-fade-in-left animation-delay-200 lg:text-lg font-light text-zinc-300 max-w-3xl mx-auto lg:mx-0 leading-relaxed transition-[font-size]">
              A passionate enterprise platform engineer specializing in building scalable solutions and services tailored for the modern world.
            </p>
          </div>

          <!-- CTA -->
          <div>
            <button 
              class="animate-fade-in-left animation-delay-300 inline-flex items-center gap-3 px-8 py-4 bg-teal-600 hover:bg-teal-500 text-zinc-100 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              @click="$emit('updateShowResume', !showResume);"
            >
              <icon name="mdi:document" size="1.75rem" />
              <span>View Resume</span>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Portrait - prominent on right -->
      <div class="hidden lg:inline-block w-96 flex justify-center items-center animate-fade-in animation-delay-500 duration-300 ease-in-out">
        <img
          class="rounded-full h-auto w-full shadow-2xl border-4 border-zinc-700 transition-[width,height]"
          src="/portfolio.webp"
          alt="Brandon Taylor"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

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

  .animate-shaka { animation: shaka-in 0.6s ease-in-out 0.8s both; }
  .animate-shaka:hover { animation: shaka 0.6s ease-in-out both; }
</style>
