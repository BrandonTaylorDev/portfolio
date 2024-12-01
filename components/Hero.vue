<script setup lang="ts">
  const { elementRef, isVisible } = useElementVisibility()
</script>

<template>
  <section ref="elementRef" :class="[ 'h-dvh grid place-items-center lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-center items-center p-8 duration-200', isVisible ? 'opacity-100' : 'opacity-0' ]">
    <div>
      <portrait />
      <socials />
    </div>
  </section>
</template>
