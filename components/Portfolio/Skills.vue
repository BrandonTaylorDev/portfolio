<template>
  <section class="max-w-5xl mx-auto px-6 py-12">
    <h2 class="text-3xl font-bold text-center mb-12 text-teal-400">Skills</h2>
    
    <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-2">

        <!-- Project Management -->
        <portfolio-skills-card class="animation-delay-200">
          <template #icon>
            <icon name="mdi:clipboard-list" class="text-teal-400 mr-2" size="1.5rem" />
          </template>

          <template #title>
            Project Management
          </template>

          <template #description>
            Strategic planning, agile delivery, stakeholder alignment, and risk mitigation across complex, multi-team initiatives.
          </template>
        </portfolio-skills-card>

        <!-- System Engineering -->
        <portfolio-skills-card class="animation-delay-300">
          <template #icon>
            <icon name="mdi:server" class="text-teal-400 mr-2" size="1.5rem" />
          </template>

          <template #title>
            System Engineering
          </template>

          <template #description>
            Design, build, and operate resilient infrastructure, automation pipelines, and high-availability services at scale.
          </template>
        </portfolio-skills-card>

        <!-- Information Security -->
        <portfolio-skills-card class="animation-delay-400">
          <template #icon>
            <icon name="mdi:shield-lock" class="text-teal-400 mr-2" size="1.5rem" />
          </template>

          <template #title>
            Information Security
          </template>

          <template #description>
            Implement zero‑trust architectures, threat modeling, and compliance frameworks to protect data and services.
          </template>
        </portfolio-skills-card>

        <!-- Enterprise Platforms -->
        <portfolio-skills-card class="animation-delay-500">
          <template #icon>
            <icon name="mdi:cloud" class="text-teal-400 mr-2" size="1.5rem" />
          </template>

          <template #title>
            Enterprise Platforms
          </template>

          <template #description>
            Leverage Azure, Kubernetes, and hybrid cloud solutions to deliver scalable, secure enterprise applications.
          </template>
        </portfolio-skills-card>
      </div>
  </section>
</template>

<style scoped>
  .animate-fade-in-left {
    animation: fadeInLeft 0.25s ease-out forwards;
    opacity: 0;
  }
  @keyframes fadeInLeft {
    from { opacity: 0; transform: translateX(-30px); }
    to { opacity: 1; transform: translateX(0); }
  }
</style>