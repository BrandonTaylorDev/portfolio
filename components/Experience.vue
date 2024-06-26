<script setup lang="ts">
  const experience = ref([
    {
      timeframe: 'Jul 2022 - Present',
      title: 'Cloud Architect and Senior DevOps Engineer',
      company: 'LightChange Technologies',
      link: 'https://lightchange.com',
      description: [
        'Led organizational effort to grow our DevOps and Cloud Architecture offerings.',
        'Directed seamless implementation of high resiliency environments, enhancing system and application performance to 99.999% uptime.',
        'Orchestrated no downtime migration of legacy systems to high resilience environments.',
        'Planned and developed MSP-powering technology by leveraging Nuxt 3, Tailwind, MongoDB, and RabbitMQ.'
      ],
      tags: [
        'Azure',
        'Kubernetes',
        'Cloud Architecture',
        'Nagios',
        'Full-Stack DevOps',
        'CI/CD',
        'Vue.js',
        'Nuxt',
        '.NET'
      ]
    },
    {
      timeframe: 'Apr 2021 - Jul 2022',
      title: 'Manager of Support Services',
      company: 'Indiana University',
      link: 'https://ius.edu',
      description: [
        'Led team efforts to revolutionize ticket resolution strategies, resulting in a 52% reduction in ticket resolution time.',
        'Achieved a historical low support request time-to-close of 2 minutes and 34 seconds.',
        'Hired and mentored part time staff, leading to a 43% increase in employee retention.',
        'Orchestrated annual computer sales that reclaimed thousands of dollars in revenue, which allowed for equipment refreshment.'
      ],
      tags: [
        'Leadersgip',
        'Auditing',
        'Project Management',
        'Polycom Telephony',
        'SCCM / Jamf'
      ]
    },
    {
      timeframe: 'Nov 2016 - Apr 2021',
      title: 'Senior IT Technician / Project Manager',
      company: 'Indiana University',
      link: 'https://ius.edu',
      description: [
        'Introduced the upgrade of software that reduced the ecological footprint of the university\'s electric by 10-20%.',
        'Performed regular device imaging throughout classroom devices to improve user experience, which resulted in a reduction of performance-related tickets by ~70%.',
        'Introduced and reviewed device policies that cut printer-related support requests by 50%.'
      ],
      tags: [
        'Team Management',
        'IT Support',
        'Project Management',
      ]
    },
    {
      timeframe: 'Aug 2014 - Nov 2016',
      title: 'Network Analyst',
      company: 'Trace3 (formally Data Strategy)',
      link: 'https://trace3.com',
      description: [
        'Spearhearded the upkeep of internal systems which eliminiated internal support requests entirely.',
        'Monitored and analyzed customer systems and prevented four disaster-level events.',
        'Performed onsite services, such as the replacement of UPS batteries, and rerouting the cabling for networking closets.'
      ],
      tags: [
        'Network Monitoring',
        'Performance Optimization',
        'Cisco UCM',
        
      ]
    }
  ])
</script>

<template>
  <section class="flex flex-col gap-4 mt-8 px-8 lg:border-l-4 lg:border-slate-500 dark:lg:border-teal-600 text-xl md:text-lg">
    <span class="text-xl text-slate-900 dark:text-slate-200">
      Highlights of my Career
    </span>

    <div class="flex flex-col gap-12">
      <div class="wrap flex flex-col 2xl:flex-row" v-for="(exp, i) in experience" :key="i">

        <!-- timeframe -->
        <div class="timeframe whitespace-nowrap shrink-1 min-w-32 text-sm">
          <span>
            {{ exp.timeframe }}
          </span>
        </div>

        <!-- description -->
        <div class="description flex flex-col gap-2 flex-1 2xl:ps-16 transition-[padding 5s ease]">
          <div class="flex flex-col">
            <a :href="exp.link" class="text-lg text-slate-700 dark:text-slate-200">
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
            <li class="flex items-center rounded-full bg-teal-400 dark:bg-teal-400/10 text-teal-50 dark:text-teal-500 px-3 py-1 text-xs font-medium leading-" v-for="t in exp.tags" :key="t">
              {{ t }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

