<script setup lang="ts">
  type Props = {
    opacity?: number
    fadeType?: 'radial' | 'linear'
  }

  withDefaults(defineProps<Props>(), {
    opacity: 15,
    fadeType: 'radial'
  });
</script>

<template>
  <div class="absolute inset-0 pointer-events-none">
    <svg 
      class="w-full h-full hex-fade hex-soften" 
      :style="{ opacity: opacity / 100 }"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="hexagons" width="60" height="60" patternUnits="userSpaceOnUse">
          <polygon
            points="30,5 50,17.5 50,42.5 30,55 10,42.5 10,17.5"
            fill="none"
            stroke="#14b8a6"
            stroke-width="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hexagons)" />
    </svg>

    <!-- Optional vignette for edge darkening (only for radial fade) -->
    <div v-if="fadeType === 'radial'" class="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-zinc-900"></div>
  </div>
</template>

<style scoped>
  /* Radial fade for hexagon SVG toward the edges */
  .hex-fade {
    mask-image: radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%);
    -webkit-mask-image: radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%);
    mask-mode: alpha;
  }

  /* Linear fade variant (for future use) */
  .hex-fade[data-fade-type="linear"] {
    mask-image: linear-gradient(
      to bottom,
      rgba(0,0,0,0) 0%,
      rgba(0,0,0,0.15) 12%,
      rgba(0,0,0,0.5) 28%,
      rgba(0,0,0,1) 41%,
      rgba(0,0,0,1) 59%,
      rgba(0,0,0,0.5) 72%,
      rgba(0,0,0,0.15) 88%,
      rgba(0,0,0,0) 100%
    );
    -webkit-mask-image: linear-gradient(
      to bottom,
      rgba(0,0,0,0) 0%,
      rgba(0,0,0,0.15) 12%,
      rgba(0,0,0,0.5) 28%,
      rgba(0,0,0,1) 41%,
      rgba(0,0,0,1) 59%,
      rgba(0,0,0,0.5) 72%,
      rgba(0,0,0,0.15) 88%,
      rgba(0,0,0,0) 100%
    );
    mask-mode: alpha;
  }

  /* Slight soften so the lines don't dominate */
  .hex-soften { 
    filter: blur(0.3px); 
  }
</style>