<script setup lang="ts">
  const props = defineProps<{
    type?         : 'text' | 'password' | 'email'
    variant?      : 'filled' | 'underlined' | 'bordered'
    label?        : string
    boldLabel?    : '' | boolean
    modelValue?   : string | number
    prependIcon?  : string
    appendIcon?   : string
    rounded?      : 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full' | '' | boolean
    autocomplete? : string
    autofocus?    : boolean
    readonly?     : boolean
    noGutters?    : boolean
  }>()

  const emits = defineEmits([
    'update:modelValue',
    'click:prependIcon',
    'click:appendIcon'
  ])

  const inputId = useId()
  const inputField = ref<HTMLInputElement | null>(null)
  const value = ref(props.modelValue ?? '')
  const focused = ref(false)

  const roundedTailwindStyle = computed(() => {
    if(props.variant === 'underlined') return 'rounded-none'
    switch(props?.rounded) {
      case 'none':
      case false:
        return 'rounded-none'
      case 'sm':
        return 'rounded-sm'
      case 'md':
        return 'rounded-md'
      case 'lg':
        return 'rounded-lg'
      case 'xl':
        return 'rounded-xl'
      case 'full':
      case '':
      case true:
        return 'rounded-full'
      default:
        return 'rounded-none'
    }
  })

  const variantTailwindStyle = computed(() => {
    const filled      = 'bg-white shadow'
    const underlined  = 'border-b border-gray-700'
    const bordered    = 'bg-white border border-gray-300'
    if(props?.variant === 'filled') {
      return filled
    }

    if(props?.variant === 'underlined') {
      return underlined
    }

    if(props?.variant === 'bordered') {
      return bordered
    }

    return filled
  })

  const inputPositionStyle = computed(() => {
    let styles: string[] = []

    if(!props?.prependIcon && props?.variant !== 'underlined') {
      styles.push('ps-3')
    }

    if(!props?.appendIcon && props?.variant !== 'underlined') {
      styles.push('pe-3')
    }

    return styles
  })

  const labelStyle = computed(() => {
    let styles = [ 'absolute transition-all duration-200 pe-3 pointer-events-none' ]

    if(!value.value && !focused.value) {
      styles.push('top-1/2 -translate-y-1/2')
    } else {
      styles.push('top-0')
    }

    if(props?.prependIcon) {
      styles.push('ps-12')
    } else {
      if(props?.variant !== 'underlined') {
        styles.push('ps-3')
      }
    }

    if(props?.boldLabel || props.boldLabel === '') {
      styles.push('font-bold')
    }

    return styles
  })

  // update Vue with our new value.
  watch(value, () => emits('update:modelValue', value.value))

  // update our value with a new prop value on prop update.
  watch(() => props.modelValue, () => value.value = props.modelValue ?? '', { immediate: true })

  onMounted(() => props?.autofocus ? inputField.value?.focus() : false)
</script>

<template>

  <!-- wrapper control -->
  <div
    :class="[
      'relative flex overflow-hidden h-12',
      !noGutters ? 'my-4' : '',
      roundedTailwindStyle,
      variantTailwindStyle
    ]"
  >
    <!-- floating label -->
    <label
      v-if="label"
      :for="inputId"
      :class="labelStyle"
    >
      {{ label }}
    </label>

    <!-- prepend icon -->
    <span
      v-if="prependIcon"
      class="flex justify-center items-center cursor-pointer p-3"
      @click="$emit('click:prependIcon')"
    >
      <icon :name="prependIcon" size="1.5em"  />
    </span>

    <!-- input field -->
    <input
      :type="type ?? 'text'"
      :id="inputId"
      :class="[
        'bg-transparent grow outline-none pt-4',
        inputPositionStyle,
        'read-only:cursor-not-allowed'
      ]"
      v-model="value"
      ref="inputField"
      :autocomplete="autocomplete"
      @focusin="focused = true"
      @focusout="focused = false"
      :readonly="readonly"
    />

    <!-- append icon -->
    <span
      v-if="appendIcon"
      class="flex justify-center items-center cursor-pointer p-3"
      @click="$emit('click:appendIcon')"
    >
      <icon :name="appendIcon" class="1.5em" />
    </span>
  </div>
</template>
