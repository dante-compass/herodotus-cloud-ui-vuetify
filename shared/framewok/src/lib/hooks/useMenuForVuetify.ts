import type { RouteRecordRaw } from 'vue-router';
import type { MenuItem } from '@/declarations';

import { RouterUtilities } from '../utilities';
import { isEmpty, partition } from 'lodash-es';

export default function useVuetifyMenu() {
  const findAvailableRoutes = (routes: Array<RouteRecordRaw>): Array<RouteRecordRaw> => {
    return routes.filter((item) => {
      return isEmpty(item.name);
    });
  };

  const findRouteElement = (item: RouteRecordRaw): RouteRecordRaw => {
    if (!isEmpty(item.children)) {
      const data = item.children as Array<RouteRecordRaw>;
      return data[0]!;
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
      if (isEmpty(element.children)) {
        return toLeaf(element);
      } else {
        const [root, leaf] = partition(element.children, (router) => isEmpty(router.path));
        // 非空断言（!）（谨慎使用）仅在确保值一定存在时使用.
        const route = root[0]!;
        return {
          title: route.meta?.title,
          prependIcon: route.meta?.icon,
          children: leaf.map((l) => toLeaf(l)),
        } as MenuItem;
      }
    });
  };

  const getMenuItems = (): Array<MenuItem> => {
    const routers = RouterUtilities.getInstance().getRouter().getRoutes() as Array<RouteRecordRaw>;
    const available = findAvailableRoutes(routers);
    return convert(available);
  };

  return {
    getMenuItems,
  };
}
