<script setup lang="ts">
type Props = {
  modelValue?: boolean;
};
const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
});
const emits = defineEmits(["update:modelValue"]);

const close = () => {
  emits("update:modelValue", false);
};
</script>

<template>
  <aside
    :class="[
      'fixed z-50 w-full h-full top-0 p-4 md:p-8 2xl:p-16 left-0 duration-500 ease-in-out',
      props.modelValue
        ? 'translate-y-0 opacity-100'
        : 'translate-y-full opacity-0',
    ]"
    @click.self="close"
  >
    <div
      class="w-full max-w-3xl max-h-dvh mx-auto overflow-y-auto bg-gray-50 dark:bg-gray-800 shadow rounded-xl"
    >
      <div class="text-right p-2">
        <button @click="close">
          <icon name="mdi:close" size="2em" />
        </button>
      </div>

      <div class="p-4 md:p-8 md:pt-0 flex flex-col justify-start gap-8">
        <div
          class="flex flex-col justify-center md:justify-start items-center gap-4"
        >
          <nuxt-img src="/mongodb.png" class="w-fit max-w-20" />
          <span class="text-4xl"> MongoDB </span>
        </div>

        <hr />

        <div class="flex flex-col gap-4 leading-6">
          <p>
            My journey with MongoDB began in 2014 when my love / hate
            relationship with SQL came to a head. I tried different SQL
            providers, such as: MSSQL, MySQL, and PostgreSQL. But I found that
            the more relational systems I used, the more restricted I felt. I
            sought a system that allowed for complex data storage but also
            permitted the flexibility of JSON. That is when a former colleague
            of mine mentioned the term "NoSQL."
          </p>

          <p>
            I haven't looked back. MongoDB has empowered me to build
            applications without sacrificing simplicity for the fullstack. From
            personal projects, to
            <hyperlink href="https://lightchange.com/certhunter"
              >MSP service offerings</hyperlink
            >, I have incorporated this product wherever appropriate.
          </p>
        </div>
      </div>
    </div>
  </aside>
</template>
