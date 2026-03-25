import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      outDir: './dist/types',
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
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      name: '@herodotus/framework',
      fileName: (format) => (format === 'es' ? `index.${format}.mjs` : `index.${format}.js`),
      formats: ['es', 'cjs'],
    },
    cssCodeSplit: false, // 设置为 false 可以将所有样式合并到一个 CSS 文件
    rolldownOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: [
        'colord',
        'colord/plugins/mix',
        'crypto',
        'lodash-es',
        'js-base64',
        'jwt-decode',
        'pinia',
        'pinia-plugin-persistedstate',
        'vue',
        'vue-router',
        '@herodotus/core',
      ],
      output: {
        exports: 'named',
        assetFileNames: `assets/[ext]/[name][extname]`,
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          colord: 'Colord',
          'colord/plugins/mix': 'ColordPluginsMix',
          crypto: 'Crypto',
          'lodash-es': 'LodashEs',
          'js-base64': 'JsBase64',
          'jwt-decode': 'JwtDecode',
          pinia: 'Pinia',
          'pinia-plugin-persistedstate': 'PiniaPluginPersistedstate',
          vue: 'Vue',
          'vue-router': 'VueRouter',
          '@herodotus/core': 'HerodotusCore',
        },
      },
    },
  },
});
