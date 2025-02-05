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
  <section
    class="h-dvh grid place-items-center lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-center items-center p-8 duration-200"
  >
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
            hello@dakotahtaylor.com
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
