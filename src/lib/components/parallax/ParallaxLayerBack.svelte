<script lang="ts">
  import type { Snippet } from 'svelte';
  
  let { children }: { children?: Snippet } = $props();
</script>

<div class="parallax__layer parallax__layer--back fade-vertical">
  {@render children?.()}
</div>
