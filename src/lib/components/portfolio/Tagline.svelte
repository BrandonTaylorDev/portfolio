<script lang="ts">
</script>

<div class="relative mx-auto min-h-24 flex gap-4 justify-center items-center text-center transform-gpu will-change-transform animate-fade-in-bottom [animation-delay:600ms]">
  <div class="pointer-events-none absolute inset-0 flex justify-center opacity-5 top-1/2 -translate-y-16">
    <div class="w-32 h-32 border-4 border-teal-400 rounded-full rotate-45"></div>
  </div>

  <div class="shrink-0" aria-hidden="true">
    <svg class="w-10 h-10 text-teal-400 opacity-60" viewBox="0 0 24 24">
      <path fill="currentColor" d="M10,7L8,11H11V17H5V11L7,7H10M18,7L16,11H19V17H13V11L15,7H18Z" />
    </svg>
  </div>

  <div class="relative z-10 px-2 md:px-6">
    <span class="text-xl md:text-2xl font-light tracking-wide leading-relaxed">
      Fueled by
      <span class="coffee-cursor font-semibold text-teal-300 hover:text-teal-200 transition-colors duration-300"> Coffee</span>,
      Driven by Ambition
    </span>
  </div>

  <div class="shrink-0" aria-hidden="true">
    <svg class="w-10 h-10 text-teal-400 opacity-60" viewBox="0 0 24 24">
      <path fill="currentColor" d="M14,17H17L19,13V7H14V13L16,17M6,17H9L11,13V7H6V13L8,17Z" />
    </svg>
  </div>
</div>

<style>
  @keyframes fadeInBottom {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in-bottom {
    animation: fadeInBottom 0.50s ease-out both;
  }

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
