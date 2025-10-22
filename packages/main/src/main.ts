// Plugins
import { setupVuetify } from '@/plugins';

// Components
import App from './App.vue';

// Composables
import { createApp } from 'vue';

// Styles
import 'unfonts.css';

async function setupApp() {
  const app = createApp(App);

  // 注册 Vuetify 组件库
  setupVuetify(app);

  // 注册状态管理
  // setupPinia(app);

  // 挂载路由
  // setupRouter(app);

  app.mount('#app', true);
}

setupApp();
