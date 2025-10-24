<script setup lang="ts">
  import { type VNodeRef } from 'vue'

  const cardRefs = ref<HTMLElement[]>([])
  const titleRef = ref<HTMLElement | null>(null)
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
      icon: 'mdi:cloud',
      title: 'Cloud Infrastructure',
      copy: 'Architecting and maintaining scalable cloud environments with AWS, Azure, and GCP, focusing on cost optimization, resilience, and automated provisioning through infrastructure-as-code practices.'
    },
    {
      icon: 'mdi:tools',
      title: 'DevOps & Automation',
      copy: 'Implementing CI/CD workflows, configuration management, and observability pipelines that accelerate delivery, reduce human error, and promote reliability across complex systems.'
    },
    {
      icon: 'mdi:chart-line',
      title: 'Observability & Reliability Engineering',
      copy: 'Building proactive monitoring, logging, and alerting systems with Prometheus, Grafana, and ELK to ensure visibility, performance insights, and rapid incident response.'
    },
    {
      icon: 'mdi:network',
      title: 'Network Engineering',
      copy: 'Designing secure and efficient network topologies with VLANs, VPNs, and firewalls to ensure high-performance connectivity across distributed systems.'
    },
    {
      icon: 'mdi:script',
      title: 'Automation & Scripting',
      copy: 'Creating automation tools and scripts using Python, Bash, and PowerShell to eliminate manual workflows and increase operational efficiency.'
    },
    {
      icon: 'mdi:shield-lock',
      title: 'Cloud Security',
      copy: 'Integrating security best practices across cloud environments—managing IAM, encryption, and compliance frameworks to safeguard assets and data.'
    }
  ]

  // animation timing configuration (ms)
  const baseDelay = 200
  const delayStep = 100

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        const el = entry.target as HTMLElement

        // Title: animate immediately with fade-in
        if (el === titleRef.value) {
          el.classList.add('animate-fade-in')
          el.classList.remove('opacity-0')
          observer.unobserve(el)
          continue
        }

        // Cards: compute index from data-index attribute (DOM order = natural reading order)
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
    titleRef.value && observer.observe(titleRef.value)
  })

  onUnmounted(() => observer?.disconnect())
</script>

<template>
  <section class="relative overflow-hidden w-full mt-64 py-32">
    <circuit-background :opacity="30" />
    <div class="max-w-5xl mx-auto px-6 py-12">
      <h2 ref="titleRef" class="text-3xl font-bold text-center mb-12 text-teal-400 opacity-0">Core Engineering & Technical Expertise</h2>
      <div class="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
