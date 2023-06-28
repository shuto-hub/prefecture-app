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
      /**
       * FIXME:テスト用のbuild実行時に環境変数を取得するため、取得元を明示する
       * ※本番環境では環境変数に、開発時はenvファイルに"NUXT_キー名_キー名=値"のように記載すれば、config内での参照は不要です
       */
      key: process.env.NUXT_PUBLIC_KEY || '',
    },
    basicAuth: {
      pairs: {
        admin: process.env.BASIC_AUTH_PASS,
      },
    },
  },
  modules: [[BasicAuth, { enabled: true }], 'nuxt-lodash'],
});
