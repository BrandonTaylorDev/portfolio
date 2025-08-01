<script setup lang="ts">

type Task = { text: string; subtasks: Task[]; duration?: number };

const props = defineProps<{
  subtasks: Task[];
  level?: number;
}>();

const indentLevel = props.level ?? 0;
</script>

<template>
  <ul :style="{ marginLeft: `${indentLevel * 24}px` }" class="list-disc">
    <li v-for="(subtask, i) in props.subtasks" :key="i">
      {{ subtask.text }}
      <span v-if="typeof subtask.duration === 'number'" class="text-sm text-gray-400">
        ({{ (subtask.duration / 3600000).toFixed(2) }} hours)
      </span>
      <TaskList
        v-if="subtask.subtasks.length > 0"
        :subtasks="subtask.subtasks"
        :level="(indentLevel + 1)"
      />
    </li>
  </ul>
</template>
