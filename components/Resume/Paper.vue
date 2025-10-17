<script setup lang="ts">

  type Props = {
    showResume?: boolean
  }
  
  withDefaults(defineProps<Props>(), { showResume: false });
  defineEmits([ 'updateShowResume' ]);

  const { data: jobs } = await useAsyncData('jobs', () =>
    queryCollection('jobs')
      .order('start', 'DESC')   // newest first
      .all()
  );

  const { data: education } = await useAsyncData('education', () =>
    queryCollection('education')
      .order('start', 'DESC')   // newest first
      .all()
  );

  const { data: skills } = await useAsyncData('skills', () =>
    queryCollection('skills')
      .order('platforms', 'DESC')   // newest first
      .all()
  );

  const { data: projects } = await useAsyncData('projects', () =>
    queryCollection('projects')
      // .order('tags', 'DESC')   // newest first
      .all()
  );
</script>

<template>
  <div class="w-full ps-8 pe-4">
    <div class="relative max-w-7xl mx-auto shadow-[0_0_1rem_rgb(0_0_0_/_25%)] bg-zinc-50">
      <div class="absolute top-4 left-4">
        <button
          class="flex items-center gap-2 px-3 py-1.5 bg-zinc-600 hover:bg-zinc-700 text-zinc-100 rounded-md text-sm font-medium transition-colors duration-200"
          @click="$emit('updateShowResume', !showResume)"
        >
          <icon name="mdi:arrow-left" size="1rem" />
          <span>Back</span>
        </button>
      </div>

      <header class="h-64 pt-8 lg:pt-0 flex flex-col md:flex-row items-center bg-zinc-100">
        <div class="h-full flex flex-col justify-center items-center md:basis-2/3 md:flex-none md:border-r-2 border-zinc-200 px-4">
          <div class="flex flex-col gap-4 items-center text-center md:items-start md:text-left">
            <h1 class="uppercase text-3xl md:text-4xl lg:text-6xl tracking-[0.5rem] text-zinc-600 font-thin">
              Brandon Taylor
            </h1>
            <p class="uppercase text-[0.85rem] md:text-[0.9rem] lg:text-[1.25rem] tracking-[0.75rem] text-zinc-500">
              Platform Engineer
            </p>
          </div>
        </div>

        <div class="flex flex-col justify-center items-center text-sm font-thin md:basis-1/3 md:flex-none">
          <table class="border-collapse">
            <tbody>
              <tr>
                <td class="align-middle px-2 py-1 w-7">
                  <div class="flex items-center justify-center">
                    <icon name="mdi:at" class="h-5 w-5 inline-block leading-none" />
                  </div>
                </td>

                <td class="align-middle px-2 py-1">
                  <div class="flex items-center gap-2">
                    <span>hello@brandontaylor.dev</span>
                  </div>
                </td>
              </tr>

              <tr>
                <td class="align-middle px-2 py-1 w-7">
                  <div class="flex items-center justify-center">
                    <icon name="mdi:web" class="h-5 w-5 inline-block leading-none" />
                  </div>
                </td>

                <td class="align-middle px-2 py-1">
                  <div class="flex items-center gap-2">
                    <span>
                      <a href="https://www.brandontaylor.dev/" class="underline hover:opacity-80">
                        https://www.brandontaylor.dev
                      </a>
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

        </div>
      </header>

      <section class="bg-zinc-50">
        <div class="flex flex-col md:flex-row">
          <div class="flex flex-col md:basis-2/3 md:border-r-2 md:border-zinc-200">
            <div class="border-b-2 border-zinc-200 w-full text-center py-4">
              <h2 class="text-2xl uppercase tracking-[0.5rem]">Work Experience</h2>
            </div>

            <section class="relative w-full p-4">
              <div class="absolute top-8 left-8 top-0 h-[calc(100%-4rem)] w-px bg-gray-400"></div>

              <article
                class="relative pl-8 pb-8 last:pb-0"
                v-for="job in jobs"
                :key="job.id"
              >
                <span class="absolute left-4 -translate-x-1/2 top-1.5 inline-flex h-3 w-3 items-center justify-center">
                  <span class="h-3 w-3 bg-zinc-700"></span>
                </span>

                <div>
                  <div>
                    <span class="font-bold text-zinc-700">
                      {{ job.title }}
                    </span>
                  </div>

                  <div>
                    <span>
                      {{ job.company }}
                    </span>
                  </div>

                  <div>
                    <span class="text-sm font-thin">
                      <time :datetime="job.start">{{ new Date(job.start).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) }}</time>
                      &ndash; <time :datetimte="job.end ?? 'Present'">{{ job.end ? new Date(job.end).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : 'Present' }}</time>
                    </span>
                  </div>

                  <div>
                    <ul class="list-disc list-inside font-thin text-sm">
                      <li class="py-px first:pt-0 last:pb-0" v-for="(b, i) in job.bullets" :key="i">{{ b }}</li>
                    </ul>
                  </div>
                </div>
              </article>
            </section>
          </div>

          <div class="md:basis-1/3 md:flex-none">
            <section class="relative w-full">
              <div class="border-b-2 border-zinc-200 w-full text-center py-4 mb-4">
                <h2 class="text-2xl uppercase tracking-[0.5rem]">Education</h2>
              </div>

              <article
                class="pl-4 pb-8"
                v-for="edu in education"
                :key="edu.id"
              >
                <div>
                  <span class="font-bold text-zinc-700">
                    {{ edu.degree }}
                  </span>
                </div>

                <div>
                  <span class="text-sm">
                    {{ edu.institution }}
                  </span>
                </div>

                <div>
                  <span class="text-zinc-700 whitespace-nowrap tabular-nums font-thin text-sm">
                    <time :datetime="edu.start">{{ new Date(edu.start).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) }}</time>
                    &ndash; <time :datetime="edu.end ?? 'Present'">{{ edu.end ? new Date(edu.end).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : 'Present' }}</time>
                  </span>
                </div>

                  <div>
                  <span class="text-zinc-700 font-thin text-sm">
                    GPA {{ edu.gpa }}
                  </span>
                </div>
              </article>
            </section>

            <section class="relative w-full">
              <div class="border-y-2 border-zinc-200 w-full text-center py-4 mb-4">
                <h2 class="text-2xl uppercase tracking-[0.5rem]">Skills</h2>
              </div>

              <article
                class="pl-4 pb-8"
                v-for="skill in skills"
                :key="skill.id"
              >
                <div>
                  <h3 class="text-2xl text-zinc-700 tracking-widest">Platforms</h3>
                </div>
                
                <div>
                  <ul class="list-disc list-inside font-thin text-zinc-700 text-sm">
                    <li v-for="(b, i) in skill.platforms" :key="i">{{ b }}</li>
                  </ul>
                </div>
              </article>

              <article
                class="pl-4 pb-8"
                v-for="skill in skills"
                :key="skill.id"
              >
                <div>
                  <h3 class="text-2xl text-zinc-700 tracking-widest">Languages</h3>
                </div>
                
                <div>
                  <ul class="list-disc list-inside font-thin text-zinc-700 text-sm">
                    <li v-for="(b, i) in skill.languages" :key="i">{{ b }}</li>
                  </ul>
                </div>
              </article>

              <article
                class="pl-4 pb-8"
                v-for="skill in skills"
                :key="skill.id"
              >
                <div>
                  <h3 class="text-2xl text-zinc-700 tracking-widest">Frameworks</h3>
                </div>
                
                <div>
                  <ul class="list-disc list-inside font-thin text-zinc-700 text-sm">
                    <li v-for="(b, i) in skill.frameworks" :key="i">{{ b }}</li>
                  </ul>
                </div>
              </article>

              <article
                class="pl-4 pb-8"
                v-for="skill in skills"
                :key="skill.id"
              >
                <div>
                  <h3 class="text-2xl text-zinc-700 tracking-widest">Other</h3>
                </div>

                <div>
                  <ul class="list-disc list-inside font-thin text-zinc-700 text-sm">
                    <li v-for="(b, i) in skill.other" :key="i">{{ b }}</li>
                  </ul>
                </div>
              </article>
            </section>

            <section class="relative w-full">
              <div class="border-y-2 border-zinc-200 w-full text-center py-4 mb-4">
                <h2 class="text-2xl uppercase tracking-[0.5rem]">Projects</h2>
              </div>

              <article
                class="pl-4 pb-8"
                v-for="proj in projects"
                :key="proj.id"
              >
                <div>
                  <h3 class="text-2xl text-zinc-700 tracking-widest">{{ proj.name }}</h3>
                </div>
                
                <div>
                  <span class="font-thin tracking-widest text-xs italic text-zinc-700">
                    {{ (proj.tags ?? []).join(' | ').toString() }}
                  </span>
                </div>

                <div>
                  <span class="font-thin text-zinc-700">
                    {{ proj.description }}
                  </span>
                </div>
              </article>
            </section>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
