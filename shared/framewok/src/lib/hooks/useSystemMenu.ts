import type { RouteRecordRaw } from 'vue-router';
import type { MenuItem } from '@/declarations';

import { isEmpty, intersection } from 'lodash-es';
import { useRouterStore, useAuthenticationStore } from '../stores';

export default function useSystemMenu() {
  const router = useRouterStore();
  const authentication = useAuthenticationStore();

  const getTitle = (item: RouteRecordRaw): string => {
    return item.meta?.title as string;
  };

  const getIcon = (item: RouteRecordRaw): string => {
    return item.meta?.icon as string;
  };

  /**
   * 获取 router 中的 children
   * @param item 路由条目
   * @returns router children 数组
   */
  const getChildren = (item: RouteRecordRaw): Array<RouteRecordRaw> => {
    return item.children as Array<RouteRecordRaw>;
  };

  /**
   * 判断 router 条目是否包含 children
   * @param item 路由条目
   * @returns true 包含，false 不包含
   */
  const hasChildren = (item: RouteRecordRaw): boolean => {
    return !!getChildren(item);
  };

  /**
   * 获取路由条目中的 meta 中的 isHideAllChild 属性值
   * @param item 路由条目
   * @returns isHideAllChild 属性值
   */
  const isHideAllChild = (item: RouteRecordRaw): boolean => {
    return item.meta?.isHideAllChild as boolean;
  };

  const toLeaf = (item: RouteRecordRaw): MenuItem => {
    return {
      title: getTitle(item),
      prependIcon: getIcon(item),
      to: { name: item.name, path: item.path },
    } as MenuItem;
  };

  /**
   * 判断是否为独立展示的菜单条目。
   * @param item 路由条目
   * @returns true 独立展示，false 菜单分组
   */
  const isDisplayedItem = (item: RouteRecordRaw): boolean => {
    if (!hasChildren(item)) {
      return true;
    } else {
      // 如果菜单条目中包含隐藏菜单，则将其加入到 Detail Route 中
      if (isHideAllChild(item)) {
        // 代码逻辑实际上放在此处不合适，只是为了减少路由的遍历
        router.addDetailRoutes(item);
        return true;
      } else {
        return false;
      }
    }
  };

  /**
   * 该方法为当前 Quasar 版本使用。目前 Quasar 版本菜单权限有优化空间，等优化后，该方法可以删除
   * @param item 路由条目
   * @returns 判断路由条目是否有权限
   */
  const hasPermission = (item: RouteRecordRaw): boolean => {
    const userRoles = authentication.roles;
    const routeRoles = item.meta?.roles as Array<string>;

    // 如果路由中没有设置任何角色，则认为所有人都有权限
    if (isEmpty(routeRoles)) {
      return true;
    }

    // 路由中有角色设置，但用户角色为空，则认为没有权限
    if (isEmpty(userRoles)) {
      return false;
    }

    // 当前两边角色都不为空
    // 取两者交集，如果交集为空，则认为没有权限，如果存在交集，责任为有权限
    const result = intersection(userRoles, routeRoles);

    if (isEmpty(result)) {
      return false;
    } else {
      return true;
    }
  };

  /**
   * 该方法为 Vuetify Menu 使用。直接转换为 Items，提供给 v-list 组件
   * @param routes 路由
   * @returns menu
   */
  const convert = (routes: Array<RouteRecordRaw>): Array<MenuItem> => {
    return routes.map((item) => {
      if (isDisplayedItem(item)) {
        return toLeaf(item);
      } else {
        return {
          title: getTitle(item),
          prependIcon: getIcon(item),
          children: convert(getChildren(item)),
        } as MenuItem;
      }
    });
  };

  /**
   * 该方法为 Vuetify Menu 使用。直接转换为 Items，提供给 v-list 组件
   * @param routes 路由
   * @returns menu
   */
  const getMenuItems = (): Array<MenuItem> => {
    const routers = router.routes;
    return convert(routers);
  };

  return {
    getMenuItems,
    hasPermission,
    getTitle,
    getIcon,
    getChildren,
    isDisplayedItem,
  };
}
