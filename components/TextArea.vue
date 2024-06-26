<script setup lang="ts">
  const props = defineProps<{
    variant?      : 'filled' | 'underlined' | 'bordered'
    label?        : string
    modelValue?   : string
    prependIcon?  : string
    appendIcon?   : string
    rounded?      : 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full' | '' | boolean
    noGutters?    : boolean
    noResize?     : boolean
  }>()

  const emits = defineEmits([
    'update:modelValue',
    'click:prependIcon',
    'click:appendIcon'
  ])

  const textAreaId = useId()
  const value = ref('')
  const focused = ref(false)

  const roundedTailwindStyle = computed(() => {
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
    let styles: string[] = ['pt-6']

    if(!props?.prependIcon && props?.variant !== 'underlined') {
      styles.push('ps-3')
    } else if(props?.prependIcon) {
      styles.push('ps-12')
    }

    if(!props?.appendIcon && props?.variant !== 'underlined') {
      styles.push('pe-3')
    } else if(props?.appendIcon) {
      styles.push('pe-14')
    }

    return styles
  })

  const labelStyle = computed(() => {
    let styles = [ 'absolute transition-all duration-200 pe-3 pointer-events-none bg-white w-full' ]

    if(!value.value && !focused.value) {
      styles.push('top-4')
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

    return styles
  })

  // update Vue with our new value.
  watch(value, () => emits('update:modelValue', value.value))

  // update our value with a new prop value on prop update.
  watch(() => props.modelValue, () => value.value = props.modelValue ?? '', { immediate: true })
</script>

<template>

  <!-- wrapper control -->
  <div
    :class="[
      'relative flex overflow-auto bg-gray-50 h-[8rem] min-w-[12rem] min-h-[6rem]',
      !noGutters ? 'my-4' : '',
      noResize ? 'resize-none' : '',
      roundedTailwindStyle,
      variantTailwindStyle
    ]"
  >

    <!-- floating label -->
    <label
      v-if="label"
      :for="textAreaId"
      :class="labelStyle"
    >
      {{ label }}
    </label>

    <!-- prepend icon -->
    <span
      v-if="prependIcon"
      class="flex justify-center items-start absolute top-4 left-4"
      @click="$emit('click:prependIcon')"
    >
      <icon :name="prependIcon" size="1.5em" class="" />
    </span>

    <!-- textarea field -->
    <textarea
      :id="textAreaId"
      :class="[
        'bg-transparent grow outline-none pt-5 ',
        inputPositionStyle,
        noResize ? 'resize-none' : '',
      ]"
      v-model="value"
      @focusin="focused = true"
      @focusout="focused = false"
    />

    <!-- append icon -->
    <span
      v-if="appendIcon"
      class="flex justify-center items-start absolute top-4 right-4"
      @click="$emit('click:appendIcon')"
    >
      <icon :name="appendIcon" size="1.5em" class="" />
    </span>
  </div>
</template>
