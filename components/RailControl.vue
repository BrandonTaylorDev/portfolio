<script setup lang="ts">
import { inject, ref, type Ref } from 'vue'

const showResume = inject<Ref<boolean>>('showResume', ref(false))
const emit = defineEmits(['click'])
</script>

<template>
  <div
    :class="[
      'absolute right-0 top-1/2 -translate-y-1/2 h-screen w-4',
      // animate transform + bg color (+ shadow if you like)
      'transition-[transform,background-color,box-shadow] duration-700 ease-in-out',
      showResume
        ? '-translate-x-[calc(100vw-1rem)] bg-zinc-300 shadow-2xl'
        : 'translate-x-0 bg-zinc-700 shadow-none'
    ]"
  >
    <div
      :class="[
        'absolute top-1/2 -translate-y-1/2 w-8 h-16 overflow-hidden right-4',
        // animate radius, slide, bg color
        'transition-[border-radius,transform,background-color] duration-700 ease-in-out',
        showResume
          ? 'rounded-r-full translate-x-[calc(100%+1rem)] bg-zinc-300'
          : 'rounded-l-full translate-x-0 bg-zinc-700'
      ]"
    >
      <button
        class="flex items-center h-full w-full text-2xl"
        @click="$emit('click')"
      >
        <span
          :style="{ '--g': showResume ? 0 : 1 }"
          class="basis-0 [flex-grow:var(--g)] transition-[flex-grow] duration-700 ease-in-out"
        />

        <div
          :class="[
            'shrink-0 transition-[transform,color] duration-700 ease-in-out',
            showResume ? 'rotate-180' : ''
          ]"
        >
          <svg
            width="24" height="24" viewBox="0 0 24 24" fill="none"
            class="text-black"
          >
            <path
              d="M15 6L9 12L15 18"
              stroke="currentColor" stroke-width="1.5"
              stroke-linecap="round" stroke-linejoin="round"
            />
          </svg>
        </div>
      </button>
    </div>
  </div>
</template>
