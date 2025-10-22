<script setup lang="ts">
  import { type VNodeRef } from 'vue'

  const cardRefs = ref<HTMLElement[]>([])
  let observer: IntersectionObserver

  const setCardRef = (i: number): VNodeRef => (el, _refs) => {
    if (el instanceof HTMLElement) {
      cardRefs.value[i] = el
      
      // auto-assign dataset index so we can compute delays dynamically
      el.dataset.index = String(i)
    }
  }

  // data-driven card definitions
  const cards = [
    {
      icon: 'mdi:server',
      title: 'Systems Engineering',
      copy: 'Designing and operating resilient infrastructure with focus on high availability, performance optimization, and automated monitoring of mission-critical production environments.'
    },
    {
      icon: 'mdi:docker',
      title: 'Platform Engineering',
      copy: 'Building scalable containerized platforms with Docker and Kubernetes, implementing CI/CD pipelines and infrastructure as code for reliable software delivery.'
    },
    {
      icon: 'mdi:shield-lock',
      title: 'Cybersecurity',
      copy: 'Implementing zero-trust architectures, threat modeling, and security frameworks to protect critical infrastructure and establish defense-in-depth strategies.'
    }
  ]

  // animation timing configuration (ms)
  const baseDelay = 200
  const delayStep = 100

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {

        // compute index from data-index attribute (DOM order = natural reading order)
        const el = entry.target as HTMLElement
        const idx = Number(el.dataset.index ?? 0)
        const delay = baseDelay + idx * delayStep

        // set inline style so the delay is applied per-card
        el.style.animationDelay = `${delay}ms`
        el.classList.add('animate-fade-in-bottom')
        el.classList.remove('opacity-0')
        observer.unobserve(entry.target)
      }
    }
  }

  onMounted(async () => {
    await nextTick()
    observer = new IntersectionObserver(handleIntersection, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })
    cardRefs.value.forEach(el => el && observer.observe(el))
  })

  onUnmounted(() => observer?.disconnect())
</script>

<template>
  <section class="max-w-5xl mx-auto px-6 py-12">
    <h2 class="text-3xl font-bold text-center mb-12 text-teal-400">Expertise</h2>
    
    <div class="grid gap-8 md:grid-cols-3">

      <template v-for="(c, i) in cards" :key="c.title">
        <div
          :ref="setCardRef(i)"
          class="relative bg-zinc-800 rounded-lg p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 opacity-0"
        >
          <!-- Hexagon on top border -->
          <div class="absolute -top-6 left-1/2 transform -translate-x-1/2">
            <div class="hexagon bg-teal-600 flex items-center justify-center">
              <icon :name="c.icon" class="text-white" size="1.5rem" />
            </div>
          </div>

          <div class="mt-4">
            <h3 class="text-xl font-semibold text-teal-400 text-center mb-4">{{ c.title }}</h3>
            <p class="text-sm text-zinc-300 text-center">{{ c.copy }}</p>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<style scoped>
  .hexagon {
    width: 48px;
    height: 48px;
    position: relative;
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hexagon::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: inherit;
    z-index: -1;
  }
</style>
