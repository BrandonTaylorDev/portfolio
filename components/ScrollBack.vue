<script setup lang="ts">
const scrollBack = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const debounce = useDebounce();
const showScrollBack = ref(false);

onMounted(() => {
  document.addEventListener(
    "scroll",
    debounce(() => {
      showScrollBack.value = window.scrollY > 300;
    }, 5),
  );
});
</script>

<template>
  <div
    :class="[
      'fixed bottom-4 right-4 flex flex-col gap-2 pointer-events-none md:hidden duration-200',
      showScrollBack ? 'opacity-100' : 'opacity-0',
    ]"
  >
    <div
      class="rounded-full bg-teal-800 hover:bg-teal-700 duration-200 border-2 border-teal-400 text-teal-400 p-2 pointer-events-auto cursor-pointer"
      @click="scrollBack"
    >
      <icon name="mdi:chevron-up" size="3em" />
    </div>
  </div>
</template>
