<template>
  <div
    class="relative max-w-[40rem] mx-auto h-48
           flex items-center justify-center gap-4 px-6
           text-center transform-gpu will-change-transform
           animate-fade-in-bottom [animation-delay:600ms]"
  >
    <!-- Background decoration -->
    <div class="pointer-events-none absolute inset-0 flex items-center justify-center opacity-5">
      <div class="w-32 h-32 border-4 border-teal-400 rounded-full rotate-45"></div>
    </div>

    <!-- Left quote -->
    <div class="shrink-0" aria-hidden="true">
      <icon name="mdi:format-quote-open" size="2.5rem" class="text-teal-400 opacity-60" />
    </div>

    <!-- Tagline -->
    <div class="relative z-10 px-2 md:px-6">
      <span class="text-xl md:text-2xl font-light tracking-wide leading-relaxed">
        <span class="text-teal-400">Fueled by</span>
        <span class="coffee-cursor font-semibold text-teal-300 hover:text-teal-200 transition-colors duration-300"> Coffee</span>,
        <span class="text-teal-400">Driven by</span> Ambition
      </span>
    </div>

    <!-- Right quote -->
    <div class="shrink-0" aria-hidden="true">
      <icon name="mdi:format-quote-close" size="2.5rem" class="text-teal-400 opacity-60" />
    </div>
  </div>
</template>

<style scoped>
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
