import type { RouteRecordRaw } from 'vue-router';
import type { MenuItem } from '@/declarations';

import { RouterUtilities } from '../utilities';
import { lodash } from '@herodotus-cloud/core';

export default function useVuetifyMenu() {
  const findAvailableRoutes = (routes: Array<RouteRecordRaw>): Array<RouteRecordRaw> => {
    return routes.filter((item) => {
      return lodash.isEmpty(item.name);
    });
  };

  const findRouteElement = (item: RouteRecordRaw): RouteRecordRaw => {
    if (!lodash.isEmpty(item.children)) {
      const data = item.children as Array<RouteRecordRaw>;
      return data[0];
    } else {
      return item;
    }
  };

  const toLeaf = (item: RouteRecordRaw): MenuItem => {
    return {
      title: item.meta?.title,
      prependIcon: item.meta?.icon,
      to: item.name,
    } as MenuItem;
  };

  const convert = (routes: Array<RouteRecordRaw>): Array<MenuItem> => {
    return routes.map((item) => {
      const element = findRouteElement(item);
      if (lodash.isEmpty(element.children)) {
        return toLeaf(element);
      } else {
        const [root, leaf] = lodash.partition(element.children, (router) =>
          lodash.isEmpty(router.path),
        );
        const route = root[0];
        return {
          title: route.meta?.title,
          prependIcon: route.meta?.icon,
          children: leaf.map((l) => toLeaf(l)),
        } as MenuItem;
      }
    });
  };

  const getMenuItems = (): Array<MenuItem> => {
    const routers = RouterUtilities.getInstance().getRouter().getRoutes();
    const available = findAvailableRoutes(routers);
    return convert(available);
  };

  return {
    getMenuItems,
  };
}
