<script lang="ts">
	import HexagonBackground from '$lib/components/HexagonBackground.svelte';
	import CircuitBackground from '$lib/components/CircuitBackground.svelte';
	import Icon from '@iconify/svelte';

	const projects = [
		{
			name: 'When Should I Take a Vacation?',
			tags: ['Svelte', 'TypeScript', 'Tailwind CSS', 'Vercel'],
			description:
				'A silly, yet useful tool that offers personalized vacation date recommendations based on your available paid time off and federal holidays.',
			icon: 'mdi:beach',
			href: 'https://www.whenshoulditakeavacation.com/'
		},
		{
			name: 'URL Shortener',
			tags: ['Nuxt', 'TypeScript', 'Tailwind CSS', 'MongoDB', 'Vercel'],
			description:
				'A simple and efficient URL shortening service that allows users to create and use shortened links with ease.',
			icon: 'mdi:link-variant',
			href: 'https://short.app.brandontaylor.dev/'
		},
		{
			name: 'Random Quote Generator',
			tags: ['Nuxt', 'TypeScript', 'Tailwind CSS', 'MongoDB', 'Vercel'],
			description:
				'A goofy website that provides visitors with random quotes to inspire and entertain them.',
			icon: 'mdi:format-quote-close',
			href: 'https://quotes.app.brandontaylor.dev/'
		},
		{
			name: 'GQL Query Builder',
			tags: ['TypeScript', 'GraphQL'],
			description:
				'A TypeScript file that functions as a boilerplate for a library that constructs GraphQL queries easily. Soon to be a published library.',
			icon: 'mdi:code-braces',
			href: 'https://github.com/BrandonTaylorDev/gql-query-builder',
		},
		{
			name: 'Password Generator',
			tags: ['Many Languages', 'Example Implementations'],
			description:
				'A collection of password generator implementations in various programming languages, showcasing the same mechanism across different ecosystems.',
			icon: 'mdi:shield-key',
			href: 'https://github.com/BrandonTaylorDev/password-generator'
		}
	];
</script>

<svelte:head>
	<title>Projects | Brandon Taylor</title>
	<meta name="description" content="A showcase of projects and applications I've built." />
</svelte:head>

<div class="min-h-screen bg-zinc-900 text-zinc-100">
	<!-- Hero Section -->
	<section class="relative overflow-hidden py-24">
		<HexagonBackground opacity={15} fadeType="radial" />
		<div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<a
				href="/"
				class="group mb-6 inline-flex items-center gap-2 text-zinc-400 transition-colors hover:text-teal-400"
			>
				<Icon
					icon="mdi:arrow-left"
					class="h-5 w-5 transform transition-transform group-hover:-translate-x-1"
				/>
				<span>Back to Home</span>
			</a>
			<div class="text-center">
				<h1 class="mb-6 text-5xl font-bold md:text-6xl">
					<span class="text-teal-400">Projects</span> & Applications
				</h1>
				<p class="mx-auto max-w-3xl text-xl text-zinc-400">
					A collection of platforms, tools, and systems I've created to solve both simple and
					complex problems, and sometimes just for fun.
				</p>
			</div>
		</div>
	</section>

	<!-- Projects Grid Section -->
	<section class="relative overflow-hidden py-24">
		<CircuitBackground opacity={30} />
		<div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div
				class="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] justify-items-center gap-10"
			>
				{#each projects as project, i}
					<div
						class="group relative w-full max-w-sm rounded-lg border border-zinc-700 bg-zinc-800 p-8 transition-all duration-300 hover:scale-105 hover:border-teal-500 hover:shadow-2xl"
						style="animation-delay: {i * 100}ms"
					>
						<!-- Icon -->
						<div class="absolute -top-6 left-1/2 -translate-x-1/2 transform">
							<div
								class="flex h-16 w-16 items-center justify-center rounded-full bg-teal-600 shadow-lg transition-colors group-hover:bg-teal-500"
							>
								<Icon icon={project.icon} class="h-8 w-8 text-white" />
							</div>
						</div>

						<!-- Content -->
						<div class="mt-4 flex h-full flex-col">
							<h2
								class="mb-4 text-center text-2xl font-bold transition-colors group-hover:text-teal-400"
							>
								{project.name}
							</h2>

							<div class="mb-6 flex flex-wrap justify-center gap-2">
								{#each project.tags as tag}
									<span
										class="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-xs text-zinc-300"
									>
										{tag}
									</span>
								{/each}
							</div>

							<p class="flex-1 text-center leading-relaxed text-zinc-400">
								{project.description}
							</p>

							<a
								href={project.href}
								class="mt-6 inline-flex items-center justify-center gap-1 text-teal-400 transition-colors hover:text-teal-300"
							>
								Check it out
								<Icon icon="mdi:arrow-right" class="h-4 w-4" />
							</a>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>
</div>
