import type { App } from 'vue';

import { createRouter, createWebHistory } from 'vue-router';
import { staticRoutes } from './logic';
import { createRouterGuard } from './guard';
import { setupKernel } from '@/configurations';

console.log(import.meta.env);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: staticRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export async function setupRouter(app: App) {
  app.use(router);

  setupKernel(router);

  createRouterGuard(router);
  await router.isReady();
}

export default router;
