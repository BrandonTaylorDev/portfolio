<script setup lang="ts">
  const showResume = inject<Ref<boolean>>('showResume', ref(false));

  let translateClass: ComputedRef<string> = computed(() => 
    showResume?.value === false
      ? 'translate-x-0'
      : '-translate-x-1/2'
  );
</script>

<template>
  <div :class="[
    'w-[200vw] min-h-screen flex flex-row transition-transform duration-700 ease-in-out',
    translateClass
  ]">
    <slot />
  </div>
</template>
