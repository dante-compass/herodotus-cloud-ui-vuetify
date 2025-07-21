import { defineStore } from 'pinia';

import type { RouteRecordRaw, RouteLocationNormalizedLoaded } from 'vue-router';
import type { RoutePushParam, PushParam } from '@/declarations';

import { Toolkit } from '@/lib/base';

export const useRouterStore = defineStore('Router', {
  state: () => ({
    routes: [] as Array<RouteRecordRaw>,
    cachedRoutes: [] as string[],
    details: new Map<any, any>(),
    isRemote: true,
    pushParams: {} as RoutePushParam,
  }),

  getters: {
    isDynamicRouteAdded(): boolean {
      return !Toolkit.isEmpty(this.routes);
    },
  },

  actions: {
    /**
     * 查询三级路由组件
     * @param key 三级路由组件名称
     * @returns 组件名称
     */
    getDetailComponent(key: string) {
      return this.details.get(key);
    },

    /**
     * 获取 Vue Router Push 类型参数
     * @param key 组件名称
     * @returns Push 类型参数
     */
    getRoutePushParam(key: string) {
      return this.pushParams[key];
    },

    /**
     * 添加动态路由
     * @param routes 路由列表
     */
    addDynamicRoutes(routes: Array<RouteRecordRaw>) {
      this.routes = routes;
    },

    /**
     * 将路由添加至缓存
     * @param route 路由
     */
    addCachedRoute(route: RouteLocationNormalizedLoaded) {
      if (!route.meta?.isNotKeepAlive) {
        const name = route.name as string;
        if (!this.cachedRoutes.includes(name)) {
          this.cachedRoutes.push(name);
        }
      }
    },

    /**
     * 添加三级路由
     * @param item 路由条目
     */
    addDetailRoutes(item: RouteRecordRaw) {
      const children: Array<RouteRecordRaw> = item.children || [];
      if (!Toolkit.isEmpty(children)) {
        children.forEach((child) => {
          const componentName = child.name as string;
          if (componentName) {
            this.details.set(componentName, child.component);
          }
        });
      }
    },

    /**
     * 判断路由中是否包含 Push 路由
     * @param route 路由
     * @returns true 包含参数，false 不包含参数
     */
    hasParameter(route: RouteLocationNormalizedLoaded): boolean {
      const name = route.name as string;

      if (name && Toolkit.has(this.pushParams, name)) {
        return true;
      }

      return false;
    },

    /**
     * 判断是否为三级路由
     * @param route 路由
     * @returns true 是三级路由，false 不是三级路由
     */
    isDetailRoute(route: RouteLocationNormalizedLoaded): boolean {
      if (route.meta) {
        if (route.meta.isDetailContent) {
          return true;
        }
      }
      return false;
    },

    /**
     * 判断当前是否为有效的三级路由
     * @param route 路由
     * @returns true 是三级路由，false 不是三级路由
     */
    isValidDetailRoute(route: RouteLocationNormalizedLoaded): boolean {
      return this.isDetailRoute(route) && this.hasParameter(route);
    },

    /**
     * 向当前缓存添加 Push 参数
     * @param name 参数名称
     * @param params 参数值
     */
    addRoutePushParam(name: string, params = {} as PushParam) {
      if (name) {
        this.pushParams[name] = params;
      }
    },

    /**
     * 从当前缓存中删除 Push 参数
     * @param name 参数名称
     */
    removeRoutePushParam(name: string) {
      if (name) {
        delete this.pushParams[name];
      }
    },
  },
});
