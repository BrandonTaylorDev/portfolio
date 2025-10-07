<script setup lang="ts">
  const showResume = ref(true);
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
