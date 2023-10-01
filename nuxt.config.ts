// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@sidebase/nuxt-auth',
    '@nuxtjs/tailwindcss'
  ],
  build: {
    transpile: [
      'trpc-nuxt'
    ],
    postcss: {
      plugins: {
        'postcss-custom-properties': false
      }
    }
  },
  typescript: {
    shim: false
  }
})
