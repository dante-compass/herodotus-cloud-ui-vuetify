import App from './App.vue';
import { createApp } from 'vue';

// Plugins
import { setupVuetify, setupPinia } from '@/plugins';
import { setupRouter } from '@/router';

import '@herodotus/core/style.css';
import '@herodotus/framework/style.css';

// Styles
import 'unfonts.css';

async function setupApp() {
  const app = createApp(App);

  // 注册 Vuetify 组件库
  setupVuetify(app);

  // 注册状态管理
  setupPinia(app);

  // 挂载路由
  setupRouter(app);

  app.mount('#app', true);
}

setupApp();
