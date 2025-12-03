import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

import type { RouteRecordRaw, RouteLocationNormalizedLoaded } from 'vue-router';
import type { RoutePushParam, PushParam, MenuItem } from '@/declarations';

import { isEmpty, has } from 'lodash-es';

export const useElementStore = defineStore('SystemElement', () => {
  const appMenus = ref<MenuItem[]>([]),
    personalMenus = ref<MenuItem[]>([]),
    cachedRoutes = ref<string[]>([]),
    details = ref<Map<any, any>>(new Map()),
    pushParams = ref<RoutePushParam>({});

  const isDynamicRouteAdded = computed(() => {
    return !isEmpty(appMenus.value) || !isEmpty(personalMenus.value);
  });

  /**
   * 查询三级路由组件
   * @param key 三级路由组件名称
   * @returns 组件名称
   */
  const getDetailComponent = (key: string) => {
    return details.value.get(key);
  };

  /**
   * 获取 Vue Router Push 类型参数
   * @param key 组件名称
   * @returns Push 类型参数
   */
  const getRoutePushParam = (key: string) => {
    return pushParams.value[key];
  };

  /**
   * 将路由添加至缓存
   * @param route 路由
   */
  const addCachedRoute = (route: RouteLocationNormalizedLoaded) => {
    if (!route.meta?.isNotKeepAlive) {
      const name = route.name as string;
      if (!cachedRoutes.value.includes(name)) {
        cachedRoutes.value.push(name);
      }
    }
  };

  /**
   * 添加三级路由
   * @param item 路由条目
   */
  const addDetailRoute = (item: RouteRecordRaw) => {
    const componentName = item.name as string;
    if (componentName) {
      details.value.set(componentName, item.component);
    }
  };

  const addMenus = (app: MenuItem[], personal: MenuItem[]) => {
    if (!isEmpty(app)) {
      appMenus.value = app;
    }

    if (!isEmpty(personal)) {
      personalMenus.value = personal;
    }
  };

  /**
   * 判断路由中是否包含 Push 路由
   * @param route 路由
   * @returns true 包含参数，false 不包含参数
   */
  const hasParameter = (route: RouteLocationNormalizedLoaded): boolean => {
    const name = route.name as string;

    if (name && has(pushParams.value, name)) {
      return true;
    }

    return false;
  };

  /**
   * 判断是否为三级路由
   * @param route 路由
   * @returns true 是三级路由，false 不是三级路由
   */
  const isDetailRoute = (route: RouteLocationNormalizedLoaded): boolean => {
    if (route.meta) {
      if (route.meta.isDetailContent) {
        return true;
      }
    }
    return false;
  };

  /**
   * 判断当前是否为有效的三级路由
   * @param route 路由
   * @returns true 是三级路由，false 不是三级路由
   */
  const isValidDetailRoute = (route: RouteLocationNormalizedLoaded): boolean => {
    return isDetailRoute(route) && hasParameter(route);
  };

  /**
   * 向当前缓存添加 Push 参数
   * @param name 参数名称
   * @param params 参数值
   */
  const addRoutePushParam = (name: string, params = {} as PushParam) => {
    if (name) {
      pushParams.value[name] = params;
    }
  };

  /**
   * 从当前缓存中删除 Push 参数
   * @param name 参数名称
   */
  const removeRoutePushParam = (name: string) => {
    if (name) {
      delete pushParams.value[name];
    }
  };

  return {
    isDynamicRouteAdded,
    getDetailComponent,
    getRoutePushParam,
    addCachedRoute,
    addDetailRoute,
    addMenus,
    hasParameter,
    isDetailRoute,
    isValidDetailRoute,
    addRoutePushParam,
    removeRoutePushParam,
  };
});
