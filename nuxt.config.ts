// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';
import BasicAuth from 'nuxt-basic-authentication-module';

export default defineNuxtConfig({
  srcDir: 'src/',
  ssr: false,
  devtools: { enabled: true },
  typescript: {
    shim: false,
    strict: true,
    typeCheck: false,
  },
  css: ['@/assets/styles/reset.css'],
  runtimeConfig: {
    public: {
      key: '',
    },
    basicAuth: {
      pairs: {
        admin: process.env.BASIC_AUTH_PASS,
      },
    },
  },
  modules: [[BasicAuth, { enabled: true }]],
});
