<script setup lang="ts">
  const showResume = ref(false);
</script>

<template>
  <div>
    <rail :show-resume="showResume">
      <portfolio-side
        :show-resume="showResume"
        @update-show-resume="(val: boolean) => showResume = val"
      />

      <resume-side
        :show-resume="showResume"
        @update-show-resume="(val: boolean) => showResume = val"
      />
    </rail>
  </div>
</template>
