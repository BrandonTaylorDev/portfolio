<script setup lang="ts">
  const emit = defineEmits([ 'click:kubernetes' ])
</script>

<template>
  <section class="flex flex-col gap-4 max-w-xl mx-auto lg:max-w-full lg:mx-0 lg:border-l-4 lg:border-slate-500 dark:lg:border-teal-600 text-xl md:text-lg">
    <span class="sticky top-0 text-xl text-slate-900 dark:text-slate-200 backdrop-filter backdrop-blur-sm bg-slate-100/50 dark:bg-slate-900/50 px-8 py-4">
      A Little About Me
    </span>
    <div class="px-8">
      <p>
        Throughout my career, I have had the opportunity to assume diverse roles encompassing a broad spectrum of responsibilities.
        It began in 2014 when I started as a <span class="italic">Network Analyst</span> at a <hyperlink href="https://trace3.com">NOC</hyperlink>.
        Subsequently, I transitioned to the position of <span class="italic">Manager of Support Services</span> at a <hyperlink href="https://ius.edu">statewide University</hyperlink>.
        In 2022, I assumed the role of <span class="italic">Technology Solutions Engineer</span> and was quickly promoted to <span class="italic">Cloud Architect and Senior DevOps Engineer</span>
        at a <hyperlink href="https://trace3.com">managed service provider</hyperlink> that is poised for expansion into the DevOps sector.
      </p>

      <p>
        Being a developer, I stay curious. I strive for knowledge, and seek new and exciting ways in which I can grow. Today, I often find myself working
        in high reslience environments, such as <hyperlink @click="emit('click:kubernetes')">Kubernetes</hyperlink> and cloud data
        storage solutions, such as <hyperlink href="https://www.haproxy.org/">MongoDB Atlas</hyperlink> or <hyperlink href="https://azure.microsoft.com/en-us/products/cosmos-db">Azure Cosmos DB</hyperlink>.
        I also often lead the charge in implementing reliable disaster recovery technologies, such as <hyperlink href="https://veeam.com">Veeam</hyperlink>.
      </p>

      <p>
        When I don't have my head stuck in the clouds, however, I enjoy camping under the stars, and spending time with my wife and our daughter.
      </p>
    </div>
  </section>
</template>
