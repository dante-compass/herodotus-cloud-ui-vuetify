// vite.config.ts
import { defineConfig } from "file:///D:/workspaces/Reactive/herodotus-cloud-ui/node_modules/.pnpm/vite@5.3.3_@types+node@20.14.10_sass@1.77.8_terser@5.31.2/node_modules/vite/dist/node/index.js";
import dts from "file:///D:/workspaces/Reactive/herodotus-cloud-ui/node_modules/.pnpm/vite-plugin-dts@3.9.1_@types+node@20.14.10_rollup@4.18.1_typescript@5.5.3_vite@5.3.3_@types+n_6uti2wex64e3y2hh7ctwoofjei/node_modules/vite-plugin-dts/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "D:\\workspaces\\Reactive\\herodotus-cloud-ui\\shared\\bpmn-apis";
var vite_config_default = defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true
    })
  ],
  resolve: {
    alias: {
      "/@": path.resolve(__vite_injected_original_dirname, "src"),
      "/#": path.resolve(__vite_injected_original_dirname, "types")
    }
  },
  build: {
    lib: {
      entry: path.resolve(__vite_injected_original_dirname, "./src/index.ts"),
      name: "@herodotus/bpmn-apis",
      fileName: (format) => format === "es" ? `index.${format}.mjs` : `index.${format}.js`
    },
    minify: "terser",
    terserOptions: {
      // 生产环境下移除console
      compress: {
        drop_console: true,
        drop_debugger: true
      },
      keep_classnames: true
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["@herodotus/core"],
      output: {
        assetFileNames: `assets/[name].[ext]`,
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          "@herodotus/core": "HerodotusCore"
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFx3b3Jrc3BhY2VzXFxcXFJlYWN0aXZlXFxcXGhlcm9kb3R1cy1jbG91ZC11aVxcXFxzaGFyZWRcXFxcYnBtbi1hcGlzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFx3b3Jrc3BhY2VzXFxcXFJlYWN0aXZlXFxcXGhlcm9kb3R1cy1jbG91ZC11aVxcXFxzaGFyZWRcXFxcYnBtbi1hcGlzXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi93b3Jrc3BhY2VzL1JlYWN0aXZlL2hlcm9kb3R1cy1jbG91ZC11aS9zaGFyZWQvYnBtbi1hcGlzL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcblxyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSc7XHJcbmltcG9ydCBkdHMgZnJvbSAndml0ZS1wbHVnaW4tZHRzJztcclxuXHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbXHJcbiAgICBkdHMoe1xyXG4gICAgICBpbnNlcnRUeXBlc0VudHJ5OiB0cnVlXHJcbiAgICB9KVxyXG4gIF0sXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgJy9AJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpLFxyXG4gICAgICAnLyMnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAndHlwZXMnKVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgYnVpbGQ6IHtcclxuICAgIGxpYjoge1xyXG4gICAgICBlbnRyeTogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL2luZGV4LnRzJyksXHJcbiAgICAgIG5hbWU6ICdAaGVyb2RvdHVzL2JwbW4tYXBpcycsXHJcbiAgICAgIGZpbGVOYW1lOiBmb3JtYXQgPT4gKGZvcm1hdCA9PT0gJ2VzJyA/IGBpbmRleC4ke2Zvcm1hdH0ubWpzYCA6IGBpbmRleC4ke2Zvcm1hdH0uanNgKVxyXG4gICAgfSxcclxuICAgIG1pbmlmeTogJ3RlcnNlcicsXHJcbiAgICB0ZXJzZXJPcHRpb25zOiB7XHJcbiAgICAgIC8vIFx1NzUxRlx1NEVBN1x1NzNBRlx1NTg4M1x1NEUwQlx1NzlGQlx1OTY2NGNvbnNvbGVcclxuICAgICAgY29tcHJlc3M6IHtcclxuICAgICAgICBkcm9wX2NvbnNvbGU6IHRydWUsXHJcbiAgICAgICAgZHJvcF9kZWJ1Z2dlcjogdHJ1ZVxyXG4gICAgICB9LFxyXG4gICAgICBrZWVwX2NsYXNzbmFtZXM6IHRydWVcclxuICAgIH0sXHJcbiAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgIC8vIFx1Nzg2RVx1NEZERFx1NTkxNlx1OTBFOFx1NTMxNlx1NTkwNFx1NzQwNlx1OTBBM1x1NEU5Qlx1NEY2MFx1NEUwRFx1NjBGM1x1NjI1M1x1NTMwNVx1OEZEQlx1NUU5M1x1NzY4NFx1NEY5RFx1OEQ1NlxyXG4gICAgICBleHRlcm5hbDogWydAaGVyb2RvdHVzL2NvcmUnXSxcclxuICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgYXNzZXRGaWxlTmFtZXM6IGBhc3NldHMvW25hbWVdLltleHRdYCxcclxuICAgICAgICAvLyBcdTU3MjggVU1EIFx1Njc4NFx1NUVGQVx1NkEyMVx1NUYwRlx1NEUwQlx1NEUzQVx1OEZEOVx1NEU5Qlx1NTkxNlx1OTBFOFx1NTMxNlx1NzY4NFx1NEY5RFx1OEQ1Nlx1NjNEMFx1NEY5Qlx1NEUwMFx1NEUyQVx1NTE2OFx1NUM0MFx1NTNEOFx1OTFDRlxyXG4gICAgICAgIGdsb2JhbHM6IHtcclxuICAgICAgICAgICdAaGVyb2RvdHVzL2NvcmUnOiAnSGVyb2RvdHVzQ29yZSdcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTRXLFNBQVMsb0JBQW9CO0FBR3pZLE9BQU8sU0FBUztBQUVoQixPQUFPLFVBQVU7QUFMakIsSUFBTSxtQ0FBbUM7QUFRekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLE1BQ0Ysa0JBQWtCO0FBQUEsSUFDcEIsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLE1BQU0sS0FBSyxRQUFRLGtDQUFXLEtBQUs7QUFBQSxNQUNuQyxNQUFNLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDdkM7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxLQUFLO0FBQUEsTUFDSCxPQUFPLEtBQUssUUFBUSxrQ0FBVyxnQkFBZ0I7QUFBQSxNQUMvQyxNQUFNO0FBQUEsTUFDTixVQUFVLFlBQVcsV0FBVyxPQUFPLFNBQVMsTUFBTSxTQUFTLFNBQVMsTUFBTTtBQUFBLElBQ2hGO0FBQUEsSUFDQSxRQUFRO0FBQUEsSUFDUixlQUFlO0FBQUE7QUFBQSxNQUViLFVBQVU7QUFBQSxRQUNSLGNBQWM7QUFBQSxRQUNkLGVBQWU7QUFBQSxNQUNqQjtBQUFBLE1BQ0EsaUJBQWlCO0FBQUEsSUFDbkI7QUFBQSxJQUNBLGVBQWU7QUFBQTtBQUFBLE1BRWIsVUFBVSxDQUFDLGlCQUFpQjtBQUFBLE1BQzVCLFFBQVE7QUFBQSxRQUNOLGdCQUFnQjtBQUFBO0FBQUEsUUFFaEIsU0FBUztBQUFBLFVBQ1AsbUJBQW1CO0FBQUEsUUFDckI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
