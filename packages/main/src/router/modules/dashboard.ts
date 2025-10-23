import type { RouteRecordRaw } from 'vue-router';

import { DEAULT_ROUTER_LINK } from '@/configurations';

const routes: Array<RouteRecordRaw> = [
  {
    path: DEAULT_ROUTER_LINK.home.path,
    name: 'Dashboard',
    component: () => import('@/views/layouts/Index.vue'),
    redirect: '/dashboard/console',
    meta: {
      title: 'Dashboard',
      sort: 0,
      icon: 'mdi-view-dashboard',
      group: 'herodotus',
    },
    children: [
      {
        path: '/dashboard/console',
        name: 'DashboardConsole',
        meta: { title: '主控台', icon: 'mdi-sign-text', isHideAllChild: true },
        component: () => import('@/views/dashboard/console/Index.vue'),
      },
    ],
  },
];

export default routes;
