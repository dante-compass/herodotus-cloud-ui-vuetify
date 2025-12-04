import type { RouteRecordRaw, Router } from 'vue-router';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import { useAuthenticationStore, useElementStore, useSystemElement } from '@herodotus/framework';
import { DEAULT_ROUTER_LINK, API } from '@/configurations';

NProgress.configure({
  showSpinner: false, // 隐藏旋转器，与Vuetify更协调
  speed: 300,
  trickleSpeed: 200,
  minimum: 0.08,
});

const NotFoundRoute: RouteRecordRaw = {
  path: DEAULT_ROUTER_LINK.not_found.path,
  name: DEAULT_ROUTER_LINK.not_found.name,
  component: () => import('@/components/error/404.vue'),
  meta: {
    title: DEAULT_ROUTER_LINK.not_found.title,
  },
};

const vueModules = import.meta.glob('../views/**/*.vue');

const locate = (item: string) => {
  return `../${item}`;
};

const getRoutesFromServer = (roles: string[]) => {
  return API.core.sysElement().findResourcesByRoles(roles);
};

const { initBackendSecurity } = useSystemElement(vueModules, locate, getRoutesFromServer);

export const createRouterGuard = (router: Router) => {
  let isFirstNavigation = true;

  router.beforeEach(async (to, from, next) => {
    // 跳过初始导航的进度条（如果需要）
    if (from.name === undefined && isFirstNavigation) {
      isFirstNavigation = false;
    } else {
      NProgress.start();
    }

    const authStore = useAuthenticationStore();
    const elementStore = useElementStore();

    const token = authStore.token;

    // 有 Token 的情况
    if (token) {
      // 如果已经在登录页，跳转到首页
      if (to.path === DEAULT_ROUTER_LINK.sign_in.path) {
        // 目的地址还是登录页面，直接跳转到首页。
        next(DEAULT_ROUTER_LINK.home.path);
        return;
      }

      // 需要初始化动态路由
      if (!elementStore.isDynamicRouteAdded) {
        await initBackendSecurity(router, authStore.roles);
        router.addRoute(NotFoundRoute);

        // 重新导航到目标页面
        if (to.path !== from.path) {
          next(to.fullPath);
        } else {
          next();
        }
        return;
      }
      next();
      return;
    } else {
      // 没有 Token 的情况
      // 允许访问的无权限页面
      if (to.meta.isIgnoreAuth) {
        next();
        return;
      } else {
        if (to.path === DEAULT_ROUTER_LINK.sign_in.path) {
          localStorage.clear();
          next();
          return;
        }
        // 重定向到登录页，并携带重定向路径
        next({
          path: DEAULT_ROUTER_LINK.sign_in.path,
          query: { redirect: to.fullPath },
        });
        return;
      }
    }
  });

  // 路由加载后
  router.afterEach(() => {
    NProgress.done();
  });

  // Workaround for https://github.com/vitejs/vite/issues/11804
  router.onError((err, to) => {
    console.log('-----------', err);
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
    NProgress.done();
  });

  router.isReady().then(() => {
    localStorage.removeItem('vuetify:dynamic-reload');
  });
};
