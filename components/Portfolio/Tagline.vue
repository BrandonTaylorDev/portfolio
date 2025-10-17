<template>
  <div class="relative max-w-[32rem] mx-auto text-center h-48 flex justify-center items-center transform transform-gpu will-change-[transform] animate-fade-in-bottom animation-delay-600">
    <!-- Background decoration -->
    <div class="absolute inset-0 flex items-center justify-center opacity-5">
      <div class="w-32 h-32 border-4 border-teal-400 rounded-full transform rotate-45"></div>
    </div>
    
    <!-- Quote marks with gradient -->
    <div class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4">
      <icon name="mdi:format-quote-open" size="2.5rem" class="text-teal-400 opacity-60" />
    </div>

    <!-- Main tagline with enhanced styling -->
    <div class="relative z-10 px-8">
      <span class="text-xl md:text-2xl font-light tracking-wide leading-relaxed">
        <span class="text-teal-400">Fueled by</span> 
        <span class="coffee-cursor font-semibold text-teal-300 hover:text-teal-200 transition-colors duration-300"> Coffee</span>, 
        <span class="text-teal-400">Driven by</span> Ambition
      </span>
    </div>

    <div class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4">
      <icon name="mdi:format-quote-close" size="2.5rem" class="text-teal-400 opacity-60" />
    </div>
  </div>
</template>

<style lang="css" scoped>
  .coffee-cursor {
    cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>☕</text></svg>") 16 0, auto;
    position: relative;
  }

  .coffee-cursor::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #14b8a6, transparent);
    transform: scaleX(0);
    transform-origin: center;
    transition: transform 0.3s ease;
  }

  .coffee-cursor:hover::after {
    transform: scaleX(1);
  }
</style>
