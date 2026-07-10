import "animate.css/animate.min.css";
import "@herodotus/core/style.css";
import "@herodotus/framework/style.css";

// Composables
import { createApp } from "vue";
// Plugins
import { setupVuetify, setupPinia } from "@/plugins";
import router, { setupRouter } from "@/routers";
import DisableDevtool from "disable-devtool";
import { IS_DEV, VARIABLES, setupKernel } from "@/configurations";

// Components
import App from "./App.vue";

// Styles
import "unfonts.css";

function setupApp() {
  if (IS_DEV) {
    const view = document.createElement("div");
    document.body.appendChild(view);
  }

  const app = createApp(App);

  // 注册 Vuetify 组件库
  setupVuetify(app);

  // 注册状态管理
  setupPinia(app);

  // 挂载路由
  setupRouter(app);

  // 设置信息信息
  setupKernel(router);

  app.mount("#app", true);

  if (!IS_DEV) {
    if (VARIABLES.isUseDisableDevtool()) {
      const url =
        import.meta.env.VITE_BASE_URL === "/"
          ? "/static/forbidden.html"
          : import.meta.env.VITE_BASE_URL + "static/forbidden.html";

      DisableDevtool({
        url: url,
        timeOutUrl: url,
        disableMenu: true,
      });
    }
  }
}

setupApp();
