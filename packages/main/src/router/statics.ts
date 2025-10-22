import type { RouteRecordRaw } from 'vue-router';

import { PATH } from '@/configurations/constants';

const NoPermissionRoute: RouteRecordRaw = {
  path: '/403',
  name: 'NoPermission',
  component: () => import('@/components/application/error/403.vue'),
  meta: { title: 'No Permission' },
};

const NotFoundRoute: RouteRecordRaw = {
  path: '/404',
  name: 'NotFound',
  component: () => import('@/components/application/error/404.vue'),
  meta: { title: 'Not Found' },
};

const ServiceErrorRoute: RouteRecordRaw = {
  path: '/500',
  name: 'ServiceError',
  component: () => import('@/components/application/error/500.vue'),
  meta: { title: 'Service Error' },
};

const PageNotFoundRoute: RouteRecordRaw = {
  path: PATH.NOT_FOUND,
  name: PATH.NOT_FOUND_NAME,
  component: () => import('@/components/application/error/404.vue'),
  meta: {
    title: 'ErrorPage',
  },
};

//普通路由 无需验证权限
export const staticRoutes: Array<RouteRecordRaw> = [
  NoPermissionRoute,
  NotFoundRoute,
  ServiceErrorRoute,
  PageNotFoundRoute,
];
