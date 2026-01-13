<script lang="ts">
  let { showResume = false, children } = $props();
  
  let translateClass = $derived(
    showResume === false ? 'translate-x-0' : '-translate-x-1/2'
  );
</script>

<div class="{translateClass} w-[200vw] h-screen max-h-screen overflow-hidden flex flex-row transition-transform duration-700 ease-in-out">
  {@render children()}
</div>
