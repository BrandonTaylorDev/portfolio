<script setup lang="ts">
  useHead({
    title: 'Brandon Taylor | brandontaylor.dev',
    bodyAttrs: {
      class: 'bg-zinc-900 text-zinc-100'
    }
  })
</script>

<template>
  <div class="min-h-screen min-w-screen h-0 p-0 overflow-x-hidden">
    <NuxtLoadingIndicator />
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>
