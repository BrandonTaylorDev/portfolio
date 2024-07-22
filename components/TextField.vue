<script setup lang="ts">
type Props = {
  modelValue?: string;
  variant?: "filled" | "underlined";
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  shadow?: boolean;
  label?: string;
};

const props = withDefaults(defineProps<Props>(), {
  variant: "filled",
  rounded: "none",
  shadow: true,
});
const emits = defineEmits(["update:modelValue"]);
const slots = useSlots();
const value = ref("");

const hasSlot = (name: string) => !!slots[name];

watch(
  () => props.modelValue,
  () => (value.value = props.modelValue ?? ""),
  { immediate: true },
);
watch(
  () => value.value,
  () => emits("update:modelValue", value.value),
);
</script>

<template>
  <div
    :class="[
      'flex h-12',

      variant === 'filled' ? 'bg-white' : null,

      variant === 'underlined'
        ? 'bg-transparent border-b-2 border-slate-400 dark:border-slate-500'
        : null,

      rounded && variant !== 'underlined' && rounded !== 'full'
        ? `rounded-${rounded}`
        : null,

      shadow && variant !== 'underlined' ? 'shadow' : null,
    ]"
  >
    <div
      v-if="hasSlot('prepend-icon')"
      class="flex justify-center items-center px-2 bg-transparent"
    >
      <slot name="prepend-icon" />
    </div>

    <div class="relative flex-1 rounded-[inherit]">
      <input
        type="text"
        v-model="value"
        :class="[
          'w-full h-full block outline-none rounded-[inherit] bg-inherit',
          !hasSlot('prepend-icon') ? 'ps-4' : null,
          !hasSlot('append-icon') ? 'pe-4' : null,
          label || hasSlot('label')
            ? variant === 'underlined'
              ? 'pt-2'
              : 'pt-1'
            : null,
        ]"
      />
      <label
        v-if="label || hasSlot('label')"
        :class="[
          'tracking-wide w-full absolute top-1/2 -translate-y-1/2 flex items-center pointer-events-none select-none duration-300',
          value ? 'has-value' : null,
          !hasSlot('prepend-icon') ? 'ps-4' : null,
          !hasSlot('append-icon') ? 'pe-4' : null,
        ]"
      >
        <slot name="label" />
        <span v-if="!hasSlot('label')">
          {{ label }}
        </span>
      </label>
    </div>

    <div
      v-if="hasSlot('append-icon')"
      class="flex justify-center items-center px-2"
    >
      <slot name="append-icon" />
    </div>
  </div>
</template>

<style scoped>
input:focus + label,
.has-value {
  top: 0rem;
  font-size: 0.75rem;
  color: var(--tailwind-text-red-500);
  transform: translateY(0);
}
</style>
