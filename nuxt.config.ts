// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-07-18',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image', 'nuxt-security', '@nuxt/content', '@nuxt/icon'],
  security: {
    nonce: true, // add nonce to every <script>/<style>/<link> the app emits
    headers: {
      contentSecurityPolicy: {
        // Scripts: strict CSP via nonce + strict-dynamic
        'script-src': [
          "'self'", 'https:',       // fallbacks
          "'strict-dynamic'",       // modern browsers honor nonce + dynamic
          "'nonce-{{nonce}}'"       // Nuxt Security injects this per request
        ],
        // 'script-src-elem': ["'strict-dynamic'", "'nonce-{{nonce}}'"],

        // Keep attributes locked down (blocks onClick=..., etc.)
        'script-src-attr': ["'none'"],

        // Styles – keep inline allowed unless ready to hash/nonce all of them
        'style-src': ["'self'", 'https:', "'unsafe-inline'"],

        // Add dev sockets/APIs here:
        'connect-src': process.env.NODE_ENV === 'development'
          ? ["'self'", 'ws://localhost:4000', 'http://localhost:4000']
          : ["'self'", 'https:', 'wss:'],
      }
    }
  }
});