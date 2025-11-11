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

  {
    path: '/personal',
    name: 'Personal',
    component: () => import('@/views/layouts/Personal.vue'),
    redirect: '/personal/setting',
    meta: {
      title: 'Dashboard',
      sort: 0,
      icon: 'mdi-view-dashboard',
      group: 'herodotus',
    },
    children: [
      {
        path: '/personal/setting',
        name: 'PersonalSetting',
        meta: { title: '主控台', icon: 'mdi-sign-text', isHideAllChild: true },
        component: () => import('@/views/personal/setting/Index.vue'),
      },
    ],
  },
];

export default routes;
