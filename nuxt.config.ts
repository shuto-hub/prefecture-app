// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'src/',
  ssr: false,
  devtools: { enabled: true },
  typescript: {
    shim: false,
    strict: true,
    typeCheck: false,
  },
  css: ['@/assets/styles/reset.css', '@/assets/styles/main.scss'],
})
