// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["nuxt-icon", "@nuxtjs/tailwindcss", "@nuxt/image"],
  plugins: [ '~/plugins/recaptcha.ts' ],
  runtimeConfig: {
    public: {
      RECAPTCHA_SITEKEY: process.env.RECAPTCHA_SITEKEY
    },
    private: {
      RECAPTCHA_URL: process.env.RECAPTCHA_URL,
      RECAPTCHA_SECRETKEY: process.env.RECAPTCHA_SECRETKEY,
      DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
      SMTP2GO_USER: process.env.SMTP2GO_USER,
      SMTP2GO_PASS: process.env.SMTP2GO_PASS
    }
  }
})