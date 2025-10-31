import type { ConfigEnv, UserConfigExport } from 'vite';

// Plugins
import Vue from '@vitejs/plugin-vue';
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
import Fonts from 'unplugin-fonts/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';
import { HerodotusResolver } from '@herodotus/components/resolver';

import { compression } from 'vite-plugin-compression2';
import { createHtmlPlugin } from 'vite-plugin-html';
import { viteVConsole } from 'vite-plugin-vconsole';
import VueDevTools from 'vite-plugin-vue-devtools';

// Utilities
import { defineConfig, loadEnv } from 'vite';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/

export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const env = loadEnv(mode, process.cwd());
  // https://vite.dev/config/
  return defineConfig({
    plugins: [
      Vue({
        template: { transformAssetUrls },
      }),
      // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
      Vuetify({
        autoImport: true,
        styles: {
          configFile: 'src/styles/settings.scss',
        },
      }),
      Components({
        dts: 'types/components.d.ts',
        resolvers: [
          HerodotusResolver(),
          IconsResolver({
            customCollections: ['herodotus'],
          }),
        ],
      }),
      AutoImport({
        dts: 'types/auto-imports.d.ts',
        imports: [
          'vue',
          {
            pinia: ['defineStore', 'storeToRefs'],
          },
        ],
        eslintrc: {
          enabled: true,
        },
        vueTemplate: true,
      }),
      Icons({
        compiler: 'vue3',
        autoInstall: true,
        customCollections: {
          // 这里是存放svg图标的文件地址，herodotus是自定义图标库的名称
          herodotus: FileSystemIconLoader('./src/assets/svg'),
        },
      }),
      Fonts({
        fontsource: {
          families: [
            {
              name: 'Roboto',
              weights: [100, 300, 400, 500, 700, 900],
              styles: ['normal', 'italic'],
            },
          ],
        },
      }),
      compression(),
      // VConsole 调试工具配置，若没有此配置，则调试工具控制台不会打印日志
      viteVConsole({
        entry: [fileURLToPath(new URL('./src/main.ts', import.meta.url))], // entry file
        enabled: command !== 'build' || mode === 'development', // build production
        config: {
          // vconsole options
          maxLogNumber: 1000,
          theme: 'light',
        },
      }),
      createHtmlPlugin({
        inject: {
          data: {
            // 查找.env.test文件里面的APPLICATION_NAME，请以VITE_标识开头
            title: env.VITE_APPLICATION_NAME,
          },
        },
      }),
    ],
    optimizeDeps: {
      exclude: ['vuetify', 'vue-router'],
      include: ['vconsole'],
    },
    define: { 'process.env': { env } },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('src', import.meta.url)),
      },
      extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
    },
    server: {
      port: Number(env.VITE_PORT),
      proxy: {
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  });
};
