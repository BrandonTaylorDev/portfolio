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
		gridX?: number;
		gridY?: number;
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

	// Cache values for performance
	let canvasWidth = 0;
	let canvasHeight = 0;
	let connectionDistanceSquared = 0;
	let gridSize = 0;
	let gridCols = 0;
	let gridRows = 0;
	let grid: Particle[][][] = [];

	// Parse primary color RGB once
	let primaryRGB = '';

	function hexToRgb(hex: string): string {
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		if (!result) return '20, 184, 166'; // fallback to teal
		return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
	}

	function initParticles() {
		particles = [];
		connectionDistanceSquared = connectionDistance * connectionDistance;
		gridSize = connectionDistance;
		gridCols = Math.ceil(canvasWidth / gridSize);
		gridRows = Math.ceil(canvasHeight / gridSize);
		primaryRGB = hexToRgb(primaryColor);

		for (let i = 0; i < nodeCount; i++) {
			particles.push({
				x: Math.random() * canvasWidth,
				y: Math.random() * canvasHeight,
				vx: (Math.random() - 0.5) * animationSpeed,
				vy: (Math.random() - 0.5) * animationSpeed,
				radius: Math.random() * 2 + 1,
				opacity: Math.random() * 0.5 + 0.3
			});
		}
	}

	function updateGrid() {
		// Clear grid
		grid = Array.from({ length: gridRows }, () => Array.from({ length: gridCols }, () => []));

		// Assign particles to grid cells
		for (const particle of particles) {
			const gridX = Math.floor(particle.x / gridSize);
			const gridY = Math.floor(particle.y / gridSize);
			particle.gridX = gridX;
			particle.gridY = gridY;

			if (gridY >= 0 && gridY < gridRows && gridX >= 0 && gridX < gridCols) {
				grid[gridY][gridX].push(particle);
			}
		}
	}

	function drawConnections(ctx: CanvasRenderingContext2D) {
		ctx.lineWidth = 0.5;

		for (let i = 0; i < particles.length; i++) {
			const particle1 = particles[i];
			if (!particle1 || particle1.gridX === undefined || particle1.gridY === undefined) continue;

			// Only check neighboring grid cells
			for (let dy = -1; dy <= 1; dy++) {
				for (let dx = -1; dx <= 1; dx++) {
					const gridY = particle1.gridY + dy;
					const gridX = particle1.gridX + dx;

					if (gridY < 0 || gridY >= gridRows || gridX < 0 || gridX >= gridCols) continue;
					if (!grid[gridY] || !grid[gridY][gridX]) continue;

					for (const particle2 of grid[gridY][gridX]) {
						// Skip if same particle or already processed
						if (particle2 === particle1) continue;

						const dx2 = particle1.x - particle2.x;
						const dy2 = particle1.y - particle2.y;
						const distanceSquared = dx2 * dx2 + dy2 * dy2;

						if (distanceSquared < connectionDistanceSquared) {
							const opacity = (1 - Math.sqrt(distanceSquared) / connectionDistance) * 0.3;
							ctx.strokeStyle = `rgba(${primaryRGB}, ${opacity})`;
							ctx.beginPath();
							ctx.moveTo(particle1.x, particle1.y);
							ctx.lineTo(particle2.x, particle2.y);
							ctx.stroke();
						}
					}
				}
			}
		}
	}

	function drawParticles(ctx: CanvasRenderingContext2D) {
		// Batch drawing by using a single path
		for (const particle of particles) {
			ctx.fillStyle = `rgba(${primaryRGB}, ${particle.opacity})`;
			ctx.beginPath();
			ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
			ctx.fill();
		}
	}

	function updateParticles() {
		for (const particle of particles) {
			particle.x += particle.vx;
			particle.y += particle.vy;

			if (particle.x <= 0 || particle.x >= canvasWidth) {
				particle.vx = -particle.vx;
				particle.x = Math.max(0, Math.min(canvasWidth, particle.x));
			}
			if (particle.y <= 0 || particle.y >= canvasHeight) {
				particle.vy = -particle.vy;
				particle.y = Math.max(0, Math.min(canvasHeight, particle.y));
			}
		}
	}

	function animate() {
		if (!browser || !canvas) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		ctx.clearRect(0, 0, canvasWidth, canvasHeight);

		updateGrid();
		drawConnections(ctx);
		drawParticles(ctx);
		updateParticles();

		animationId = requestAnimationFrame(animate);
	}

	function handleResize() {
		if (!canvas) return;
		canvasWidth = canvas.offsetWidth;
		canvasHeight = canvas.offsetHeight;
		canvas.width = canvasWidth;
		canvas.height = canvasHeight;
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

<div class="pointer-events-none absolute inset-0 z-40">
	<canvas bind:this={canvas} class="particle-fade h-full w-full" style="opacity: {opacity / 100}"
	></canvas>

	{#if fadeType === 'radial'}
		<div
			class="bg-gradient-radial absolute inset-0 from-transparent via-transparent to-zinc-900"
		></div>
	{/if}
</div>

<style>
	.particle-fade {
		mask-image: radial-gradient(ellipse at center, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 80%);
		-webkit-mask-image: radial-gradient(
			ellipse at center,
			rgba(0, 0, 0, 1) 0%,
			rgba(0, 0, 0, 0) 80%
		);
		mask-mode: alpha;
	}
</style>
