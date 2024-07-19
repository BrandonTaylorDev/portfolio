<script setup lang="ts">
  const value = ref('')
</script>

<template>
  <div class="p-4">
    <new-text-field v-model="value" rounded="lg">
      <template #prepend-icon>
        <icon name="mdi:email" size="2em" label="Label" />
      </template>
    </new-text-field>
    {{ value }}
  </div>
</template>
