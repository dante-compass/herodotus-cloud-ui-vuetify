import type { RouteRecordRaw, Router } from 'vue-router';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import { useAuthenticationStore, useRouterStore, useSystemRoute } from '@herodotus/framework';
import { DEAULT_ROUTER_LINK, API } from '@/configurations';

const NotFoundRoute: RouteRecordRaw = {
  path: DEAULT_ROUTER_LINK.not_found.path,
  name: DEAULT_ROUTER_LINK.not_found.name,
  component: () => import('@/components/framework/error/404.vue'),
  meta: {
    title: DEAULT_ROUTER_LINK.not_found.title,
  },
};

const routeModules = import.meta.glob('./modules/**/*.ts', {
  eager: true,
});

const vueModules = import.meta.glob('../views/**/*.vue');

const locate = (item: string) => {
  return `../${item}`;
};

const getRoutesFromServer = () => {
  return API.core.sysElement().fetchTree();
};

const { initBackEndRoutes, initFrontEndRoutes } = useSystemRoute(
  routeModules,
  vueModules,
  locate,
  getRoutesFromServer,
);

export const createRouterGuard = (router: Router) => {
  router.beforeEach(async (to, from, next) => {
    NProgress.start();

    const authStore = useAuthenticationStore();
    const routeStore = useRouterStore();

    const token = authStore.token;

    // 有 Token
    if (token) {
      if (to.path === DEAULT_ROUTER_LINK.sign_in.path) {
        // 目的地址还是登录页面，直接跳转到首页。
        next(DEAULT_ROUTER_LINK.home.path);
        return;
      } else {
        // 判断动态路由是否已经添加，没有添加则进行添加
        if (!routeStore.isDynamicRouteAdded) {
          if (routeStore.isRemote) {
            await initBackEndRoutes(router);
          } else {
            await initFrontEndRoutes(router);
          }

          router.addRoute(NotFoundRoute);
          const redirectPath = (from.query.redirect || to.path) as string;
          const redirectURI = decodeURIComponent(redirectPath);
          const nextPath =
            to.path === redirectURI ? { ...to, replace: true } : { path: redirectURI };
          next(nextPath);
          return;
        } else {
          next();
          return;
        }
      }
    } else {
      // 没有Token，同时是忽略权限验证的页面
      if (to.meta.isIgnoreAuth) {
        next();
        return;
      } else {
        if (to.path === DEAULT_ROUTER_LINK.sign_in.path) {
          localStorage.clear();
          next();
          return;
        } else {
          next(DEAULT_ROUTER_LINK.sign_in.path);
          return;
        }
      }
    }
  });

  // 路由加载后
  router.afterEach(() => {
    NProgress.done();
  });
};
