<script setup lang="ts">
defineProps<{
  task: { text: string; subtasks: any[]; duration?: number };
  level?: number;
}>();
</script>

<template>
  <div :style="{ marginLeft: `${(level ?? 0) * 24}px` }" class="mb-1">
    <span>{{ task.text }}</span>
    <span v-if="typeof task.duration === 'number'" class="text-xs text-gray-400">
      ({{ (task.duration / 3600000).toFixed(2) }}h)
    </span>
    <div v-if="task.subtasks && task.subtasks.length > 0">
      <TaskPreview
        v-for="(sub, i) in task.subtasks"
        :key="i"
        :task="sub"
        :level="(level ?? 0) + 1"
      />
    </div>
  </div>
</template>