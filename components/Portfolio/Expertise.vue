<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, type ComponentPublicInstance, type VNodeRef } from 'vue'

const cardRefs = ref<HTMLElement[]>([])
let observer: IntersectionObserver

const setCardRef = (i: number): VNodeRef => (el, _refs) => {
  if (el instanceof HTMLElement) cardRefs.value[i] = el
}

const handleIntersection = (entries: IntersectionObserverEntry[]) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fade-in-bottom')
      entry.target.classList.remove('opacity-0')
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
      <!-- Cybersecurity Card -->
      <div 
        :ref="setCardRef(0)"
        class="relative bg-zinc-800 rounded-lg p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 animation-delay-200 opacity-0"
      >
        <!-- Hexagon on top border -->
        <div class="absolute -top-6 left-1/2 transform -translate-x-1/2">
          <div class="hexagon bg-teal-600 flex items-center justify-center">
            <icon name="mdi:shield-lock" class="text-white" size="1.5rem" />
          </div>
        </div>
        
        <div class="mt-4">
          <h3 class="text-xl font-semibold text-teal-400 text-center mb-4">Cybersecurity</h3>
          <p class="text-sm text-zinc-300 text-center">
            Implementing zero-trust architectures, threat modeling, and security frameworks to protect critical infrastructure and establish defense-in-depth strategies.
          </p>
        </div>
      </div>

      <!-- Platform Engineering Card -->
      <div 
        :ref="setCardRef(1)"
        class="relative bg-zinc-800 rounded-lg p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 animation-delay-300 opacity-0"
      >
        <!-- Hexagon on top border -->
        <div class="absolute -top-6 left-1/2 transform -translate-x-1/2">
          <div class="hexagon bg-teal-600 flex items-center justify-center">
            <icon name="mdi:docker" class="text-white" size="1.5rem" />
          </div>
        </div>
        
        <div class="mt-4">
          <h3 class="text-xl font-semibold text-teal-400 text-center mb-4">Platform Engineering</h3>
          <p class="text-sm text-zinc-300 text-center">
            Building scalable containerized platforms with Docker and Kubernetes, implementing CI/CD pipelines and infrastructure as code for reliable software delivery.
          </p>
        </div>
      </div>

      <!-- Systems Engineering Card -->
      <div 
        :ref="setCardRef(2)"
        class="relative bg-zinc-800 rounded-lg p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 animation-delay-400 opacity-0"
      >
        <!-- Hexagon on top border -->
        <div class="absolute -top-6 left-1/2 transform -translate-x-1/2">
          <div class="hexagon bg-teal-600 flex items-center justify-center">
            <icon name="mdi:server" class="text-white" size="1.5rem" />
          </div>
        </div>
        
        <div class="mt-4">
          <h3 class="text-xl font-semibold text-teal-400 text-center mb-4">Systems Engineering</h3>
          <p class="text-sm text-zinc-300 text-center">
            Designing and operating resilient infrastructure with focus on high availability, performance optimization, and automated monitoring of mission-critical production environments.
          </p>
        </div>
      </div>
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