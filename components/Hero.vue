<script setup lang="ts">
  import { useTimeoutFn } from '@vueuse/core';

  const doSlide = ref(false);

  onMounted(() => {

    // 2750ms after portrait and social transitions.
    useTimeoutFn(() => {
      doSlide.value = true;
    }, 2750);
  })
</script>

<template>
  <section class="hero h-dvh grid place-items-center xl:sticky xl:top-0 xl:flex xl:max-h-screen xl:w-1/2 xl:flex-col xl:justify-center items-center p-8 duration-200">
    <div>
      <portrait />
      <socials />
      
      <div :class="[
        'button-wrapper mt-2',
        doSlide
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4'
      ]">
        <button class="w-min mx-auto flex justify-center items-center border-2 border-teal-600 hover:bg-teal-600/50 p-2 duration-200 ease-out">
          <div class="mr-2 pr-2 border-r-2 border-teal-600">
            <icon name="mdi:email-outline" size="2em" />
          </div>

          <div class="flex-1">
            hello@brandontaylor.dev
          </div>
        </button>
      </div>
    </div>
  </section>
</template>

<style lang="css" scoped>
  .button-wrapper {
    transition: transform 500ms ease-out, opacity 500ms ease-out;
  }
</style>
