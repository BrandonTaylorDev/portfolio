<script setup lang="ts">
  const showKubernetes = ref(false)
  const showMongoDB = ref(false)

  const hideAllModals = () => {
    showKubernetes.value = false
    showMongoDB.value = false
  }

  const showModal = (name: 'kubernetes' | 'mongodb') => {
    hideAllModals()

    switch(name.toLowerCase()) {
      case 'kubernetes':
        showKubernetes.value = true
        break
      case 'mongodb':
        showMongoDB.value = true
        break
    }
  }
</script>

<template>
  <div class="page min-h-[50dvh] mx-auto">
    <div class="portfolio-wrap max-w-[120rem] flex flex-col lg:flex-row mx-auto">
      <hero />

      <main class="lg:flex-1">
        <div class="flex flex-col gap-y-24 my-24">
          <about
            @click:kubernetes="showModal('kubernetes')"
            @click:mongodb="showModal('mongodb')"
          />
          <experience />
          <resume />
          <lazy-contact />
        </div>
      </main>
    </div>

    <lazy-scroll-back />
    <lazy-v-footer />
    <div
      :class="[
        'fixed top-0 h-full w-full bg-gray-700 dark:bg-gray-900 pointer-events-none select-none duration-500',
        showKubernetes || showMongoDB
          ? 'opacity-70'
          : 'opacity-0'
      ]">
    </div>
    <lazy-kubernetes v-model="showKubernetes" />
    <lazy-mongodb v-model="showMongoDB" />
  </div>
</template>
