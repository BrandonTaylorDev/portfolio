<script setup lang="ts">
  useHead({
    title: 'Brandon Taylor | brandontaylor.dev',
    htmlAttrs: {
      class: 'bg-slate-100 dark:bg-slate-900 overflow-x-hidden',
      lang: 'en'
    },
    script: [
      { src: 'https://www.google.com/recaptcha/api.js', defer: true },
      !process.dev?
        { 'src': 'https://static.cloudflareinsights.com/beacon.min.js', 'data-cf-beacon': '{"token": "1b2831f35e1140dbb0adf5f5c8c5d7ce"}', defer: true } : {}
    ]
  })
</script>

<template>
  <v-app class="bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-400">
    <nuxt-loading-indicator />
    <nuxt-page />
  </v-app>
</template>
