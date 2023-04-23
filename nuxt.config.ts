// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    serveStatic: true,
  },
  css: [
    '@/assets/static/normalize.css',
    '@/assets/base.scss',
    'vue-final-modal/style.css',
  ],
});
