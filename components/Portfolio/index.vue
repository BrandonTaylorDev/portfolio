<script setup lang="ts">
  type Props = {
    showResume?: boolean
  }
  withDefaults(defineProps<Props>(), { showResume: false });
  defineEmits([ 'updateShowResume' ]);
</script>

<template>
  <rail-side class="bg-zinc-900 text-zinc-100">
    <portfolio-hero
      :show-resume="showResume"
      @update-show-resume="(val: boolean) => $emit('updateShowResume', val)"
    />

    <portfolio-tagline />

    <portfolio-expertise />
  </rail-side>
</template>

