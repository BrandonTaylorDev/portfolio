<template>
  <section class="flex flex-col gap-4 max-w-xl mx-auto lg:max-w-full lg:mx-0 lg:border-l-4 lg:border-slate-500 dark:lg:border-teal-600 text-xl md:text-lg">
    <span class="sticky top-0 text-center text-xl text-slate-900 dark:text-slate-200 backdrop-filter backdrop-blur-sm bg-slate-100/50 dark:bg-slate-900/50 px-8 py-4">
      Need a Copy of My Resume?
    </span>

    <div class="px-8">
      <p>
        Thank you for the opportunity to share a little about myself. If you're interested in a traditional copy of my resume,
        click the link below to download it.
      </p>

      <div class="pt-4">
        <hyperlink
          href="/resumes/20241002.pdf"
          download
          class="text-lg text-slate-700 dark:text-slate-200 flex justify-center items-center gap-2"
        >
          <icon name="mdi:download" size="1.25em" mode="svg" />
          My Resume
        </hyperlink>
      </div>
    </div>
  </section>
</template>
