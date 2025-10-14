<script setup lang="ts">
  import type { Theme } from '../types/Theme';

  type Props = {
    currentTheme?: Theme
  }
  const props = withDefaults(defineProps<Props>(), {
    currentTheme: 'light'
  });
  const emit = defineEmits([
    'switchTheme'
  ]);

  const switchTheme = () => {
    emit('switchTheme');
  }
</script>

<template>
  <button
    :class="[
      'absolute top-4 right-4 w-16 h-16 grid place-items-center rounded-full transform-gpu will-change-[background-color] transition-[background-color] duration-100',
      currentTheme === 'light'
        ? 'bg-zinc-50 hover:bg-zinc-300'
        : 'bg-zinc-500 hover:bg-zinc-300'
    ]"
    @click="switchTheme"
  >
    <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M22 12L23 12" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 2V1" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 23V22" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M20 20L19 19" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M20 4L19 5" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4 20L5 19" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4 4L5 5" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M1 12L2 12" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
  </button>
</template>
