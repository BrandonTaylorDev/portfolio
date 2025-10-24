<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue'

  type Props = {
    opacity?: number
    fadeType?: 'radial' | 'linear'
    primaryColor?: string
    secondaryColor?: string
    nodeCount?: number
    connectionDistance?: number
    animationSpeed?: number
  }

  const props = withDefaults(defineProps<Props>(), {
    opacity: 15,
    fadeType: 'radial',
    primaryColor: '#14b8a6',
    secondaryColor: '#0891b2',
    nodeCount: 40,
    connectionDistance: 120,
    animationSpeed: 0.5
  });

  // Particle system
  const canvas = ref<HTMLCanvasElement | null>(null)
  const animationId = ref<number | null>(null)
  const particles = ref<Array<{
    x: number
    y: number
    vx: number
    vy: number
    radius: number
    opacity: number
  }>>([])

  // Initialize particles
  const initParticles = () => {
    particles.value = []
    for (let i = 0; i < props.nodeCount; i++) {
      particles.value.push({
        x: Math.random() * (canvas.value?.width || 800),
        y: Math.random() * (canvas.value?.height || 600),
        vx: (Math.random() - 0.5) * props.animationSpeed,
        vy: (Math.random() - 0.5) * props.animationSpeed,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.3
      })
    }
  }

  // Draw connections between nearby particles
  const drawConnections = (ctx: CanvasRenderingContext2D) => {
    for (let i = 0; i < particles.value.length; i++) {
      const particle1 = particles.value[i]
      if (!particle1) continue
      
      for (let j = i + 1; j < particles.value.length; j++) {
        const particle2 = particles.value[j]
        if (!particle2) continue
        
        const dx = particle1.x - particle2.x
        const dy = particle1.y - particle2.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < props.connectionDistance) {
          const opacity = (1 - distance / props.connectionDistance) * 0.3
          ctx.strokeStyle = `${props.primaryColor}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.moveTo(particle1.x, particle1.y)
          ctx.lineTo(particle2.x, particle2.y)
          ctx.stroke()
        }
      }
    }
  }

  // Draw particles
  const drawParticles = (ctx: CanvasRenderingContext2D) => {
    particles.value.forEach(particle => {
      ctx.fillStyle = `${props.primaryColor}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
      ctx.fill()
    })
  }

  // Update particle positions
  const updateParticles = () => {
    particles.value.forEach(particle => {
      particle.x += particle.vx
      particle.y += particle.vy

      // Bounce off edges
      if (particle.x <= 0 || particle.x >= (canvas.value?.width || 800)) {
        particle.vx = -particle.vx
      }
      if (particle.y <= 0 || particle.y >= (canvas.value?.height || 600)) {
        particle.vy = -particle.vy
      }

      // Keep particles in bounds
      particle.x = Math.max(0, Math.min(particle.x, canvas.value?.width || 800))
      particle.y = Math.max(0, Math.min(particle.y, canvas.value?.height || 600))
    })
  }

  // Animation loop
  const animate = () => {
    const ctx = canvas.value?.getContext('2d')
    if (!ctx || !canvas.value) return

    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
    
    updateParticles()
    drawConnections(ctx)
    drawParticles(ctx)

    animationId.value = requestAnimationFrame(animate)
  }

  // Handle canvas resize
  const handleResize = () => {
    if (!canvas.value) return
    canvas.value.width = canvas.value.offsetWidth
    canvas.value.height = canvas.value.offsetHeight
  }

  onMounted(() => {
    handleResize()
    initParticles()
    animate()
    
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    if (animationId.value) {
      cancelAnimationFrame(animationId.value)
    }
    window.removeEventListener('resize', handleResize)
  })
</script>

<template>
  <div class="absolute inset-0 pointer-events-none overflow-hidden">
    <!-- Canvas for particle animation -->
    <canvas
      ref="canvas"
      class="absolute inset-0 w-full h-full particle-fade"
      :style="{ opacity: opacity / 100 }"
    />

    <!-- Optional vignette for edge darkening (only for radial fade) -->
    <div v-if="fadeType === 'radial'" class="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-zinc-900"></div>
  </div>
</template>

<style scoped>
  /* Radial fade for particle field */
  .particle-fade {
    mask-image: radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,0) 100%);
    -webkit-mask-image: radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,0) 100%);
    mask-mode: alpha;
  }

  /* Linear fade variant */
  .particle-fade[data-fade-type="linear"] {
    mask-image: linear-gradient(
      to bottom,
      rgba(0,0,0,0) 0%,
      rgba(0,0,0,0.2) 15%,
      rgba(0,0,0,0.7) 30%,
      rgba(0,0,0,0.7) 70%,
      rgba(0,0,0,0.2) 85%,
      rgba(0,0,0,0) 100%
    );
    -webkit-mask-image: linear-gradient(
      to bottom,
      rgba(0,0,0,0) 0%,
      rgba(0,0,0,0.2) 15%,
      rgba(0,0,0,0.7) 30%,
      rgba(0,0,0,0.7) 70%,
      rgba(0,0,0,0.2) 85%,
      rgba(0,0,0,0) 100%
    );
    mask-mode: alpha;
  }

  /* Ensure canvas covers full area */
  canvas {
    width: 100%;
    height: 100%;
  }
</style>