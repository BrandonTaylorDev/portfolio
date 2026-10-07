<script lang="ts">
	import { formatLocalMonthYear } from '$lib/utils/date';
	let { start, end }: { start: string; end: string | null } = $props();
</script>

<p class="resume-dates">
	<time datetime={start}>{formatLocalMonthYear(start)}</time>
	<span aria-hidden="true"> — </span><span class="sr-only"> to </span>
	{#if end}<time datetime={end}>{formatLocalMonthYear(end)}</time>{:else}Present{/if}
</p>
