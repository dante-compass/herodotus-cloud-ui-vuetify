import type { App } from 'vue';

import { createRouter, createWebHistory } from 'vue-router';
import { staticRoutes } from './logic';
import { createRouterGuard } from './guard';
import { setupKernel } from '@/configurations';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: staticRoutes,
});

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (localStorage.getItem('vuetify:dynamic-reload')) {
      console.error('Dynamic import error, reloading page did not fix it', err);
    } else {
      console.log('Reloading page to fix dynamic import error');
      localStorage.setItem('vuetify:dynamic-reload', 'true');
      location.assign(to.fullPath);
    }
  } else {
    console.error(err);
  }
});

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload');
});

export async function setupRouter(app: App) {
  app.use(router);

  setupKernel(router);

  createRouterGuard(router);
  await router.isReady();
}

export default router;
