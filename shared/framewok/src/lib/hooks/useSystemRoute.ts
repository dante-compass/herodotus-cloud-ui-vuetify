import type { RouteRecordRaw, RouteMeta, Router } from 'vue-router';
import type { ElementRouteTree } from '@herodotus/core';
import type { ModuleNamespace } from '@/declarations';

import { useRouterStore } from '../stores';
import { isEmpty } from 'lodash-es';

export default function useSystemRoute(
  routeModules: Record<string, unknown>,
  vueModules: Record<string, unknown>,
  locate: (item: string) => string,
  getRoutesFromServer: (roles: string[]) => Promise<any>,
) {
  /**
   * 将后端返回的路由 JSON 转换为前端可识别的格式，主要解决 vite 环境下，component 的 import 问题
   * @param dataimport { ModuleNamespace } from 'vite/types/hot';
   * import default from './../../../vite.config';
   * @returns
   */
  const convert = (data: Array<ElementRouteTree>): Array<RouteRecordRaw> => {
    const modules = vueModules as ModuleNamespace;
    return data.map((item: ElementRouteTree) => {
      const raw = {} as RouteRecordRaw;
      raw.path = item.name;
      raw.component = modules[locate(item.componentPath)];
      if (item.componentName) {
        raw.name = item.componentName;
      }
      if (item.redirect) {
        raw.redirect = item.redirect;
      }

      raw.meta = {} as RouteMeta;
      raw.meta['icon'] = item.meta.icon;
      raw.meta['title'] = item.meta.title;

      if (item.meta.sort) {
        raw.meta['sort'] = item.meta.sort;
      }
      if (item.meta.isHaveChild) {
        raw.meta['isHaveChild'] = item.meta.isHaveChild;
      }
      if (item.meta.isNotKeepAlive) {
        raw.meta['isNotKeepAlive'] = item.meta.isNotKeepAlive;
      }
      if (item.meta.isHideAllChild) {
        raw.meta['isHideAllChild'] = item.meta.isHideAllChild;
      }
      if (item.meta.isDetailContent) {
        raw.meta['isDetailContent'] = item.meta.isDetailContent;
      }
      if (item.meta.isIgnoreAuth) {
        raw.meta['isIgnoreAuth'] = item.meta.isIgnoreAuth;
      }
      // if (item.roles) {
      //   raw.meta['roles'] = item.roles;
      // }
      if (!isEmpty(item.children)) {
        raw.children = convert(item.children as Array<ElementRouteTree>);
      }

      return raw;
    });
  };

  const getRoutesFromLocal = () => {
    const routes: Array<RouteRecordRaw> = [];
    const modules = routeModules as ModuleNamespace;
    Object.keys(modules).forEach((key) => {
      const item = modules[key];
      const module = item.default || {};
      const list = Array.isArray(module) ? [...module] : [module];
      routes.push(...list);
    });
    return routes;
  };

  const sorting = (a: RouteRecordRaw, b: RouteRecordRaw): number => {
    const aValue = a.meta?.sort || 0;
    const bValue = b.meta?.sort || 0;
    return (aValue as number) - (bValue as number);
  };

  const dynamicAddRoutes = (router: Router, routes: Array<RouteRecordRaw>) => {
    routes.forEach((item) => {
      router.addRoute(item as RouteRecordRaw);
    });
    console.log('[Herodotus] |- Dynamic routes add success!');
  };

  const reloadDynamicRoutes = (router: Router) => {
    const store = useRouterStore();
    dynamicAddRoutes(router, store.routes);
    console.log('[Herodotus] |- Dynamic routes reload success!');
  };

  const addRoutes = (router: Router, routes: Array<RouteRecordRaw>) => {
    const store = useRouterStore();

    console.log('[Herodotus] |- Begin add dynamic routes');

    if (!isEmpty(routes)) {
      store.addDynamicRoutes(routes);
      dynamicAddRoutes(router, routes);
    } else {
      console.warn('[Herodotus] |- Dynamic routes is empty, skip!');
    }
  };

  const initBackEndRoutes = async (router: Router, roles: string[]) => {
    const response = await getRoutesFromServer(roles);
    const routeData = response.data.menus as Array<ElementRouteTree>;
    // 将后端路由数据转换为前端可识别路由格式
    const routes = convert(routeData);
    addRoutes(router, routes);
  };

  const initFrontEndRoutes = async (router: Router) => {
    const routes = getRoutesFromLocal();
    const data = routes.sort(sorting);
    console.log(data);
    addRoutes(router, data);
  };

  return {
    initBackEndRoutes,
    initFrontEndRoutes,
  };
}
