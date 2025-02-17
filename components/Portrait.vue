<script setup lang="ts">
  import { useTimeout, useTimeoutFn } from '@vueuse/core';

  const doSlidePortrait = ref(false);
  const doSlideName = ref(false);
  const doSlideTitle = ref(false);
  const doSlideTagline = ref(false);

  onMounted(() => {
    useTimeoutFn(() => {
      doSlidePortrait.value = true;
    }, 250);

    useTimeoutFn(() => {
      doSlideName.value = true;
    }, 750);

    useTimeoutFn(() => {
      doSlideTitle.value = true;
    }, 1250);

    useTimeoutFn(() => {
      doSlideTagline.value = true;
    }, 1750)
  })
</script>

<template>
  <div :class="[
    'portrait relative tracking-tight flex flex-col gap-2 z-0 text-center max-w-3xl mx-auto lg:max-w-full lg:mx-0'
  ]">
    <div :class="[
      'portrait rounded-full h-56 w-56 md:h-80 md:w-80 mx-auto overflow-hidden',
      doSlidePortrait
        ? 'translate-y-0 opacity-100'
        : 'translate-y-4 opacity-0'
    ]">
      <NuxtImg src="/portfolio.webp" class="brightness-100 h-full w-full duration-500" />
    </div>
    
    <div :class="[
      'name',
      doSlideName
          ? 'translate-y-0 opacity-100'
          : 'translate-y-4 opacity-0'
    ]">
      <span class="text-4xl md:text-5xl font-bold tracking-tight text-slate-200">
        &lt; Brandon Taylor /&gt;
      </span>
    </div>

    <div>
      <p :class="[
        'title text-xl',
        doSlideTitle
          ? 'translate-y-0 opacity-100'
          : 'translate-y-4 opacity-0'
      ]">
        Cloud Architect / DevOps Engineer / Entrepreneur
      </p>
    </div>

    <div :class="[
      'tagline',
      doSlideTagline
        ? 'translate-y-0 opacity-100'
        : 'translate-y-4 opacity-0'
    ]">
      <span class="italic text-lg">
        Fueled by <span class="coffee-cursor">coffee</span>, driven by ambition.
      </span>
    </div>
  </div>
</template>

<style scoped>
  .coffee-cursor {
    cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>☕</text></svg>") 16 0, auto;
  }

  .portrait, .name, .title, .tagline {
    transition: transform 500ms ease-out, opacity 500ms ease-out, width 200ms ease-in-out, height 200ms ease-in-out;
  }

  .name > span {
    transition: font-size 200ms ease-in-out;
  }
</style>
