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
// import { viteVConsole } from 'vite-plugin-vconsole';
import VueDevTools from 'vite-plugin-vue-devtools';

// Utilities
import { defineConfig, loadEnv } from 'vite';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/

export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const env = loadEnv(mode, process.cwd());
  // https://vite.dev/config/
  return defineConfig({
    // 增加基础路径配置，修复在反向代理指向子路径的配置方式下，出现静态资源 404 问题
    base: env.VITE_BASE_PATH,
    plugins: [
      VueDevTools(),
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
        imports: ['vue', 'pinia'],
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
      // viteVConsole({
      //   entry: [fileURLToPath(new URL('./src/main.ts', import.meta.url))], // entry file
      //   enabled: command !== 'build' || mode === 'development', // build production
      //   config: {
      //     // vconsole options
      //     maxLogNumber: 1000,
      //     theme: 'light',
      //   },
      // }),
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
      exclude: [
        'vuetify',
        'vuetify/components',
        'vuetify/directives',
        '@tsparticles/engine',
        '@tsparticles/basic',
        '@tsparticles/interaction-particles-links',
        '@mdi/js',
        '@vueuse/components',
        'echarts/theme/macarons',
      ],
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
        '/socket': {
          target: env.VITE_WS_URL,
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(/^\/socket/, ''),
        },
        '/reactive': {
          target: env.VITE_REACTIVE_WS_URL,
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(/^\/reactive/, ''),
        },
      },
    },
    build: {
      // chunkSizeWarningLimit: 1000,
      outDir: '../../build/dist',
      emptyOutDir: true,
      cssCodeSplit: false, // 因为使用了 Base './'，如果将该属性设置为 true，编译后 css 目录结构会产生变化，会导致 @quasar/extras 中样式找不到字体
      minify: 'terser',
      terserOptions: {
        // 生产环境下移除console
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
        keep_classnames: true,
      },
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            if (
              assetInfo.type === 'asset' &&
              /\.(jpe?g|png|gif|svg)$/i.test(assetInfo.name as string)
            ) {
              return 'assets/images/[name]-[hash].[ext]';
            }
            if (
              assetInfo.type === 'asset' &&
              /\.(ttf|woff|woff2|eot)$/i.test(assetInfo.name as string)
            ) {
              return 'assets/fonts/[name]-[hash].[ext]';
            }
            return 'assets/[ext]/[name]-[hash].[ext]';
          },
          manualChunks(id, { getModuleInfo }) {
            if (id.includes('tsparticles')) {
              return 'js/npm-tsparticles';
            } else if (id.includes('node_modules')) {
              const indexes = id.toString().split('node_modules/')[2].split('/');
              let name = indexes[0];
              if (name.includes('@')) {
                name = name + '-' + indexes[1];
              }
              return 'js/npm-' + name;
            } else if (id.includes('src')) {
              const path = id.toString().split('src/')[1].replace(/\//g, '-');
              return 'js/' + path;
            }
          },
        },
      },
    },
  });
};
