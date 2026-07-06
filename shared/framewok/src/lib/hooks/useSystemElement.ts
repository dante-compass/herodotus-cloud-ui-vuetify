import type { Router, RouteRecordRaw, RouteMeta } from 'vue-router';
import type { ElementRouteTree } from '@herodotus/core';
import type { ModuleNamespace, MenuItem, ElementMeta } from '@/declarations';

import { isEmpty } from 'lodash-es';

import { useElementStore } from '../stores';
import { MenuScenarioEnum } from '@/declarations';

export default function useSystemElement(
  vueModules: Record<string, unknown>,
  locate: (item: string) => string,
  getRoutesFromServer: (roles: string[]) => Promise<any>,
) {
  const getTitle = (item: RouteRecordRaw): string => {
    return item.meta?.title as string;
  };

  const getIcon = (item: RouteRecordRaw): string => {
    return item.meta?.icon as string;
  };

  /**
   * 获取路由条目中的 meta 中的 isDetailContent 属性值
   * @param item 路由条目
   * @returns isDetailContent 属性值
   */
  const isDetailContent = (item: RouteRecordRaw): boolean => {
    return item.meta?.isDetailContent as boolean;
  };

  /**
   * 将后端返回的 Element 数据条目，转换为 vue-router 格式，作为动态路由添加至 vue-router 中。
   * @param item 数据条目
   * @param modules 前端 Pages Vue 页面列表
   * @returns 路由记录
   */
  const convertToRouteRecordRaw = (item: ElementRouteTree, modules: ModuleNamespace): RouteRecordRaw => {
    const raw = {} as RouteRecordRaw;
    raw.path = item.name;
    raw.component = modules[locate(item.componentPath)];

    if (item.componentName) {
      raw.name = item.componentName;
    }
    if (item.redirect) {
      raw.redirect = item.redirect;
    }

    raw.meta = {
      icon: item.meta.icon,
      title: item.meta.title,
      ...(item.meta.sort && { sort: item.meta.sort }),
      ...(item.meta.isHaveChild && { isHaveChild: item.meta.isHaveChild }),
      ...(item.meta.isNotKeepAlive && { isNotKeepAlive: item.meta.isNotKeepAlive }),
      ...(item.meta.isHideAllChild && { isHideAllChild: item.meta.isHideAllChild }),
      ...(item.meta.isDetailContent && { isDetailContent: item.meta.isDetailContent }),
      ...(item.meta.isIgnoreAuth && { isIgnoreAuth: item.meta.isIgnoreAuth }),
    } as RouteMeta;

    return raw;
  };

  const convertToMenuLeaf = (item: RouteRecordRaw): MenuItem => {
    return {
      title: getTitle(item),
      prependIcon: getIcon(item),
      to: { name: item.name, path: item.path },
    } as MenuItem;
  };

  const convertToMenuNode = (item: RouteRecordRaw): MenuItem => {
    return {
      title: getTitle(item),
      prependIcon: getIcon(item),
      children: [],
    } as MenuItem;
  };

  const getMenuChildren = (node: ElementRouteTree, meta: ElementMeta): MenuItem[] => {
    let result = [];

    switch (node.scenario) {
      case MenuScenarioEnum.PERSONAL:
        result = meta.personalMenus;
        break;
      case MenuScenarioEnum.TESTING:
        result = meta.testingMenus;
        break;
      default:
        result = meta.appMenus;
        break;
    }

    return result;
  };

  const convert = (data: Array<ElementRouteTree>, modules: ModuleNamespace, isHideAllChild = false): ElementMeta => {
    const store = useElementStore();

    const routeRecords: RouteRecordRaw[] = [];
    const appMenus: MenuItem[] = [];
    const personalMenus: MenuItem[] = [];
    const testingMenus: MenuItem[] = [];

    data.forEach((node: ElementRouteTree) => {
      // 转换路由记录
      const raw = convertToRouteRecordRaw(node, modules);

      if (isDetailContent(raw)) {
        store.addDetailRoute(raw);
      }

      let menuItem = {} as MenuItem;

      if (node.children && node.children.length > 0) {
        const children = convert(node.children, modules, node.meta.isHideAllChild);

        raw.children = children.routeRecords;

        if (isHideAllChild) {
          menuItem = convertToMenuLeaf(raw);
        } else {
          const leaf = getMenuChildren(node, children);
          if (!isEmpty(leaf)) {
            menuItem = convertToMenuNode(raw);
            menuItem.children = leaf;
          } else {
            menuItem = convertToMenuLeaf(raw);
          }
        }
      } else {
        if (!isHideAllChild) {
          menuItem = convertToMenuLeaf(raw);
        }
      }

      routeRecords.push(raw);
      if (!isEmpty(menuItem)) {
        switch (node.scenario) {
          case MenuScenarioEnum.PERSONAL:
            personalMenus.push(menuItem);
            break;
          case MenuScenarioEnum.TESTING:
            testingMenus.push(menuItem);
            break;
          default:
            appMenus.push(menuItem);
            break;
        }
      }
    });

    return { routeRecords, appMenus, personalMenus, testingMenus };
  };

  const addRoutes = (router: Router, meta: ElementMeta) => {
    console.log('[Herodotus] |- Begin add dynamic routes');
    const store = useElementStore();
    store.addMenus(meta.appMenus, meta.personalMenus, meta.testingMenus);

    if (!isEmpty(meta.routeRecords)) {
      meta.routeRecords.forEach((item) => {
        router.addRoute(item as RouteRecordRaw);
      });
      console.log('[Herodotus] |- Dynamic routes add success!');
    } else {
      console.warn('[Herodotus] |- Dynamic routes is empty, skip!');
    }
  };

  const initBackendSecurity = async (router: Router, roles: string[]) => {
    const response = await getRoutesFromServer(roles);
    const routeData = response.data.menus as Array<ElementRouteTree>;
    const modules = vueModules as ModuleNamespace;
    const elementMeta = convert(routeData, modules);
    addRoutes(router, elementMeta);
  };

  return {
    initBackendSecurity,
  };
}
