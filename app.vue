<script setup lang="ts">
  useSeoMeta({
    title: 'Brandon Taylor | brandontaylor.dev',
    description: 'Brandon Taylor - Platform Engineer - I build resilient infrastructure, scalable platforms, and secure systems.',
    ogTitle: 'Brandon Taylor | brandontaylor.dev',
    ogDescription: 'Brandon Taylor - Platform Engineer - I build resilient infrastructure, scalable platforms, and secure systems.',
    ogImage: '/portfolio.webp',
    ogUrl: 'https://www.brandontaylor.dev'
  })
</script>

<template>
  <div class="min-h-screen min-w-screen h-0 p-0 overflow-x-hidden">
    <NuxtLoadingIndicator />
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>
