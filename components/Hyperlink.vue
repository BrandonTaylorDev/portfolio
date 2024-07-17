<script setup lang="ts">
  type Props = {
    href?: string
  }
  const props = withDefaults(defineProps<Props>(), {
    
  })
</script>

<template>
  <component
    :is="props.href ? 'a' : 'span'"
    :href="props.href"
    :class="[
      'text-teal-600 hover:text-teal-400 dark:text-teal-400 hover:dark:text-teal-600 transition-colors duration-200 hover:underline cursor-pointer',
    ]"
  >
    <slot />
  </component>
</template>
