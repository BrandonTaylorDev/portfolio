<script setup lang="ts">
  const headers = [
    'Hello',
    'I\'m Brandon Taylor',
    'This is my portfolio.'
  ]

  onMounted(() => {
  })
</script>

<template>
  <div class="page min-h-[50dvh] mx-auto">
    <div class="portfolio-wrap max-w-[120rem] flex flex-col lg:flex-row mx-auto">
      <div class="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-center items-center p-8">
        <div class="relative tracking-tight flex flex-col gap-2 z-0 text-center">
          <div>
            <image src="/portfolio.webp" class="max-h-96 mx-auto rounded-2xl" />
          </div>
          
          <span class="text-[2.75rem] font-bold tracking-tight text-slate-500 dark:text-slate-200 z-40">
            &lpar; Brandon Taylor &rpar;
          </span>

          <p class="text-xl">
            Cloud Architect / DevOps Engineer / Entrepreneur
          </p>

          <span class="italic text-lg">
            Fueled by <span class="coffee-cursor">coffee</span>, driven by ambititon.
          </span>
        </div>

        <socials />
      </div>

      <main class="lg:flex-1">
        <div class="flex flex-col gap-y-24 my-24">
          <about />
          <experience />
          <contact />
        </div>
      </main>
    </div>

    <v-footer />
    <scroll-back />
  </div>
</template>

<style scoped>
  .coffee-cursor {
    cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>☕</text></svg>") 16 0, auto;
  }
</style>

