<script setup lang="ts">
  import { useTimeoutFn } from '@vueuse/core';

  const doSlide = ref(false);

  onMounted(() => {

    // 2250ms after hero transitions.
    useTimeoutFn(() => {
      doSlide.value = true;
    }, 2250);
  })
</script>

<template>
  <section :class="[
    'socials-wrapper mt-2 relative',
    doSlide
      ? 'opacity-100 translate-y-0'
      : 'opacity-0 translate-y-4'
  ]">
    <ul class="flex justify-center items-center gap-4">
      <li class="text-slate-700 hover:text-slate-500 dark:text-slate-400 dark:hover:text-teal-500 transition-colors duration-200">
        <a href="https://www.linkedin.com/in/brandondtaylor01/">
          <icon name="mdi:linkedin" size="2em" />
        </a>
      </li>

      <li class="text-slate-700 hover:text-slate-500 dark:text-slate-400 dark:hover:text-teal-500 transition-colors duration-200">
        <a href="https://github.com/brandontaylordev">
          <icon name="mdi:github" size="2em" />
        </a>
      </li>
    </ul>
  </section>
</template>

<style lang="css" scoped>
  .socials-wrapper {
    transition: transform 500ms ease-out, opacity 500ms ease-out;
  }
</style>
