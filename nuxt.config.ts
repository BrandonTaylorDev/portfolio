// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-07-18',
  devtools: { enabled: true },
  modules: [ 'nuxt-icon', '@nuxtjs/tailwindcss', '@nuxt/image', 'nuxt-security' ],
  plugins: [ '~/plugins/recaptcha.ts' ],
  runtimeConfig: {
    public: {
      RECAPTCHA_SITEKEY: process.env.RECAPTCHA_SITEKEY
    },
    private: {
      RECAPTCHA_URL: process.env.RECAPTCHA_URL,
      RECAPTCHA_SECRETKEY: process.env.RECAPTCHA_SECRETKEY,
      SMTP2GO_USER: process.env.SMTP2GO_USER,
      SMTP2GO_PASS: process.env.SMTP2GO_PASS
    }
  },
  security: {
    headers: {
      crossOriginEmbedderPolicy: process.env.NODE_ENV === 'development' ? 'unsafe-none' : 'require-corp',
      contentSecurityPolicy: {
        'default-src': ["'self'"],
        'script-src': [
          "'self'",
          'https:',
          "'unsafe-inline'",
          "https://www.google.com",
          "https://static.cloudflareinsights.com"
        ],
        'script-src-attr': [
          "'self'",
          "'unsafe-inline'"
        ],
        'frame-src': [
          "https://www.google.com/recaptcha/api2/anchor?"
        ]
      }
    },
  }
})
