<script lang="ts">
	let { showResume = false, children } = $props();

	let translateClass = $derived(showResume === false ? 'translate-x-0' : '-translate-x-1/2');
</script>

<div
	class="{translateClass} flex h-screen max-h-screen w-[200vw] flex-row overflow-hidden transition-transform duration-700 ease-in-out"
>
	{@render children()}
</div>
