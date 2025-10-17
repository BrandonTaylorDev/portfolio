<script setup lang="ts">
  const showResume = ref(false);
</script>

<template>
  <div>
    <rail :show-resume="showResume">
      <portfolio
        :show-resume="showResume"
        @update-show-resume="(val: boolean) => showResume = val"
      />

      <resume
        :show-resume="showResume"
        @update-show-resume="(val: boolean) => showResume = val"
      />
    </rail>
  </div>
</template>

<style>  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeInLeft {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .animate-fade-in {
    animation: fadeIn 0.25s ease-out forwards;
    opacity: 0;
  }

  .animate-fade-in-left {
    animation: fadeInLeft 0.25s ease-out forwards;
    opacity: 0;
  }

  .animation-delay-100 {
    animation-delay: 0.1s;
  }

  .animation-delay-200 {
    animation-delay: 0.2s;
  }

  .animation-delay-300 {
    animation-delay: 0.3s;
  }

  .animation-delay-400 {
    animation-delay: 0.4s;
  }

  .animation-delay-500 {
    animation-delay: 0.5s;
  }

  .animation-delay-1\.5s {
    animation-delay: 1.5s;
  }
</style>
