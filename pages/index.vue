<script setup lang="ts">
  const showResume = ref(false);
  provide('showResume', showResume);
</script>

<template>
  <div>
    <rail>
      <pretty-side />
      <resume-side />
    </rail>

    <rail-control
      @click="showResume = !showResume"
    />
  </div>
</template>
