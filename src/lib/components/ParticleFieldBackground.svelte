<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';

  interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    opacity: number;
  }

  let { 
    opacity = 15, 
    fadeType = 'radial', 
    primaryColor = '#14b8a6', 
    secondaryColor = '#0891b2',
    nodeCount = 40,
    connectionDistance = 120,
    animationSpeed = 0.5
  } = $props();

  let canvas = $state<HTMLCanvasElement | null>(null);
  let animationId = $state<number | null>(null);
  let particles = $state<Particle[]>([]);

  function initParticles() {
    particles = [];
    for (let i = 0; i < nodeCount; i++) {
      particles.push({
        x: Math.random() * (canvas?.width || 800),
        y: Math.random() * (canvas?.height || 600),
        vx: (Math.random() - 0.5) * animationSpeed,
        vy: (Math.random() - 0.5) * animationSpeed,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.3
      });
    }
  }

  function drawConnections(ctx: CanvasRenderingContext2D) {
    for (let i = 0; i < particles.length; i++) {
      const particle1 = particles[i];
      if (!particle1) continue;
      
      for (let j = i + 1; j < particles.length; j++) {
        const particle2 = particles[j];
        if (!particle2) continue;
        
        const dx = particle1.x - particle2.x;
        const dy = particle1.y - particle2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          const opacity = (1 - distance / connectionDistance) * 0.3;
          ctx.strokeStyle = `${primaryColor}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particle1.x, particle1.y);
          ctx.lineTo(particle2.x, particle2.y);
          ctx.stroke();
        }
      }
    }
  }

  function drawParticles(ctx: CanvasRenderingContext2D) {
    particles.forEach(particle => {
      ctx.fillStyle = `${primaryColor}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function updateParticles() {
    particles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x <= 0 || particle.x >= (canvas?.width || 800)) {
        particle.vx = -particle.vx;
      }
      if (particle.y <= 0 || particle.y >= (canvas?.height || 600)) {
        particle.vy = -particle.vy;
      }
    });
  }

  function animate() {
    if (!browser || !canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawConnections(ctx);
    drawParticles(ctx);
    updateParticles();

    animationId = requestAnimationFrame(animate);
  }

  function handleResize() {
    if (!canvas) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    initParticles();
  }

  onMount(() => {
    if (browser && canvas) {
      handleResize();
      window.addEventListener('resize', handleResize);
      animate();
    }
  });

  onDestroy(() => {
    if (browser) {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      window.removeEventListener('resize', handleResize);
    }
  });
</script>

<div class="absolute inset-0 pointer-events-none">
  <canvas
    bind:this={canvas}
    class="w-full h-full particle-fade"
    style="opacity: {opacity / 100}"
  ></canvas>

  {#if fadeType === 'radial'}
    <div class="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-zinc-900"></div>
  {/if}
</div>

<style>
  .particle-fade {
    mask-image: radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%);
    -webkit-mask-image: radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%);
    mask-mode: alpha;
  }
</style>
