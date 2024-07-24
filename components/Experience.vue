<script setup lang="ts">
const experience = ref([
  {
    timeframe: "Jul 2022 - Present",
    title: "Cloud Architect, Lead DevOps Engineer",
    company: "LightChange Technologies",
    link: "https://lightchange.com",
    description: [
      "Led organizational effort to grow our DevOps and Cloud Architecture offerings.",
      "Directed seamless implementation of high resilience environments, enhancing system and application performance to 99.999% uptime.",
      "Planned and developed MSP-powering technology by harnessing Nuxt 3, Tailwind, MongoDB, and RabbitMQ.",
      "Orchestrated zero-downtime migration of legacy systems to high resilience environments.",
      "Leveraged Kubernetes to empower client growth, streamlined performance, and reduced budget expenditure by 45%.",
    ],
    tags: [
      "Azure",
      "Azure DevOps",
      "Kubernetes",
      "CI/CD",
      "Cloud Architecture",
      "Nagios",
      "Vue / Nuxt.js",
      "React / Next.js",
      "Angular.js",
      "MongoDB",
    ],
  },
  {
    timeframe: "Apr 2021 - Jul 2022",
    title: "Manager of Support Services",
    company: "Indiana University",
    link: "https://ius.edu",
    description: [
      "Developed widely-used application that integrated and extended an existing inventory system to subsidize several missing features, such as duplicate detection.",
      "Led team efforts to revolutionize ticket resolution strategies, resulting in a 52% reduction in ticket resolution time.",
      "Achieved a historical low support request time-to-close of 2 minutes and 34 seconds.",
      "Hired and mentored part time staff, leading to a 43% increase in employee retention.",
      "Orchestrated annual computer sales that reclaimed thousands of dollars in revenue, which allowed for equipment refreshment.",
    ],
    tags: [
      "Leadership",
      "Compliance Auditing",
      "Project Management",
      "Polycom Telephony",
      "SCCM / Jamf",
      "Windows Server",
      "Ubuntu",
      "Red Hat",
      "Frontend Design",
      "JavaScript",
      "Python",
      "Go",
    ],
  },
  {
    timeframe: "Nov 2016 - Apr 2021",
    title: "Senior IT Technician / Project Manager",
    company: "Indiana University",
    link: "https://ius.edu",
    description: [
      "Invented novel software that interacts with SCCM to automate device lifecycle management and department-based software compliance.",
      "Leveraged automation technologies to improve the efficiency of student devices.",
      "Introduced the upgrade of software that reduced the ecological footprint of the university's electric by 10-20%.",
      "Performed regular device imaging throughout classrooms to improve user experience, which resulted in a reduction of performance-related tickets by ~70%.",
      "Introduced and reviewed device policies that cut printer-related support requests by 50%.",
    ],
    tags: [
      "Python",
      "Go",
      "Team Management",
      "IT Support",
      "Project Management",
      "Audio/Visual",
      "Extron/Crestron",
    ],
  },
  {
    timeframe: "Aug 2014 - Nov 2016",
    title: "Network Analyst",
    company: "Trace3 (formally Data Strategy)",
    link: "https://trace3.com",
    description: [
      "Wrote software leveraging Go and Batch scripting to automate system cloning, directly integrating with Active Directory.",
      "Spearhearded the upkeep of internal systems which eliminiated internal support requests entirely.",
      "Monitored and analyzed customer systems and prevented four disaster-level events.",
      "Performed onsite services, such as the replacement of UPS batteries, and rerouting cabling for networking closets.",
    ],
    tags: [
      "Go",
      "Network Monitoring",
      "Streamline Infrastructure",
      "Cisco UCM",
      "Disaster Recovery",
    ],
  },
]);
</script>

<template>
  <section
    class="flex flex-col gap-4 mt-8 max-w-xl mx-auto lg:max-w-full lg:mx-0 lg:border-l-4 lg:border-slate-500 dark:lg:border-teal-600 text-xl md:text-lg"
  >
    <span
      class="sticky top-0 text-xl text-slate-900 dark:text-slate-200 backdrop-filter backdrop-blur-sm bg-slate-100/50 dark:bg-slate-900/50 px-8 py-4"
    >
      Highlights of my Career
    </span>

    <div class="flex flex-col gap-12 px-8">
      <div
        class="wrap flex flex-col 2xl:flex-row"
        v-for="(exp, i) in experience"
        :key="i"
      >
        <!-- timeframe -->
        <div class="timeframe whitespace-nowrap shrink-1 min-w-32 text-sm">
          <span>
            {{ exp.timeframe }}
          </span>
        </div>

        <!-- description -->
        <div
          class="description flex flex-col gap-2 flex-1 2xl:ps-16 transition-[padding 5s ease]"
        >
          <div class="flex flex-col">
            <a
              :href="exp.link"
              class="text-lg text-slate-700 dark:text-slate-200"
            >
              {{ exp.title }}
            </a>

            <span class="text-sm text-slate-500 dark:text-slate-400 italic">
              {{ exp.company }}
            </span>
          </div>

          <ul class="list-decimal ms-4">
            <li v-for="d in exp.description" :key="d">
              {{ d }}
            </li>
          </ul>

          <ul class="flex flex-wrap gap-2">
            <li
              class="select-none flex items-center rounded-full bg-teal-500 hover:bg-teal-600 dark:bg-teal-500/10 hover:dark:bg-teal-500/50 text-teal-50 dark:text-teal-500 hover:dark:text-teal-300 dark:border-2 dark:border-teal-800 transition-colors duration-200 cursor-pointer px-3 py-1 text-xs font-medium leading-"
              v-for="t in exp.tags"
              :key="t"
            >
              {{ t }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
