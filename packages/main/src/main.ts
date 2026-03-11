// Styles
import './styles/main.scss';
import 'unfonts.css';
import 'animate.css/animate.min.css';
import '@herodotus/core/style.css';
import '@herodotus/framework/style.css';

import App from './App.vue';
import { createApp } from 'vue';

import DisableDevtool from 'disable-devtool';
import { IS_DEV, VARIABLES } from '@/configurations';

// Plugins
import { setupVuetify, setupPinia } from '@/plugins';
import { setupRouter } from '@/routers';

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
    if (VARIABLES.isUseDisableDevtool()) {
      const url =
        import.meta.env.VITE_BASE_URL === '/'
          ? '/static/forbidden.html'
          : import.meta.env.VITE_BASE_URL + 'static/forbidden.html';

      DisableDevtool({
        url: url,
        timeOutUrl: url,
        disableMenu: true,
      });
    }
  }
}

setupApp();
