import type { RouteRecordRaw } from 'vue-router';
import type { RouterOptions } from './router';

export interface KernelOptions {
  router: RouterOptions;
  staticRoutes: Array<RouteRecordRaw>;
}
