import App from './App.vue';
import { createApp } from 'vue';

import DisableDevtool from 'disable-devtool';
import { IS_DEV, VARIABLES } from '@/configurations';

// Plugins
import { setupVuetify, setupPinia } from '@/plugins';
import { setupRouter } from '@/routers';

// Styles
import '@herodotus/core/style.css';
import '@herodotus/framework/style.css';
import 'animate.css/animate.min.css';
import 'unfonts.css';

async function setupApp() {
  if (IS_DEV) {
    const view = document.createElement('div');
    document.body.appendChild(view);
  }

  const app = createApp(App);

  // 注册 Vuetify 组件库
  setupVuetify(app);

  // 注册状态管理
  setupPinia(app);

  // 挂载路由
  setupRouter(app);

  app.mount('#app', true);

  if (!IS_DEV) {
    if (VARIABLES.getUseDisableDevtool()) {
      const url =
        import.meta.env.VITE_BASE_PATH === '/'
          ? '/static/forbidden.html'
          : import.meta.env.VITE_BASE_PATH + 'static/forbidden.html';

      DisableDevtool({
        url: url,
        timeOutUrl: url,
        disableMenu: true,
      });
    }
  }
}

setupApp();
