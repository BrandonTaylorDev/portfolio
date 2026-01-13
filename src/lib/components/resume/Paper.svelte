<script lang="ts">
  import { formatLocalMonthYear } from '$lib/utils/date';
  import { jobs } from '$lib/data/jobs';
  import { education } from '$lib/data/education';
  import { skills } from '$lib/data/skills';
  import { projects } from '$lib/data/projects';

  let { showResume = false, onUpdateShowResume } = $props();
</script>

<div class="w-full px-4 py-8">
  <div class="relative max-w-7xl mx-auto shadow-[0_0_1rem_rgb(0_0_0/25%)] bg-zinc-50 dark:bg-zinc-900 transform-colors duration-500">
    <div class="absolute top-4 left-4">
      <button
        class="flex items-center gap-2 px-3 py-1.5 bg-zinc-600 hover:bg-zinc-700 text-zinc-100 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer"
        onclick={() => onUpdateShowResume?.(!showResume)}
      >
        <svg class="w-4 h-4" viewBox="0 0 24 24">
          <path fill="currentColor" d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
        </svg>
        <span>Back</span>
      </button>
    </div>

    <header class="h-64 pt-8 lg:pt-0 flex flex-col md:flex-row items-center bg-zinc-100 dark:bg-zinc-800 transform-colors duration-500">
      <div class="h-full flex flex-col justify-center items-center md:basis-2/3 md:flex-none md:border-r-2 border-zinc-200 dark:border-zinc-600 px-4 transform-colors duration-500">
        <div class="flex flex-col gap-4 items-center text-center md:items-start md:text-left">
          <h1 class="uppercase text-3xl md:text-4xl lg:text-6xl tracking-[0.5rem] text-zinc-700 dark:text-zinc-100 font-thin">
            Brandon Taylor
          </h1>
          <p class="uppercase text-[0.85rem] md:text-[0.9rem] lg:text-[1.25rem] tracking-[0.75rem] text-zinc-600 dark:text-zinc-200">
            Platform Engineer
          </p>
        </div>
      </div>

      <div class="flex flex-col justify-center items-center text-sm md:basis-1/3 md:flex-none text-zinc-700 dark:text-zinc-200">
        <table class="border-collapse">
          <tbody>
            <tr>
              <td class="align-middle px-2 py-1 w-7">
                <div class="flex items-center justify-center">
                  <svg class="h-5 w-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12,15C12.81,15 13.5,14.7 14.11,14.11C14.7,13.5 15,12.81 15,12C15,11.19 14.7,10.5 14.11,9.89C13.5,9.3 12.81,9 12,9C11.19,9 10.5,9.3 9.89,9.89C9.3,10.5 9,11.19 9,12C9,12.81 9.3,13.5 9.89,14.11C10.5,14.7 11.19,15 12,15M12,2C14.75,2 17.1,3 19.05,4.95C21,6.9 22,9.25 22,12V13.45C22,14.45 21.65,15.3 21,16C20.3,16.67 19.5,17 18.5,17C17.3,17 16.31,16.5 15.56,15.5C14.56,16.5 13.38,17 12,17C10.63,17 9.45,16.5 8.46,15.54C7.5,14.55 7,13.38 7,12C7,10.63 7.5,9.45 8.46,8.46C9.45,7.5 10.63,7 12,7C13.38,7 14.55,7.5 15.54,8.46C16.5,9.45 17,10.63 17,12V13.45C17,13.86 17.16,14.22 17.46,14.53C17.76,14.84 18.11,15 18.5,15C18.92,15 19.27,14.84 19.57,14.53C19.87,14.22 20,13.86 20,13.45V12C20,9.81 19.23,7.93 17.65,6.35C16.07,4.77 14.19,4 12,4C9.81,4 7.93,4.77 6.35,6.35C4.77,7.93 4,9.81 4,12C4,14.19 4.77,16.07 6.35,17.65C7.93,19.23 9.81,20 12,20H17V22H12C9.25,22 6.9,21 4.95,19.05C3,17.1 2,14.75 2,12C2,9.25 3,6.9 4.95,4.95C6.9,3 9.25,2 12,2Z" />
                  </svg>
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
                  <svg class="h-5 w-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M16.36,14C16.44,13.34 16.5,12.68 16.5,12C16.5,11.32 16.44,10.66 16.36,10H19.74C19.9,10.64 20,11.31 20,12C20,12.69 19.9,13.36 19.74,14M14.59,19.56C15.19,18.45 15.65,17.25 15.97,16H18.92C17.96,17.65 16.43,18.93 14.59,19.56M14.34,14H9.66C9.56,13.34 9.5,12.68 9.5,12C9.5,11.32 9.56,10.65 9.66,10H14.34C14.43,10.65 14.5,11.32 14.5,12C14.5,12.68 14.43,13.34 14.34,14M12,19.96C11.17,18.76 10.5,17.43 10.09,16H13.91C13.5,17.43 12.83,18.76 12,19.96M8,8H5.08C6.03,6.34 7.57,5.06 9.4,4.44C8.8,5.55 8.35,6.75 8,8M5.08,16H8C8.35,17.25 8.8,18.45 9.4,19.56C7.57,18.93 6.03,17.65 5.08,16M4.26,14C4.1,13.36 4,12.69 4,12C4,11.31 4.1,10.64 4.26,10H7.64C7.56,10.66 7.5,11.32 7.5,12C7.5,12.68 7.56,13.34 7.64,14M12,4.03C12.83,5.23 13.5,6.57 13.91,8H10.09C10.5,6.57 11.17,5.23 12,4.03M18.92,8H15.97C15.65,6.75 15.19,5.55 14.59,4.44C16.43,5.07 17.96,6.34 18.92,8M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                  </svg>
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

    <section>
      <div class="flex flex-col md:flex-row">
        <div class="flex flex-col md:basis-2/3 md:border-r-2 md:border-zinc-200 md:dark:border-zinc-600 transition-colors duration-500">
          <div class="border-b-2 border-zinc-200 dark:border-zinc-600 w-full text-center py-4 transform-colors duration-500">
            <h2 class="text-2xl uppercase tracking-[0.5rem] text-zinc-800 dark:text-zinc-100 font-medium">Work Experience</h2>
          </div>

          <section class="relative w-full p-4">
            <div class="absolute top-0 left-8 h-[calc(100%-4rem)] w-px bg-gray-400 transition-colors duration-500"></div>

            {#each jobs as job}
              <article class="relative pl-8 pb-8 last:pb-0">
                <span class="absolute left-4 -translate-x-1/2 top-1.5 inline-flex h-3 w-3 items-center justify-center">
                  <span class="h-3 w-3 bg-zinc-600 dark:bg-zinc-300"></span>
                </span>

                <div>
                  <div>
                    <span class="font-bold text-zinc-800 dark:text-zinc-100">
                      {job.title}
                    </span>
                  </div>

                  <div>
                    <span class="text-zinc-700 dark:text-zinc-200 font-medium">{job.company}</span>
                  </div>

                  <div>
                    <span class="text-sm text-zinc-600 dark:text-zinc-300">
                      <time datetime={job.start}>{formatLocalMonthYear(job.start)}</time>
                      – <time datetime={job.end ?? 'Present'}>{job.end ? formatLocalMonthYear(job.end) : 'Present'}</time>
                    </span>
                  </div>

                  <div class="text-zinc-700 dark:text-zinc-300">
                    <ul class="list-disc list-inside text-sm leading-relaxed">
                      {#each job.bullets as bullet}
                        <li class="py-1 first:pt-0 last:pb-0">{bullet}</li>
                      {/each}
                    </ul>
                  </div>
                </div>
              </article>
            {/each}
          </section>
        </div>

        <div class="md:basis-1/3 md:flex-none">
          <section class="relative w-full">
            <div class="border-b-2 border-zinc-200 dark:border-zinc-600 w-full text-center py-4 mb-4 transform-colors duration-500">
              <h2 class="text-2xl uppercase tracking-[0.5rem] text-zinc-800 dark:text-zinc-100 font-medium">Education</h2>
            </div>

            {#each education as edu}
              <article class="pl-4 pb-8">
                <div>
                  <span class="font-bold text-zinc-800 dark:text-zinc-100">
                    {edu.degree}
                  </span>
                </div>

                <div>
                  <span class="text-sm text-zinc-700 dark:text-zinc-200">{edu.institution}</span>
                </div>

                <div>
                  <span class="text-zinc-600 dark:text-zinc-300 whitespace-nowrap tabular-nums text-sm">
                    <time datetime={edu.start}>{formatLocalMonthYear(edu.start)}</time>
                    – <time datetime={edu.end ?? 'Present'}>{edu.end ? formatLocalMonthYear(edu.end) : 'Present'}</time>
                  </span>
                </div>

                <div>
                  <span class="text-zinc-600 dark:text-zinc-300 text-sm">
                    GPA {edu.gpa}
                  </span>
                </div>
              </article>
            {/each}
          </section>

          <section class="relative w-full">
            <div class="border-y-2 border-zinc-200 dark:border-zinc-600 w-full text-center py-4 mb-4 transform-colors duration-500">
              <h2 class="text-2xl uppercase tracking-[0.5rem] text-zinc-800 dark:text-zinc-100 font-medium">Skills</h2>
            </div>

            <article class="pl-4 pb-8">
              <div>
                <h3 class="text-xl font-semibold text-zinc-800 dark:text-zinc-100 tracking-wide mb-2">Platforms</h3>
              </div>
              <div>
                <ul class="list-disc list-inside text-zinc-700 dark:text-zinc-200 text-sm leading-relaxed">
                  {#each skills.platforms as platform}
                    <li>{platform}</li>
                  {/each}
                </ul>
              </div>
            </article>

            <article class="pl-4 pb-8">
              <div>
                <h3 class="text-xl font-semibold text-zinc-800 dark:text-zinc-100 tracking-wide mb-2">Languages</h3>
              </div>
              <div>
                <ul class="list-disc list-inside text-zinc-700 dark:text-zinc-200 text-sm leading-relaxed">
                  {#each skills.languages as language}
                    <li>{language}</li>
                  {/each}
                </ul>
              </div>
            </article>

            <article class="pl-4 pb-8">
              <div>
                <h3 class="text-xl font-semibold text-zinc-800 dark:text-zinc-100 tracking-wide mb-2">Frameworks</h3>
              </div>
              <div>
                <ul class="list-disc list-inside text-zinc-700 dark:text-zinc-200 text-sm leading-relaxed">
                  {#each skills.frameworks as framework}
                    <li>{framework}</li>
                  {/each}
                </ul>
              </div>
            </article>

            <article class="pl-4 pb-8">
              <div>
                <h3 class="text-xl font-semibold text-zinc-800 dark:text-zinc-100 tracking-wide mb-2">Other</h3>
              </div>
              <div>
                <ul class="list-disc list-inside text-zinc-700 dark:text-zinc-200 text-sm leading-relaxed">
                  {#each skills.other as other}
                    <li>{other}</li>
                  {/each}
                </ul>
              </div>
            </article>
          </section>

          <section class="relative w-full">
            <div class="border-y-2 border-zinc-200 dark:border-zinc-600 w-full text-center py-4 mb-4 transform-colors duration-500">
              <h2 class="text-2xl uppercase tracking-[0.5rem] text-zinc-800 dark:text-zinc-100 font-medium">Projects</h2>
            </div>

            {#each projects as proj}
              <article class="pl-4 pb-8">
                <div>
                  <h3 class="text-xl font-semibold text-zinc-800 dark:text-zinc-100 tracking-wide mb-1">{proj.name}</h3>
                </div>
                
                <div>
                  <span class="tracking-wide text-xs italic text-zinc-600 dark:text-zinc-300">
                    {(proj.tags ?? []).join(' | ')}
                  </span>
                </div>

                <div>
                  <span class="text-sm text-zinc-700 dark:text-zinc-200 leading-relaxed">
                    {proj.description}
                  </span>
                </div>
              </article>
            {/each}
          </section>
        </div>
      </div>
    </section>
  </div>
</div>
