import { RouteRecordRaw } from 'vue-router';
import { RouterOptions } from './router';
export interface KernelOptions {
    router: RouterOptions;
    staticRoutes: Array<RouteRecordRaw>;
}
