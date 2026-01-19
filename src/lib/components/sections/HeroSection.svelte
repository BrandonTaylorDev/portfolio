<script lang="ts">
  import { goto } from '$app/navigation';
  import CircuitBackground from '$lib/components/backgrounds/CircuitBackground.svelte';
  import ParallaxGroup from '$lib/components/parallax/ParallaxGroup.svelte';
  import ParallaxLayerBase from '$lib/components/parallax/ParallaxLayerBase.svelte';
  import ParallaxContent from '$lib/components/parallax/ParallaxContent.svelte';
	import ParallaxLayerBack from '$lib/components/parallax/ParallaxLayerBack.svelte';
</script>

<ParallaxGroup>
  <ParallaxLayerBack>
    <CircuitBackground opacity={15} fadeType="radial" color="#14b8a6" />
  </ParallaxLayerBack>

  <ParallaxLayerBase>
    <ParallaxContent>
      <div
          class="flex max-w-2xl flex-col items-center text-center duration-500 ease-in-out lg:max-w-full lg:items-end lg:text-right"
        >
          <div class="space-y-4 lg:text-start">
            <div>
              <h2
                class="animate-fade-in-left text-3xl font-light tracking-wide text-zinc-400 transition-[font-size] xl:text-4xl"
              >
                Hi! <span class="animate-shaka animation-delay-1.5s inline-block">🤙</span>
              </h2>

              <h1
                class="animate-fade-in-left animation-delay-100 text-6xl font-bold transition-[font-size] xl:text-7xl"
              >
                I'm <span class="text-teal-500">Brandon</span> <span class="initial">Taylor</span>
              </h1>
            </div>

            <div>
              <p
                class="animate-fade-in-left animation-delay-200 mx-auto max-w-3xl leading-relaxed font-light text-zinc-300 transition-[font-size] lg:mx-0 lg:text-lg"
              >
                A passionate enterprise platform engineer specializing in building scalable solutions
                and services tailored for the modern world.
              </p>
            </div>

            <div class="flex flex-col gap-4 sm:flex-row">
              <button
                class="animate-fade-in-left animation-delay-300 inline-flex transform cursor-pointer items-center gap-3 rounded-full bg-teal-600/50 px-8 py-4 text-lg font-medium text-zinc-100 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-teal-500 hover:shadow-xl"
                onclick={() => goto('/resume/') }
              >
                <svg class="h-7 w-7" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M6,2A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6M6,4H13V9H18V20H6V4M8,12V14H16V12H8M8,16V18H13V16H8Z"
                  />
                </svg>
                <span>View Resume</span>
              </button>

              <a
                href="/projects"
                class="animate-fade-in-left animation-delay-400 inline-flex transform items-center gap-3 rounded-full border border-zinc-700 bg-zinc-800/70 px-8 py-4 text-lg font-medium text-zinc-100 shadow-lg transition-all duration-300 hover:scale-105 hover:border-zinc-600 hover:bg-zinc-700 hover:shadow-xl"
              >
                <svg class="h-7 w-7" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M16,20H20V16H16M16,14H20V10H16M10,8H14V4H10M16,8H20V4H16M10,14H14V10H10M4,14H8V10H4M4,20H8V16H4M10,20H14V16H10M4,8H8V4H4V8Z"
                  />
                </svg>
                <span>View Projects</span>
              </a>
            </div>
          </div>
        </div>

        <div
          class="animate-fade-in animation-delay-500 hidden w-96 items-center justify-center duration-300 ease-in-out lg:flex"
        >
          <img
            class="h-auto w-full rounded-full border-4 border-zinc-700 shadow-2xl transition-[width,height]"
            src="/portfolio.webp"
            alt="Brandon Taylor"
          />
        </div>
    </ParallaxContent>
  </ParallaxLayerBase>
</ParallaxGroup>

<style>
	@keyframes shaka-in {
		0%,
		100% {
			transform: rotate(0deg) scale(1);
		}
		25% {
			transform: rotate(-15deg) scale(1.1);
		}
		50% {
			transform: rotate(10deg) scale(1.05);
		}
		75% {
			transform: rotate(-5deg) scale(1.02);
		}
	}

	@keyframes shaka {
		0%,
		100% {
			transform: rotate(0deg) scale(1);
		}
		25% {
			transform: rotate(-15deg) scale(1.1);
		}
		50% {
			transform: rotate(10deg) scale(1.05);
		}
		75% {
			transform: rotate(-5deg) scale(1.02);
		}
	}

	.animate-shaka {
		animation: shaka-in 0.6s ease-in-out 0.8s both;
	}

	.animate-shaka:hover {
		animation: shaka 0.6s ease-in-out both;
	}
</style>
