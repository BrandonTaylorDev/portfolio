<script lang="ts">
	import RailSide from '../RailSide.svelte';
	import Hero from './Hero.svelte';
	import Tagline from './Tagline.svelte';
	import Expertise from './Expertise.svelte';
	import ToolStack from './ToolStack.svelte';

	let { showResume = false, onUpdateShowResume } = $props();
</script>

<RailSide class="bg-zinc-900 text-zinc-100">
	<Hero {showResume} {onUpdateShowResume} />
	<Tagline />
	<Expertise />
	<ToolStack />
</RailSide>
