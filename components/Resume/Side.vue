<script setup lang="ts">

  type Props = {
    showResume?: boolean
  }
  withDefaults(defineProps<Props>(), { showResume: false });
  defineEmits([ 'updateShowResume' ]);
</script>

<template>
  <rail-side class="relative bg-zinc-200 text-zinc-900">
    <resume-paper
      :show-resume="showResume"
      @update-show-resume="(val: boolean) => $emit('updateShowResume', val)"
    />
  </rail-side>
</template>
