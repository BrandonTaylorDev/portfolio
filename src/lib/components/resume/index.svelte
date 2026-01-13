<script lang="ts">
	import RailSide from '../RailSide.svelte';
	import Paper from './Paper.svelte';

	let { showResume = false, onUpdateShowResume } = $props();
</script>

<RailSide
	class="transform-colors relative bg-zinc-200 text-zinc-900 duration-500 dark:bg-zinc-700 dark:text-zinc-100"
>
	<Paper {showResume} {onUpdateShowResume} />
</RailSide>
