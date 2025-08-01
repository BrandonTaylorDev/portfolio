<script setup lang="ts">
import SubtaskInput from '~/components/SubtaskInput.vue';
import TaskList from '~/components/TaskList.vue';
import TaskPreview from '~/components/TaskPreview.vue'; // <-- Add this import

type Task = {
  text: string;
  subtasks: Task[];
  duration?: number; // Duration in ms
  parent?: Task | null; // For validation
};

const description = ref<string>('');
const tasks = ref<Task[]>([]);
const currentTask = ref<Task>({ text: '', subtasks: [] });
const addingTasks = ref(true);

// For duration entry
const enteringDurations = ref(false);
const durationInput = ref('');
const currentDurationIndex = ref(0);
const flatTaskList = ref<{ task: Task; parent: Task | null }[]>([]);
const reviewMode = ref(false);
const reviewErrors = ref<{ task: Task; expected: number; actual: number }[]>([]);

// Helper: Flatten all tasks and subtasks for duration entry
function flattenTasks(tasks: Task[], parent: Task | null = null, arr: { task: Task; parent: Task | null }[] = []) {
  for (const task of tasks) {
    arr.push({ task, parent });
    if (task.subtasks && task.subtasks.length > 0) {
      flattenTasks(task.subtasks, task, arr);
    }
  }
  return arr;
}

// Save currentTask to tasks and reset for next entry
const saveCurrentTask = () => {
  if (currentTask.value.text.trim() !== '') {
    // Convert to raw object before cloning
    const rawTask = toRaw(currentTask.value);
    const clone = typeof structuredClone === 'function'
      ? structuredClone(rawTask)
      : JSON.parse(JSON.stringify(rawTask));
    tasks.value.push(clone);
    currentTask.value = { text: '', subtasks: [] };
  }
};

// Finish adding tasks
const finishTasks = () => {
  saveCurrentTask();
  addingTasks.value = false;
  if (tasks.value.length > 0) {
    // Prepare flat list for duration entry
    flatTaskList.value = flattenTasks(tasks.value);
    enteringDurations.value = true;
    currentDurationIndex.value = 0;
    durationInput.value = '';
  }
};

// Save duration for current task/subtask and move to next
const saveDuration = () => {
  const hours = parseFloat(durationInput.value);
  if (!isNaN(hours) && hours > 0) {
    flatTaskList.value[currentDurationIndex.value].task.duration = Math.round(hours * 3600000); // ms
    durationInput.value = '';
    currentDurationIndex.value++;
    if (currentDurationIndex.value >= flatTaskList.value.length) {
      enteringDurations.value = false;
      validateDurations();
    }
  }
};

// Validate that all parent tasks with subtasks have durations that match the sum of their subtasks
function validateDurations() {
  reviewErrors.value = [];
  function check(task: Task) {
    if (task.subtasks && task.subtasks.length > 0) {
      const expected = task.duration ?? 0;
      const actual = task.subtasks.reduce((sum, st) => sum + (st.duration ?? 0), 0);
      if (expected !== actual) {
        reviewErrors.value.push({ task, expected, actual });
      }
      for (const st of task.subtasks) check(st);
    }
  }
  for (const t of tasks.value) check(t);
  reviewMode.value = reviewErrors.value.length > 0;
}

// Allow user to fix durations for a specific parent task
const fixParentDurations = (parentTask: Task) => {
  // Prepare a flat list of this parent's subtasks for duration entry
  flatTaskList.value = parentTask.subtasks.map(st => ({ task: st, parent: parentTask }));
  enteringDurations.value = true;
  currentDurationIndex.value = 0;
  durationInput.value = '';
  reviewMode.value = false;
};

</script>

<template>
  <div class="w-full md:w-1/3">
    <div>
      What is your project about?
    </div>
    <div>
      <textarea
        class="w-full h-32 p-2 border border-gray-300 rounded text-slate-300 bg-slate-800"
        placeholder="Describe your project here..."
        v-model="description"
      ></textarea>
    </div>

    <hr />

    <div v-if="addingTasks" class="mt-6">
      <div class="font-semibold mb-2">Enter a task item:</div>
      <input
        class="w-full p-2 border border-gray-300 rounded mb-2 text-slate-300 bg-slate-800"
        v-model="currentTask.text"
        placeholder="Task description"
      />

      <div class="mb-2">
        <div class="font-semibold">Subtasks (optional):</div>
        <SubtaskInput :subtasks="currentTask.subtasks" />
      </div>

      <hr />

      <div class="flex gap-2">
        <button
          class="px-4 py-2 bg-blue-500 text-slate-50 rounded hover:bg-blue-600"
          @click="saveCurrentTask"
        >
          Next Task
        </button>
        <button
          class="px-4 py-2 bg-green-600 text-slate-50 rounded hover:bg-green-700"
          @click="finishTasks"
        >
          I'm Finished
        </button>
      </div>

      <!-- Live preview of tasks as they are added -->
      <div class="mt-6">
        <div class="font-semibold mb-2">Live Preview:</div>
        <div v-if="tasks.length === 0" class="text-gray-400">No tasks yet.</div>
        <div v-else>
          <TaskList :subtasks="tasks" />
        </div>
      </div>
    </div>

    <div v-else-if="enteringDurations" class="mt-6">
      <div class="font-semibold mb-2">
        How many hours will it take to complete this task?
      </div>
      <div class="mb-2">
        <span class="font-semibold ">Task:</span>
        {{ flatTaskList[currentDurationIndex].task.text }}
        <span v-if="flatTaskList[currentDurationIndex].parent">
          <span class="text-gray-400 text-xs">(Subtask of: {{ flatTaskList[currentDurationIndex].parent.text }})</span>
        </span>
      </div>
      <!-- Show the full tree for context -->
      <div class="mb-4 p-2 bg-gray-800 rounded border border-gray-600">
        <TaskPreview
          v-if="flatTaskList[currentDurationIndex].parent"
          :task="flatTaskList[currentDurationIndex].parent"
        />
        <TaskPreview
          v-else
          :task="flatTaskList[currentDurationIndex].task"
        />
      </div>
      <input
        class="w-48 p-2 border border-gray-300 rounded mb-2 text-slate-300 bg-slate-800"
        v-model="durationInput"
        type="number"
        min="0"
        step="0.1"
        placeholder="Hours"
        @keyup.enter="saveDuration"
      />
      <button
        class="ml-2 px-4 py-2 bg-blue-500 text-slate-900 rounded hover:bg-blue-600"
        @click="saveDuration"
      >
        Save
      </button>
    </div>

    <div v-else-if="reviewMode" class="mt-6">
      <div class="font-semibold mb-2 text-red-400">
        Some tasks have subtasks whose durations do not add up to the parent task's duration.
      </div>
      <div v-for="err in reviewErrors" :key="err.task.text" class="mb-4 border border-red-400 p-2 rounded">
        <div>
          <span class="font-semibold">{{ err.task.text }}</span>
          <span class="text-sm text-gray-400">(Expected: {{ (err.expected / 3600000).toFixed(2) }}h, Actual: {{ (err.actual / 3600000).toFixed(2) }}h)</span>
        </div>
        <button
          class="mt-2 px-3 py-1 bg-yellow-500 text-slate-900 rounded hover:bg-yellow-600"
          @click="fixParentDurations(err.task)"
        >
          Edit Subtask Durations
        </button>
      </div>
      <div v-if="reviewErrors.length === 0">
        <span class="text-green-400">All durations are consistent!</span>
      </div>
    </div>

    <div v-else class="mt-6">
      <div class="font-semibold mb-2">Your Tasks:</div>
      <TaskList :subtasks="tasks" />
    </div>
  </div>
</template>
