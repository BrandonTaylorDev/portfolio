// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-07-18',
  devtools: { enabled: true },
  modules: [ 'nuxt-icon', '@nuxtjs/tailwindcss', '@nuxt/image', 'nuxt-security' ],
  security: {
    headers: {
      crossOriginEmbedderPolicy: process.env.NODE_ENV === 'development' ? 'unsafe-none' : 'require-corp',
      contentSecurityPolicy: {
        'default-src': ["'self'"],
        'script-src': [
          "'self'",
          'https:',
          "'unsafe-inline'"
        ],
        'script-src-attr': [
          "'self'",
          "'unsafe-inline'"
        ]
      }
    },
  }
})
