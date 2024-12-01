<template>
  <div class="relative tracking-tight flex flex-col gap-2 z-0 text-center max-w-xl mx-auto lg:max-w-full lg:mx-0">
    <div class="rounded-full h-80 w-80 mx-auto overflow-hidden border-4 lg:border-slate-500 dark:lg:border-teal-600">
      <image src="/portfolio.webp" class="brightness-150 dark:brightness-100 h-full w-full duration-500" />
    </div>
    
    <span class="text-4xl md:text-5xl font-bold tracking-tight text-slate-500 dark:text-slate-200 z-40 transition-all duration-500">
      &lt; Brandon Taylor /&gt;
    </span>

    <p class="text-xl">
      Cloud Architect / DevOps Engineer / Entrepreneur
    </p>

    <span class="italic text-lg">
      Fueled by <span class="coffee-cursor">coffee</span>, driven by ambititon.
    </span>
  </div>
</template>

<style scoped>
  .coffee-cursor {
    cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>☕</text></svg>") 16 0, auto;
  }
</style>
