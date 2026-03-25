import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';

import Vue from '@vitejs/plugin-vue';
import { transformAssetUrls } from 'vite-plugin-vuetify';
import dts from 'unplugin-dts/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue({
      template: { transformAssetUrls },
    }),
    dts({
      insertTypesEntry: true,
      outDirs: './dist/types',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
    },
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
  },
  build: {
    lib: {
      entry: {
        index: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
        resolver: fileURLToPath(new URL('./src/resolver.ts', import.meta.url)),
      },
      name: '@herodotus/components',
      fileName: (format, entry) => (format === 'es' ? `${entry}.${format}.mjs` : `${entry}.${format}.js`),
      formats: ['es', 'cjs'],
    },
    rolldownOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: [
        'lodash-es',
        'pinia',
        'vue',
        'vuetify',
        'vuetify/components',
        '@mdi/js',
        '@herodotus/core',
        '@tsparticles/basic',
        '@tsparticles/engine',
        '@tsparticles/interaction-particles-links',
      ],
      output: {
        exports: 'named',
        assetFileNames: `assets/[ext]/[name][extname]`,
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          'lodash-es': 'LodashEs',
          pinia: 'Pinia',
          vue: 'Vue',
          vuetify: 'Vuetify',
          'vuetify/components': 'VuetifyComponents',
          '@mdi/js': 'MdiJs',
          '@herodotus/core': 'HerodotusCore',
          '@tsparticles/basic': 'TsparticlesBasic',
          '@tsparticles/engine': 'TsparticlesEngine',
          '@tsparticles/interaction-particles-links': 'TsparticlesInteractionParticlesLinkss',
        },
      },
    },
  },
});
