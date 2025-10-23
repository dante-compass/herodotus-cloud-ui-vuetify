import type { RouteRecordRaw } from 'vue-router';

import { DEAULT_ROUTER_LINK } from '@/configurations/constants';

const RootRoute: RouteRecordRaw = {
  path: DEAULT_ROUTER_LINK.root.path,
  name: DEAULT_ROUTER_LINK.root.name,
  redirect: DEAULT_ROUTER_LINK.home.path,
  meta: {
    title: DEAULT_ROUTER_LINK.root.title,
  },
};

const SignInRoute: RouteRecordRaw = {
  path: DEAULT_ROUTER_LINK.sign_in.path,
  name: DEAULT_ROUTER_LINK.sign_in.name,
  component: () => import('@/views/sign-in/Index.vue'),
  meta: {
    title: '登录',
    isIgnoreAuth: true,
  },
};

const NoPermissionRoute: RouteRecordRaw = {
  path: '/403',
  name: 'NoPermission',
  component: () => import('@/components/application/error/403.vue'),
  meta: { title: 'No Permission' },
};

const ServiceErrorRoute: RouteRecordRaw = {
  path: '/500',
  name: 'ServiceError',
  component: () => import('@/components/application/error/500.vue'),
  meta: { title: 'Service Error' },
};

//普通路由 无需验证权限
export const staticRoutes: Array<RouteRecordRaw> = [
  RootRoute,
  SignInRoute,
  NoPermissionRoute,
  ServiceErrorRoute,
];
