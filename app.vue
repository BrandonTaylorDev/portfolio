<script setup lang="ts">
  useHead({
    title: 'Brandon Taylor | brandontaylor.dev',
    bodyAttrs: {
      class: 'bg-slate-900 text-slate-100'
    }
  })
</script>

<template>
  <div class="page min-h-[50dvh] mx-auto">
    <div class="portfolio-wrap max-w-dvw flex flex-col lg:flex-row mx-auto">
      <hero />

      <main class="lg:flex-1">
        <div class="flex flex-col gap-y-24 my-24">
          <about />
          <experience />
        </div>
      </main>
    </div>

    <lazy-scroll-back />
    <lazy-v-footer />
  </div>
</template>
