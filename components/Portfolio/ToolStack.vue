<script setup lang="ts">
import { computed } from 'vue'

type SkillShape = { platforms: string[]; languages: string[]; frameworks: string[]; other: string[] }

const { data: skills } = await useAsyncData('skills-stack', () =>
  queryCollection('skills').all()
)

const defaultSkills: SkillShape = { platforms: [], languages: [], frameworks: [], other: [] }

const skillData: SkillShape = (skills && skills.value && skills.value.length > 0)
  ? (skills.value[0] as SkillShape)
  : defaultSkills

const stack = [
  { title: 'Platforms', items: skillData.platforms, icon: 'mdi:cloud' },
  { title: 'Languages', items: skillData.languages, icon: 'mdi:code-tags' },
  { title: 'Frameworks', items: skillData.frameworks, icon: 'mdi:shape' },
  { title: 'Other', items: skillData.other, icon: 'mdi:toolbox' }
]

// Flatten stack into a single tools list and sort alphabetically
const tools = computed(() => {
  const list: string[] = []
  stack.forEach((s) => {
    if (Array.isArray((s as any).items)) list.push(...(s as any).items)
  })
  // remove duplicates and sort alphabetically
  return Array.from(new Set(list)).sort((a, b) => a.localeCompare(b))
})


</script>

<template>
  <section class="relative overflow-hidden w-full flex items-center justify-center mt-64 py-32">
    <!-- <energy-flow-background :opacity="20" fade-type="linear" primary-color="#14b8a6" secondary-color="#0891b2" /> -->
     <particle-field-background :opacity="50" fade-type="radial" primary-color="#14b8a6" secondary-color="#0891b2" :node-count="100" :connection-distance="150" :animation-speed="1" />

    <div class="max-w-5xl mx-auto px-6 py-12">
      <h2 class="text-3xl font-bold text-center mb-8 text-teal-400">Tool Stack</h2>

      <div class="w-full flex justify-center">
        <div class="relative w-full max-w-4xl">
          <div class="flex flex-wrap justify-center gap-3"
              role="list"
          >
            <button
              v-for="(tool, i) in tools"
              :key="tool"
              class="rounded-full px-4 py-2 text-sm bg-zinc-800 text-zinc-100 transform-gpu transition duration-300 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-500"
              type="button"
              aria-label="tool"
            >
              {{ tool }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
