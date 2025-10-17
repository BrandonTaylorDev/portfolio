<template>
  <div class="bg-zinc-800 rounded-lg p-6 shadow-lg hover:shadow-2xl transition-shadow flex flex-col animate-fade-in-left">
    <div class="flex items-center mb-4">
      <slot name="icon" />
      <h3 class="text-xl font-semibold text-teal-400">
        <slot name="title" />
      </h3>
    </div>

    <p class="text-sm text-zinc-300">
      <slot name="description" />
    </p>
  </div>
</template>
