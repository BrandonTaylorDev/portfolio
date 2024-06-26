<script setup lang="ts">
  useHeadSafe({
    title: 'Brandon Taylor | brandontaylor.dev',
    htmlAttrs: {
      class: 'bg-slate-100 dark:bg-slate-900 overflow-x-hidden'
    }
  })
</script>

<template>
  <v-app class="bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-400">
    <NuxtLoadingIndicator />
    <nuxt-page />
  </v-app>
</template>
