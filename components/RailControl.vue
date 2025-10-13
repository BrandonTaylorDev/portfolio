<script setup lang="ts">
  import { inject, ref, watch, onBeforeUnmount, type Ref } from 'vue'

  const showResume = inject<Ref<boolean>>('showResume', ref(false));
  const canDoTween = ref(false);
  const emit = defineEmits(['click']);

  let timer: ReturnType<typeof setTimeout> | null = null;

  watch(showResume, () => {
    // restart the 500ms window on every change
    if (timer) clearTimeout(timer)
    canDoTween.value = true
    timer = setTimeout(() => {
      canDoTween.value = false
      timer = null
    }, 700);
  });

  onBeforeUnmount(() => {
    if (timer) clearTimeout(timer);
  });
</script>

<template>
  <div
    :class="[
      'absolute right-0 top-1/2 -translate-y-1/2 h-screen w-4',
      canDoTween
        ? 'transform-gpu will-change-transform transition-[transform,background-color,box-shadow] duration-700 ease-in-out'
        : 'transition-none',
      showResume
        ? '-translate-x-[calc(100vw-1rem)] bg-zinc-50 shadow-2xl'
        : 'translate-x-0 bg-zinc-700 shadow-none'
    ]"
  >
    <!-- NON-ANIMATING WRAPPER: handles vertical centering only -->
    <div class="absolute right-4 top-1/2 -translate-y-1/2">

      <!-- INNER: animates X, radius, and bg -->
      <div
        :class="[
          'w-8 h-16 overflow-hidden',
          canDoTween
            ? 'transform-gpu will-change-[transform,background-color] transition-[border-radius,transform,background-color] duration-700 ease-in-out'
            : 'transition-none',
          showResume
            ? 'rounded-r-full translate-x-[calc(100%+1rem)] bg-zinc-300'
            : 'rounded-l-full translate-x-0 bg-zinc-700'
        ]"
      >
        <button
          :class="[
            'flex items-center h-full w-full text-2xl transform-gpu will-change-[transform,background-color] transition-[border-radius,transform,background-color] duration-700 ease-in-out',
            showResume
              ? 'bg-zinc-50'
              : 'bg-zinc-700'
          ]"
          @click="$emit('click')"
        >
          <!-- Spacer grows 0 -> 1 (order preserved) -->
          <span
            :style="{ '--g': showResume ? 0 : 1 }"
            :class="[
              'basis-0 [flex-grow:var(--g)]',
              canDoTween
                ? 'transition-[flex-grow] duration-700 ease-in-out'
                : 'transition-none'
            ]"
          />

          <div
            :class="[
              'shrink-0',
              canDoTween
                ? 'transform-gpu transition-[transform,color] duration-700 ease-in-out'
                : 'transition-none',
              showResume ? 'rotate-180 text-zinc-900' : 'text-zinc-100'
            ]"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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
  </div>
</template>
