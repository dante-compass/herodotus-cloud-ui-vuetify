import type { RouteRecordRaw } from 'vue-router';
import { CONSTANTS } from '/@/composables/constants';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/iot',
    component: () => import('/@/views/layouts/Index.vue'),
    meta: { title: '物联网管理', sort: 7, icon: 'mdi-drag-variant' },
    redirect: '/iot/product-category',
    children: [
      {
        path: '/iot/product-category',
        name: CONSTANTS.ComponentName.IOT_PRODUCT_CATEGORY,
        meta: { title: '分类管理', icon: 'mdi-format-list-checks', isHideAllChild: true },
        component: () => import('/@/views/pages/iot/product-category/Index.vue'),
        children: [
          {
            path: '/iot/product-category/content',
            name: 'IotProductCategoryContent',
            meta: { title: '分类详情', icon: 'mdi-clipboard-list', isDetailContent: true },
            component: () => import('/@/views/pages/iot/product-category/Content.vue'),
          },
        ],
      },
      {
        path: '/iot/product',
        name: CONSTANTS.ComponentName.IOT_PRODUCT,
        meta: { title: '产品管理', icon: 'mdi-cube', isHideAllChild: true },
        component: () => import('/@/views/pages/iot/product/Index.vue'),
        children: [
          {
            path: '/iot/product/content',
            name: 'IotProductContent',
            meta: { title: '产品详情', icon: 'mdi-cube-scan', isDetailContent: true },
            component: () => import('/@/views/pages/iot/product/Content.vue'),
          },
          {
            path: '/iot/product/info',
            name: 'IotProductInfo',
            meta: { title: '产品信息', icon: 'mdi-cube-send', isDetailContent: true },
            component: () => import('/@/views/pages/iot/product/Info.vue'),
          },
        ],
      },
      {
        path: '/iot/device',
        name: CONSTANTS.ComponentName.IOT_DEVICE,
        meta: { title: '设备管理', icon: 'mdi-router-network', isHideAllChild: true },
        component: () => import('/@/views/pages/iot/device/Index.vue'),
        children: [
          {
            path: '/iot/device/content',
            name: 'IotDeviceContent',
            meta: { title: '设备详情', icon: 'mdi-plus-network', isDetailContent: true },
            component: () => import('/@/views/pages/iot/device/Content.vue'),
          },
          {
            path: '/iot/device/info',
            name: 'IotDeviceInfo',
            meta: { title: '设备信息', icon: 'mdi-network-pos', isDetailContent: true },
            component: () => import('/@/views/pages/iot/device/Info.vue'),
          },
          {
            path: '/iot/device/setup',
            name: 'IotDeviceSetup',
            meta: { title: '设置属性', icon: 'mdi-cog-transfer-outline', isDetailContent: true },
            component: () => import('/@/views/pages/iot/device/Setup.vue'),
          },
          {
            path: '/iot/device/invoke',
            name: 'IotDeviceInvoke',
            meta: { title: '调用服务', icon: 'mdi-television-play', isDetailContent: true },
            component: () => import('/@/views/pages/iot/device/Invoke.vue'),
          },
        ],
      },
    ],
  },
];

export default routes;
