<script setup lang="ts">

  type Props = {
    showResume?: boolean
  }
  const props = withDefaults(defineProps<Props>(), {
    showResume: false
  });

  let translateClass: ComputedRef<string> = computed(() => 
    props.showResume === false
      ? 'translate-x-0'
      : '-translate-x-1/2'
  );
</script>

<template>
  <div :class="[
    'w-[200vw] h-screen max-h-screen overflow-hidden flex flex-row transition-transform duration-700 ease-in-out',
    translateClass
  ]">
    <slot />
  </div>
</template>
