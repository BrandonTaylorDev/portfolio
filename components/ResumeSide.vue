<script setup lang="ts">
  const { data: jobs } = await useAsyncData('jobs', () =>
    queryCollection('jobs')
      .order('start', 'DESC')   // newest first
      .all()
  );
</script>

<template>
  <section class="min-h-screen min-w-screen bg-zinc-50 text-zinc-900 flex-1 py-8">

    <!-- padding helper. -->
    <div class="h-full w-full ps-8 pe-4">

      <!-- shadow wrapper to simulate page design -->
      <div class="h-full max-w-7xl mx-auto shadow">

        <!-- header -->
        <header class="h-64 bg-zinc-100 flex flex-col md:flex-row items-center">
          <!-- name/title (2/3) -->
          <div class="h-full flex flex-col justify-center items-center md:basis-2/3 md:flex-none md:border-r-2 border-zinc-200">
            <div class="flex flex-col gap-4">
              <h1 class="uppercase text-3xl md:text-4xl lg:text-6xl max-w-[8ch] tracking-[0.5rem] text-zinc-600 font-light">
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
        <section>

          <!-- columns -->
          <div class="flex flex-col md:flex-row">

            <!-- work experience column (2/3) -->
            <div class="flex flex-col justify-center items-center md:basis-2/3 md:flex-none md:border-r-2 md:border-zinc-200">
              <div class="border-b-2 border-zinc-200 w-full text-center py-4">
                <h2 class="text-2xl uppercase tracking-[0.5rem]">Work Experience</h2>
              </div>

              <!-- job entries section -->
              <section class="relative w-full">

                <!-- timeline line -->
                <div class="absolute left-4 top-0 h-full w-px bg-gray-400"></div>

                <!-- timeline item -->
                <article
                  class="relative pl-8 pb-8 last:pb-0"
                  v-for="job in jobs"
                  :key="job.id"
                >

                  <!-- dot -->
                  <span class="absolute left-4 -translate-x-1/2 top-1.5 inline-flex h-3 w-3 items-center justify-center">
                    <span class="h-3 w-3 bg-black dark:bg-gray-900"></span>
                  </span>

                  <!-- content (your original block) -->
                  <div>
                    <!-- title -->
                    <div>
                      <span class="font-bold">
                        {{ job.title }}
                      </span>
                    </div>

                    <!-- company -->
                    <div>
                      <span class="font-light">
                        {{ job.company }}
                      </span>
                    </div>

                    <!-- date/time -->
                    <div>
                      <span>
                        {{ new Date(job.start).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) }}
                        - {{ job.end ? new Date(job.end).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : 'Present' }}
                      </span>
                    </div>

                    <div>
                      <ul class="list-disc list-inside font-light">
                        <li v-for="(b, i) in job.bullets" :key="i">{{ b }}</li>
                      </ul>
                    </div>
                  </div>
                </article>
                
              </section>

            </div>

            <!-- everything else (1/3) -->
            <div class="md:basis-1/3 md:flex-none">
              <div class="border-b-2 border-zinc-200 w-full text-center py-4">
                <h2 class="text-2xl uppercase tracking-[0.5rem]">Education</h2>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>
