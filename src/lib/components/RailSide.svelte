<script lang="ts">
  let { class: className = '', children } = $props();
</script>

<main class="relative min-w-screen flex-1 overflow-y-auto {className}">
  {@render children()}
</main>
