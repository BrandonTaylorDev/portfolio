<script setup lang="ts">

type Task = {
  text: string;
  subtasks: Task[];
};

const props = defineProps<{
  subtasks: Task[];
  level?: number;
}>();

const newSubtask = ref<string>('');
const indentLevel = props.level ?? 0;

const addSubtask = () => {
  if (newSubtask.value.trim() !== '') {
    props.subtasks.push({ text: newSubtask.value, subtasks: [] });
    newSubtask.value = '';
  }
};

const removeSubtask = (index: number) => {
  props.subtasks.splice(index, 1);
};
</script>

<template>
  <div :style="{ marginLeft: `${indentLevel * 24}px` }">
    <div class="flex mb-2">
      <input
        class="flex-1 p-1 border border-gray-200 rounded text-slate-300 bg-slate-800"
        v-model="newSubtask"
        placeholder="Subtask description"
        @keyup.enter="addSubtask"
      />
      <button
        class="ml-2 px-2 py-1 bg-green-400 text-slate-300 bg-slate-800 rounded hover:bg-green-500"
        @click="addSubtask"
        title="Add Subtask"
      >+</button>
    </div>
    <div
      v-for="(subtask, subtaskIndex) in subtasks"
      :key="subtaskIndex"
      :style="{ marginLeft: `${24}px`, marginBottom: '4px' }"
    >
      <div class="flex items-center">
        <span class="flex-1 p-1 border border-gray-100 rounded text-slate-300 bg-slate-800">{{ subtask.text }}</span>
        <button
          class="ml-2 px-2 py-1 bg-red-400 text-slate-300 bg-slate-800 rounded hover:bg-red-500"
          @click="removeSubtask(subtaskIndex)"
          title="Remove Subtask"
        >-</button>
      </div>
      <!-- Recursive subtask input, increase level -->
      <SubtaskInput :subtasks="subtask.subtasks" :level="(indentLevel + 1)" />
    </div>
  </div>
</template>
