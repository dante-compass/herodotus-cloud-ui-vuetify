import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts({
      outDirs: "./dist/types",
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("src", import.meta.url)),
    },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
  },
  build: {
    lib: {
      entry: fileURLToPath(new URL("./src/index.ts", import.meta.url)),
      name: "@herodotus/core",
      fileName: (format) => (format === "es" ? `index.${format}.mjs` : `index.${format}.js`),
      formats: ["es", "cjs"],
    },
    rolldownOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: [
        "@noble/hashes",
        "@scure/base",
        "axios",
        "generate-avatar",
        "lodash-es",
        "moment",
        "moment/dist/locale/zh-cn",
        "qs",
        "sweetalert2",
        "sm-crypto-v2",
      ],
      output: {
        exports: "named",
        assetFileNames: `assets/[ext]/[name][extname]`,
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          "@noble/hashes": "NobleHashes",
          "@noble/hashes/sha2.js": "NobleHashesSha2",
          "@noble/hashes/utils.js": "NobleHashesUtils",
          "@scure/base": "ScureBase",
          axios: "Axios",
          "generate-avatar": "GenerateAvatar",
          "lodash-es": "LodashEs",
          moment: "Moment",
          "moment/dist/locale/zh-cn": "MomentDistLocaleZhcn",
          qs: "Qs",
          "sm-crypto-v2": "SmCryptoV2",
          sweetalert2: "Sweetalert2",
        },
      },
    },
  },
});
