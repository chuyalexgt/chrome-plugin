/// <reference types="vitest" />

import { resolve } from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import { QuasarResolver } from 'unplugin-vue-components/resolvers'
import { shortcuts } from './shortcuts'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    Vue({
      reactivityTransform: true,
      template: { transformAssetUrls },
    }),
    quasar({
      sassVariables: 'src/quasar-variables.sass',
    }),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      extendRoute(route) {
        // rutas que no requieren autrenticacion
        // console.log(route)
        // if (freeRoutes.includes(route.path)) {
        //   // Index is unauthenticated.
        //   return route
        // }

        // todas las demas requiren autenticacion
        return {
          ...route,
          // meta: { auth: true },
        }
      },
    }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue/macros',
        'vue-router',
        '@vueuse/core',
      ],
      dts: true,
      dirs: [
        './src/composables',
      ],
      vueTemplate: true,
    }),

    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: true,
      resolvers: [
        QuasarResolver(),
      ],
    }),

    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss({
      shortcuts: { ...shortcuts },
      rules: [
        ['gradient-rotate', { animation: '30s ease 0s infinite normal none running gradient-rotate' }],
        ['h-head', { 'min-height': 'calc(100vh - 90px)' }],
        ['cool-gradient', { background: 'linear-gradient(-45deg, #0061ff, #60efff, #0061ff, #43c6ac) 0% 0% / 400% 400%;' }],
        ['glass-effect', {
          'background': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.0))',
          'backdrop-filter': 'blur(20px)',
          'box-shadow': '0 8px 12px 0 rgba(0, 0, 0, 0.37)',
          'border': '1px solid rgba(255, 255, 255, 0.18)',
        }],
        ['autogrid', { 'display': 'grid', 'grid-template-columns': 'repeat(auto-fit, minmax(100px,1fr))', 'gap': '10px' }],
        ['hide', { display: 'none' }],
      ],
    }),
  ],

  // https://github.com/vitest-dev/vitest
  test: {
    environment: 'jsdom',
  },
})
