<script setup lang="ts">
  type Props = {
    modelValue?: boolean
  }
  const props = withDefaults(defineProps<Props>(), {
    modelValue: false
  })
  const emits = defineEmits([ 'update:modelValue' ])

  const close = () => {
    emits('update:modelValue', false)
  }
</script>

<template>
  <aside
    :class="[
      'fixed z-50 w-full h-full top-0 p-4 md:p-8 2xl:p-16 left-0 duration-500 ease-in-out',
      props.modelValue ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
    ]"
    @click.self="close"
  >
    <div class="w-full max-w-5xl mx-auto h-full bg-gray-50 dark:bg-gray-800 shadow rounded-xl">
      <div class="text-right p-2">
        <button @click="close">
          <icon name="mdi:close" size="2em" />
        </button>
      </div>

      <div class="p-4 md:p-8 flex flex-col justify-start gap-4">
        <div class="flex justify-center md:justify-start items-center gap-4">
          <nuxt-img src="/k8s.png" class="w-fit max-w-12" />
          <span class="text-4xl">
            Kubernetes
          </span>
        </div>

        <hr />
        
        <div class="flex flex-col gap-4">
          <p>
            Kubernetes is the most recent addition to my repitoire of expertise. Beginning in 2023, when
            LightChange Technologies picked up a DevOps-focused client, it fell to me to learn the technology,
            own it, and improve our clients infrastructure. Now, I have experienced a variety of implementations,
            techniques, and tools, ranging from Azure Kubernetes Services to K3s, Deployments to StatefulSets, and ConfigMaps
            to Azure Key Vault-integrated Secrets.
          </p>
        </div>
      </div>
    </div>
  </aside>
</template>
