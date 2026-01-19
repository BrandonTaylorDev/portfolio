<script lang="ts">
  import type { Snippet } from 'svelte';
  
  let { children }: { children?: Snippet } = $props();
</script>

<div class="section-content">
  <div class="section-inner mx-auto flex max-w-5xl flex-row items-center justify-center">
    {@render children?.()}
  </div>
</div>
