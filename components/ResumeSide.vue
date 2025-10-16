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
  <rail-side class="relative bg-zinc-200 text-zinc-900">

    <!-- padding helper. -->
    <div class="w-full ps-8 pe-4">

      <!-- shadow wrapper to simulate page design -->
      <div class="relative max-w-7xl mx-auto shadow-[0_0_1rem_rgb(0_0_0_/_25%)] bg-zinc-50">

        <!-- go back button -->
        <button
          class="absolute top-4 right-4 p-2 flex justify-center items-center text-zinc-900 rounded-full"
          @click="$emit('updateShowResume', !showResume)"
        >
          <icon name="mdi:close" size="1.75rem" />
        </button>

        <!-- header -->
        <header class="h-64 flex flex-col md:flex-row items-center bg-zinc-100">

          <!-- name/title (2/3) -->
          <div class="h-full flex flex-col justify-center items-center md:basis-2/3 md:flex-none md:border-r-2 border-zinc-200">

            <div class="flex flex-col gap-4">
              <h1 class="uppercase text-3xl md:text-4xl lg:text-6xl max-w-[8ch] tracking-[0.5rem] text-zinc-600 font-thin">
                Brandon Taylor
              </h1>
              <p class="uppercase text-[0.85rem] md:text-[0.9rem] lg:text-[1.25rem] tracking-[0.75rem] text-zinc-500">
                Platform Engineer
              </p>
            </div>
          </div>

          <!-- meta info (1/3) -->
          <div class="flex flex-col justify-center items-center text-sm font-thin md:basis-1/3 md:flex-none">
            <table>
              <tbody>
                <tr>
                  <td class="px-1 py-2"><email-icon /></td>
                  <td class="px-1 py-2"><span>hello@brandontaylor.dev</span></td>
                </tr>
                <tr>
                  <td class="px-1 py-2"><globe-icon /></td>
                  <td class="px-1 py-2"><span><a href="https://www.brandontaylor.dev/">https://www.brandontaylor.dev</a></span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </header>

        <!-- resume -->
        <section class="bg-zinc-50">

          <!-- columns -->
          <div class="flex flex-col md:flex-row">

            <!-- work experience column (2/3) -->
            <div class="flex flex-col md:basis-2/3 md:border-r-2 md:border-zinc-200">
              <div class="border-b-2 border-zinc-200 w-full text-center py-4">
                <h2 class="text-2xl uppercase tracking-[0.5rem]">Work Experience</h2>
              </div>

              <!-- job section -->
              <section class="relative w-full p-4">

                <!-- timeline line -->
                <div class="absolute top-8 left-8 top-0 h-[calc(100%-4rem)] w-px bg-gray-400"></div>

                <!-- timeline item -->
                <article
                  class="relative pl-8 pb-8 last:pb-0"
                  v-for="job in jobs"
                  :key="job.id"
                >

                  <!-- dot -->
                  <span class="absolute left-4 -translate-x-1/2 top-1.5 inline-flex h-3 w-3 items-center justify-center">
                    <span class="h-3 w-3 bg-zinc-700"></span>
                  </span>

                  <!-- content -->
                  <div>
                    <!-- title -->
                    <div>
                      <span class="font-bold text-zinc-700">
                        {{ job.title }}
                      </span>
                    </div>

                    <!-- company -->
                    <div>
                      <span>
                        {{ job.company }}
                      </span>
                    </div>

                    <!-- date/time -->
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

            <!-- everything else (1/3) -->
            <div class="md:basis-1/3 md:flex-none">
              
              <!-- education section -->
              <section class="relative w-full">
                <div class="border-b-2 border-zinc-200 w-full text-center py-4 mb-4">
                  <h2 class="text-2xl uppercase tracking-[0.5rem]">Education</h2>
                </div>

                <article
                  class="pl-4 pb-8"
                  v-for="edu in education"
                  :key="edu.id"
                >
                  <!-- degree -->
                  <div>
                    <span class="font-bold text-zinc-700">
                      {{ edu.degree }}
                    </span>
                  </div>

                  <!-- institution -->
                  <div>
                    <span class="text-sm">
                      {{ edu.institution }}
                    </span>
                  </div>

                  <!-- date/time -->
                  <div>
                    <span class="text-zinc-700 whitespace-nowrap tabular-nums font-thin text-sm">
                      <time :datetime="edu.start">{{ new Date(edu.start).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) }}</time>
                      &ndash; <time :datetime="edu.end ?? 'Present'">{{ edu.end ? new Date(edu.end).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : 'Present' }}</time>
                    </span>
                  </div>

                  <!-- gpa -->
                   <div>
                    <span class="text-zinc-700 font-thin text-sm">
                      GPA {{ edu.gpa }}
                    </span>
                  </div>
                </article>
              </section>

              <!-- skills section -->
              <section class="relative w-full">
                <div class="border-y-2 border-zinc-200 w-full text-center py-4 mb-4">
                  <h2 class="text-2xl uppercase tracking-[0.5rem]">Skills</h2>
                </div>

                <!-- platforms -->
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

                <!-- languages -->
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

                <!-- frameworks -->
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

                <!-- other -->
                <article
                  class="pl-4 pb-8"
                  v-for="skill in skills"
                  :key="skill.id"
                >
                  <div>
                    <h3 class="text-2xl text-zinc-700 tracking-widest">Other</h3>
                  </div>

                  <!-- platform names -->
                  <div>
                    <ul class="list-disc list-inside font-thin text-zinc-700 text-sm">
                      <li v-for="(b, i) in skill.other" :key="i">{{ b }}</li>
                    </ul>
                  </div>
                </article>
              </section>

              <!-- projects section -->
              <section class="relative w-full">
                <div class="border-y-2 border-zinc-200 w-full text-center py-4 mb-4">
                  <h2 class="text-2xl uppercase tracking-[0.5rem]">Projects</h2>
                </div>

                <!-- projects -->
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
  </rail-side>
</template>
