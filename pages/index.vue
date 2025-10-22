<script setup lang="ts">
  const showResume = ref(false);
  useSeoMeta({
    title: 'Brandon Taylor | brandontaylor.dev',
    description: 'Brandon Taylor - Platform Engineer - I build resilient infrastructure, scalable platforms, and secure systems.',
    ogTitle: 'Brandon Taylor | brandontaylor.dev',
    ogDescription: 'Brandon Taylor - Platform Engineer - I build resilient infrastructure, scalable platforms, and secure systems.',
    ogImage: '/portfolio.webp',
    ogUrl: 'https://www.brandontaylor.dev'
  });

  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Brandon Taylor',
          url: 'https://www.brandontaylor.dev',
          jobTitle: 'Platform Engineer',
          description: 'Brandon Taylor - Platform Engineer - I build resilient infrastructure, scalable platforms, and secure systems.',
          image: 'https://www.brandontaylor.dev/portfolio.webp'
          // sameAs: ['https://github.com/your-username', 'https://www.linkedin.com/in/your-profile']
        })
      }
    ]
  })
</script>

<template>
  <div>
    <rail :show-resume="showResume">
      <portfolio
        :show-resume="showResume"
        @update-show-resume="(val: boolean) => showResume = val"
      />

      <resume
        :show-resume="showResume"
        @update-show-resume="(val: boolean) => showResume = val"
      />
    </rail>
  </div>
</template>

<style>  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeInLeft {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes fadeInBottom {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in {
    opacity: 0;
    animation: fadeIn 0.25s ease-out both;
  }

  .animate-fade-in-left {
    opacity: 0;
    animation: fadeInLeft 0.25s ease-out both;
  }

  .animate-fade-in-bottom {
    opacity: 0;
    animation: fadeInBottom 0.25s ease-out both;
  }

  .animation-delay-100 {
    animation-delay: 0.1s;
  }

  .animation-delay-200 {
    animation-delay: 0.2s;
  }

  .animation-delay-300 {
    animation-delay: 0.3s;
  }

  .animation-delay-400 {
    animation-delay: 0.4s;
  }

  .animation-delay-500 {
    animation-delay: 0.5s;
  }

  .animation-delay-600 {
    animation-delay: 0.6s;
  }

  .animation-delay-1\.5s {
    animation-delay: 1.5s;
  }
</style>
