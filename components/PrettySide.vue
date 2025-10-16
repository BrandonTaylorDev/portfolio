<script setup lang="ts">
  type Props = {
    showResume?: boolean
  }
  withDefaults(defineProps<Props>(), { showResume: false });

  const emit = defineEmits([ 'updateShowResume' ]);
</script>

<template>
  <rail-side class="bg-zinc-900 text-zinc-100">
    <header class="flex flex-row-reverse w-full max-w-7xl mx-auto">

      <!-- portrait -->
      <div class="flex-1">
        <div>
          <nuxt-img
            class="rounded-full"
            src="/portfolio.webp"
            alt="Me"
          />
        </div>
      </div>

      <!-- blurb -->
      <div class="flex-1 flex flex-col justify-center items-center gap-4">
        <div class="flex flex-col items-start">
          <span class="text-4xl md:text-[2.8rem] md:leading-[3.25rem] lg:text-[3.5rem] lg:leading-[3.75rem] xl:text-[4rem] xl:text-[4.25rem]">
            Hi, I'm <span class="text-teal-500">Brandon</span> Taylor
          </span>
        </div>

        <div>
          <span>
             Fueled by <span class="coffee-cursor">coffee</span>, driven by ambition. 
          </span>
        </div>

        <div class="">
          <button class="flex justify-center items-center px-4 py-2 rounded-full cursor-pointer text-zinc-50" @click="$emit('updateShowResume', !showResume)">
            <icon name="mdi:document" />
            
            <span>
              Resume
            </span>
          </button>
        </div>
      </div>
    </header>
  </rail-side>
</template>

<style scoped>
  .coffee-cursor {
    cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>☕</text></svg>") 16 0, auto;
  }
</style>
