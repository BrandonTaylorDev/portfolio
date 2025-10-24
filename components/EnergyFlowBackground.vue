<script setup lang="ts">
  type Props = {
    opacity?: number
    fadeType?: 'radial' | 'linear'
    primaryColor?: string
    secondaryColor?: string
  }

  withDefaults(defineProps<Props>(), {
    opacity: 20,
    fadeType: 'radial',
    primaryColor: '#14b8a6',
    secondaryColor: '#0891b2'
  });
</script>

<template>
  <div class="absolute inset-0 pointer-events-none">
    <svg 
      class="w-full h-full energy-fade energy-blend" 
      :style="{ opacity: opacity / 100 }"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <!-- Gradient definitions for energy flow -->
        <linearGradient id="energy-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" :stop-color="primaryColor" stop-opacity="0.3" />
          <stop offset="50%" :stop-color="secondaryColor" stop-opacity="0.6" />
          <stop offset="100%" :stop-color="primaryColor" stop-opacity="0.2" />
        </linearGradient>
        
        <linearGradient id="energy-gradient-2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" :stop-color="secondaryColor" stop-opacity="0.4" />
          <stop offset="50%" :stop-color="primaryColor" stop-opacity="0.7" />
          <stop offset="100%" :stop-color="secondaryColor" stop-opacity="0.3" />
        </linearGradient>
        
        <radialGradient id="energy-pulse" cx="50%" cy="50%" r="50%">
          <stop offset="0%" :stop-color="primaryColor" stop-opacity="0.8" />
          <stop offset="70%" :stop-color="secondaryColor" stop-opacity="0.4" />
          <stop offset="100%" :stop-color="primaryColor" stop-opacity="0.1" />
        </radialGradient>

        <!-- Flow patterns -->
        <pattern id="energy-flow-1" width="200" height="200" patternUnits="userSpaceOnUse">
          <!-- Flowing curves representing data pipelines -->
          <path d="M 0,50 Q 50,30 100,50 T 200,50" 
                fill="none" 
                :stroke="primaryColor" 
                stroke-width="2" 
                opacity="0.4"/>
          <path d="M 0,100 Q 50,120 100,100 T 200,100" 
                fill="none" 
                :stroke="secondaryColor" 
                stroke-width="1.5" 
                opacity="0.3"/>
          <path d="M 0,150 Q 50,130 100,150 T 200,150" 
                fill="none" 
                :stroke="primaryColor" 
                stroke-width="1" 
                opacity="0.5"/>
          
          <!-- Energy nodes (connection points) -->
          <circle cx="50" cy="50" r="3" :fill="primaryColor" opacity="0.6"/>
          <circle cx="100" cy="50" r="2" :fill="secondaryColor" opacity="0.5"/>
          <circle cx="150" cy="50" r="3" :fill="primaryColor" opacity="0.6"/>
          
          <circle cx="50" cy="100" r="2" :fill="secondaryColor" opacity="0.4"/>
          <circle cx="100" cy="100" r="4" :fill="primaryColor" opacity="0.7"/>
          <circle cx="150" cy="100" r="2" :fill="secondaryColor" opacity="0.4"/>
          
          <circle cx="50" cy="150" r="3" :fill="primaryColor" opacity="0.5"/>
          <circle cx="100" cy="150" r="2" :fill="secondaryColor" opacity="0.6"/>
          <circle cx="150" cy="150" r="3" :fill="primaryColor" opacity="0.5"/>
        </pattern>
        
        <!-- Secondary flow pattern for complexity -->
        <pattern id="energy-flow-2" width="150" height="150" patternUnits="userSpaceOnUse">
          <!-- Diagonal energy streams -->
          <path d="M 0,0 L 75,75" 
                :stroke="primaryColor" 
                stroke-width="1" 
                opacity="0.3"/>
          <path d="M 75,0 L 150,75" 
                :stroke="secondaryColor" 
                stroke-width="1" 
                opacity="0.3"/>
          <path d="M 0,75 L 75,150" 
                :stroke="secondaryColor" 
                stroke-width="1" 
                opacity="0.3"/>
          <path d="M 75,75 L 150,150" 
                :stroke="primaryColor" 
                stroke-width="1" 
                opacity="0.3"/>
          
          <!-- Small energy bursts -->
          <circle cx="37.5" cy="37.5" r="1.5" :fill="primaryColor" opacity="0.5"/>
          <circle cx="112.5" cy="37.5" r="1.5" :fill="secondaryColor" opacity="0.5"/>
          <circle cx="37.5" cy="112.5" r="1.5" :fill="secondaryColor" opacity="0.5"/>
          <circle cx="112.5" cy="112.5" r="1.5" :fill="primaryColor" opacity="0.5"/>
        </pattern>

        <!-- Animated gradient overlay -->
        <filter id="energy-blur">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2"/>
        </filter>
      </defs>
      
      <!-- Base flow patterns -->
      <rect width="100%" height="100%" fill="url(#energy-flow-1)" />
      <rect width="100%" height="100%" fill="url(#energy-flow-2)" />
      
      <!-- Gradient overlays for depth -->
      <rect width="100%" height="100%" fill="url(#energy-gradient-1)" opacity="0.3" />
      <rect width="100%" height="100%" fill="url(#energy-gradient-2)" opacity="0.2" />
      
      <!-- Energy pulse centers -->
      <circle cx="25%" cy="25%" r="80" fill="url(#energy-pulse)" opacity="0.4" filter="url(#energy-blur)" />
      <circle cx="75%" cy="75%" r="100" fill="url(#energy-pulse)" opacity="0.3" filter="url(#energy-blur)" />
      <circle cx="50%" cy="50%" r="120" fill="url(#energy-pulse)" opacity="0.2" filter="url(#energy-blur)" />
    </svg>

    <!-- Optional vignette for edge darkening (only for radial fade) -->
    <div v-if="fadeType === 'radial'" class="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-zinc-900"></div>
  </div>
</template>

<style scoped>
  /* Radial fade for energy flow SVG toward the edges */
  .energy-fade {
    mask-image: radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 75%);
    -webkit-mask-image: radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 75%);
    mask-mode: alpha;
  }

  /* Linear fade variant */
  .energy-fade[data-fade-type="linear"] {
    mask-image: linear-gradient(
      to bottom,
      rgba(0,0,0,0) 0%,
      rgba(0,0,0,0.2) 15%,
      rgba(0,0,0,0.6) 30%,
      rgba(0,0,0,1) 45%,
      rgba(0,0,0,1) 55%,
      rgba(0,0,0,0.6) 70%,
      rgba(0,0,0,0.2) 85%,
      rgba(0,0,0,0) 100%
    );
    -webkit-mask-image: linear-gradient(
      to bottom,
      rgba(0,0,0,0) 0%,
      rgba(0,0,0,0.2) 15%,
      rgba(0,0,0,0.6) 30%,
      rgba(0,0,0,1) 45%,
      rgba(0,0,0,1) 55%,
      rgba(0,0,0,0.6) 70%,
      rgba(0,0,0,0.2) 85%,
      rgba(0,0,0,0) 100%
    );
    mask-mode: alpha;
  }

  /* Blend mode for interesting color interactions */
  .energy-blend {
    mix-blend-mode: screen;
  }

  /* Subtle animation for living energy feel */
  @keyframes energy-pulse {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.6; }
  }

  .energy-blend {
    animation: energy-pulse 8s ease-in-out infinite;
  }
</style>