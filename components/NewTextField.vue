<script setup lang="ts">
  type Props = {
    modelValue?: string
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
    shadow?: boolean
    label?: string
  }
  
  const props = withDefaults(defineProps<Props>(), {
    rounded: 'none',
    shadow: true
  })
  const emits = defineEmits([ 'update:modelValue' ])
  const slots = useSlots()
  const value = ref('')

  const hasSlot = (name: string) => !!slots[name]

  watch(() => props.modelValue, () => value.value = props.modelValue ?? '', { immediate: true })
  watch(() => value.value, () => emits('update:modelValue', value.value))
</script>

<template>
  <div
    :class="[
      'flex h-16 bg-white',
      rounded
        ? `rounded-${rounded}`
        : null,
      shadow
        ? 'shadow'
        : null
    ]">
    <div v-if="hasSlot('prepend-icon')" class="flex justify-center items-center px-2 bg-transparent">
      <slot name="prepend-icon" />
    </div>

    <div class="relative flex-1 rounded-[inherit]">
      <input
        type="text"
        v-model="value"
        :class="[
          'w-full h-full block outline-none rounded-[inherit] bg-inherit',
          !hasSlot('prepend-icon')
            ? 'ps-4'
            : null,
          !hasSlot('append-icon')
            ? 'pe-4'
            : null,
          label || hasSlot('label')
            ? 'pt-2'
            : null
        ]"
      />
      <label
        v-if="label || hasSlot('label')"
        :class="[
          'tracking-wide leading-7 h-min w-full absolute top-4 flex items-center pointer-events-none select-none duration-300',
          value
            ? 'has-value'
            : null,
          !hasSlot('prepend-icon')
            ? 'ps-4'
            : null,
          !hasSlot('append-icon')
            ? 'pe-4'
            : null
        ]"
      >
        <slot name="label" />
        <span v-if="!hasSlot('label')">
          {{ label }}
        </span>
      </label>
    </div>

    <div v-if="hasSlot('append-icon')" class="flex justify-center items-center px-2">
      <slot name="append-icon" />
    </div>
  </div>
</template>

<style scoped>
  input:focus + label, .has-value {
    top: 0rem;
    font-size: 0.875rem;
    color: var(--tailwind-text-red-500);
  }
</style>
