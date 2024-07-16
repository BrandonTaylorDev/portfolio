<script setup lang="ts">
  const showKubernetes = ref(false)

  const hideAllModals = () => {
    showKubernetes.value = false
  }

  const showModal = (name: string) => {
    hideAllModals()

    switch(name.toLowerCase()) {
      case 'kubernetes':
        showKubernetes.value = true
        break
    }
  }
</script>

<template>
  <div class="page min-h-[50dvh] mx-auto">
    <div class="portfolio-wrap max-w-[120rem] flex flex-col lg:flex-row mx-auto">
      <div class="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-center items-center p-8">
        <portrait />
        <socials />
      </div>

      <main class="lg:flex-1">
        <div class="flex flex-col gap-y-24 my-24">
          <about
            @click:kubernetes="showModal('kubernetes')"
          />
          <experience />
          <lazy-contact />
        </div>
      </main>
    </div>

    <lazy-scroll-back />
    <lazy-v-footer />
    <div
      :class="[
        'fixed top-0 h-full w-full bg-gray-700 dark:bg-gray-900 pointer-events-none select-none duration-500',
        showKubernetes
          ? 'opacity-70'
          : 'opacity-0'
      ]">

    </div>
    <lazy-kubernetes v-model="showKubernetes" />
  </div>
</template>
