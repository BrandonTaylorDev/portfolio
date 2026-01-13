<script lang="ts">
  let { opacity = 15, fadeType = 'radial', color = '#14b8a6' } = $props();
</script>

<div class="absolute inset-0 pointer-events-none">
  <svg 
    class="w-full h-full circuit-fade circuit-soften" 
    style="opacity: {opacity / 100}"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern id="circuit-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
        <line x1="0" y1="20" x2="30" y2="20" stroke={color} stroke-width="1" />
        <line x1="50" y1="20" x2="80" y2="20" stroke={color} stroke-width="1" />
        <line x1="0" y1="60" x2="25" y2="60" stroke={color} stroke-width="1" />
        <line x1="55" y1="60" x2="80" y2="60" stroke={color} stroke-width="1" />
        <line x1="20" y1="0" x2="20" y2="35" stroke={color} stroke-width="1" />
        <line x1="20" y1="45" x2="20" y2="80" stroke={color} stroke-width="1" />
        <line x1="60" y1="0" x2="60" y2="25" stroke={color} stroke-width="1" />
        <line x1="60" y1="35" x2="60" y2="80" stroke={color} stroke-width="1" />
        <circle cx="20" cy="20" r="2" fill={color} />
        <circle cx="60" cy="20" r="2" fill={color} />
        <circle cx="20" cy="60" r="2" fill={color} />
        <circle cx="60" cy="60" r="2" fill={color} />
        <rect x="30" y="18" width="20" height="4" fill="none" stroke={color} stroke-width="1" />
        <rect x="25" y="58" width="30" height="4" fill="none" stroke={color} stroke-width="1" />
        <rect x="18" y="35" width="4" height="10" fill="none" stroke={color} stroke-width="1" />
        <rect x="58" y="25" width="4" height="10" fill="none" stroke={color} stroke-width="1" />
      </pattern>
      
      <pattern id="circuit-pattern-2" width="120" height="120" patternUnits="userSpaceOnUse">
        <line x1="0" y1="40" x2="40" y2="40" stroke={color} stroke-width="0.5" opacity="0.7" />
        <line x1="40" y1="40" x2="80" y2="80" stroke={color} stroke-width="0.5" opacity="0.7" />
        <line x1="80" y1="40" x2="120" y2="40" stroke={color} stroke-width="0.5" opacity="0.7" />
        <line x1="40" y1="0" x2="40" y2="40" stroke={color} stroke-width="0.5" opacity="0.7" />
        <line x1="80" y1="40" x2="80" y2="80" stroke={color} stroke-width="0.5" opacity="0.7" />
        <line x1="80" y1="80" x2="120" y2="80" stroke={color} stroke-width="0.5" opacity="0.7" />
        <rect x="35" y="35" width="10" height="10" fill="none" stroke={color} stroke-width="1" />
        <rect x="75" y="75" width="10" height="10" fill="none" stroke={color} stroke-width="1" />
        <circle cx="40" cy="40" r="1.5" fill={color} />
        <circle cx="80" cy="40" r="1.5" fill={color} />
        <circle cx="80" cy="80" r="1.5" fill={color} />
      </pattern>
    </defs>
    
    <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
    <rect width="100%" height="100%" fill="url(#circuit-pattern-2)" />
  </svg>

  {#if fadeType === 'radial'}
    <div class="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-zinc-900"></div>
  {/if}
</div>

<style>
  .circuit-fade {
    mask-image: radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%);
    -webkit-mask-image: radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%);
    mask-mode: alpha;
  }

  .circuit-soften { 
    filter: blur(0.3px); 
  }
</style>
