<template>
  <div class="text-center h-48 flex justify-center items-center">
    <div class="-translate-y-4">
      <icon name="mdi:format-quote-open" size="3rem" />
    </div>

    <div>
      <span class="text-xl">
        Fueled by <span class="coffee-cursor">Coffee</span>, Driven by Ambition. 
      </span>
    </div>

    <div class="translate-y-4">
      <icon name="mdi:format-quote-close" size="3rem" />
    </div>
  </div>
</template>

<style lang="css" scoped>
  .coffee-cursor {
    cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>☕</text></svg>") 16 0, auto;
  }
</style>
