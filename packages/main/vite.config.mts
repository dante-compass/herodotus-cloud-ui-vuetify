import type { ConfigEnv, UserConfigExport } from "vite";

// Plugins
import Vue from "@vitejs/plugin-vue";
import Vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import ViteFonts from "unplugin-fonts/vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import { HerodotusResolver } from "@herodotus/components/resolver";

import { compression } from "vite-plugin-compression2";
import { createHtmlPlugin } from "vite-plugin-html";
// import { viteVConsole } from 'vite-plugin-vconsole';
import VueDevTools from "vite-plugin-vue-devtools";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// Utilities
import { defineConfig, loadEnv } from "vite";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/

export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  // 这里的 env 只会显示 VITE_开头内容
  const env = loadEnv(mode, process.cwd());
  // https://vite.dev/config/
  return defineConfig({
    // 增加基础路径配置，修复在反向代理指向子路径的配置方式下，出现静态资源 404 问题
    base: env.VITE_BASE_URL,
    plugins: [
      nodePolyfills({
        globals: {
          Buffer: true,
          global: true,
          process: true,
        },
      }),
      VueDevTools(),
      Components({
        dts: "types/components.d.ts",
        resolvers: [
          HerodotusResolver(),
          IconsResolver({
            customCollections: ["herodotus"],
          }),
        ],
      }),
      AutoImport({
        imports: ["vue", "pinia"],
        dts: "types/auto-imports.d.ts",
        eslintrc: {
          enabled: true,
        },
        vueTemplate: true,
      }),
      Vue({
        template: { transformAssetUrls },
      }),
      // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
      Vuetify({
        autoImport: true,
        styles: {
          configFile: "src/styles/settings.scss",
        },
      }),
      Icons({
        compiler: "vue3",
        autoInstall: true,
        // customCollections: {
        //   // 这里是存放svg图标的文件地址，herodotus是自定义图标库的名称
        //   herodotus: FileSystemIconLoader('./src/assets/svg'),
        // },
      }),
      ViteFonts({
        fontsource: {
          families: [
            {
              name: "Roboto",
              weights: [100, 300, 400, 500, 700, 900],
              styles: ["normal", "italic"],
            },
          ],
        },
      }),
      compression({
        // environment.js 在打包时不生成 *.gz 或 *.br 文件，避免压缩文件影响环境变量的设置。
        exclude: ["**/environment.js"],
      }),
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
        "vuetify",
        "vuetify/components",
        "vuetify/directives",
        "@mdi/js",
        "@vueuse/components",
        "echarts/theme/macarons",
        "vite-plugin-node-polyfills/shims/buffer",
        "vite-plugin-node-polyfills/shims/global",
        "vite-plugin-node-polyfills/shims/process",
        "@tsparticles/engine",
        "@tsparticles/preset-triangles",
      ],
    },
    define: { "process.env": { env } },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("src", import.meta.url)),
      },
      extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
    },
    server: {
      port: Number(env.VITE_PORT),
      proxy: {
        "/api": {
          target: env.VITE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
        "/socket": {
          target: env.VITE_WS_URL,
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(/^\/socket/, ""),
        },
        "/reactive": {
          target: env.VITE_WS_URL,
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(/^\/reactive/, ""),
        },
      },
    },
    build: {
      // chunkSizeWarningLimit: 1000,
      outDir: "../../build/dist",
      emptyOutDir: true,
      cssCodeSplit: true,
      rolldownOptions: {
        output: {
          // 入口文件单独放置在 js 目录下
          entryFileNames: "entry/[name]-[hash].js",

          // codeSplitting 是对代码进行拆分并且进行命名
          // assetFileNames 和 chunkFileNames 会根据 codeSplitting 拆分的结果进行重命名和文件放置。[name] 对应的就是codeSplitting 返回的名称
          assetFileNames: (assetInfo) => {
            if (/\.(css|scss|sass)$/i.test(assetInfo.names[0])) {
              return "assets/css/[name]-[hash][extname]";
            }
            if (/\.(jpg|jpeg|png|gif|svg)$/i.test(assetInfo.names[0])) {
              return "assets/images/[name]-[hash][extname]";
            }
            if (/\.(ttf|woff|woff2|eot)$/i.test(assetInfo.names[0])) {
              return "assets/fonts/[name]-[hash][extname]";
            }
            // 其他资源文件默认存放
            return "assets/[name]-[hash][extname]";
          },

          chunkFileNames: (chunkInfo) => {
            // vender 对应 node_modules 中的包
            // chunk 对应自己实际开发的代码
            if (chunkInfo.name.includes("vender-")) {
              return "assets/js/venders/[name]-[hash].js";
            }

            return "assets/js/chunks/[name]-[hash].js";
          },

          codeSplitting: {
            groups: [
              {
                name: (id) => {
                  // 匹配 node_modules 中的库，生成类似 'js/npm-react' 的 chunk
                  const parts = id.toString().split("node_modules/")[2].split("/");
                  let name = parts[0];
                  if (name.startsWith("@")) {
                    name = name + "-" + parts[1];
                  }
                  return "vender-" + name;
                },
                test: (id) => id.includes("node_modules"),
              },
              {
                name: (id) => {
                  // 匹配 src 下的文件，生成类似 'js/pages-index' 的 chunk
                  const path = id.toString().split("src/")[1];
                  return path;
                },
                test: (id) => id.includes("/src/"), // 对应的 test 条件
              },
            ],
          },
        },
      },
    },
  });
};
