import type {
  Router,
  RouteRecordRaw,
  RouteLocationRaw,
  RouteLocationNormalizedLoaded,
  RouteLocationAsRelativeGeneric,
  RouteLocationAsPathGeneric,
} from 'vue-router';
import type { OperationEnum, Tree } from '@herodotus/core';

export interface RouterOptions {
  instance: Router;
  path: {
    root: RouteLocationRaw;
    home: RouteLocationRaw;
    signIn: RouteLocationRaw;
  };
}

export interface Tab extends Pick<RouteLocationNormalizedLoaded, 'name' | 'path' | 'meta'> {}

export interface PushParam {
  /**
   * 表格数据条目参数
   */
  item: string;
  /**
   * 额外参数
   */
  additional?: string;
  /**
   * 操作类型
   */
  operation?: OperationEnum;
}

export type RoutePushParam = Record<string, PushParam>;

export type ModuleNamespace = Record<string, any> & {
  [Symbol.toStringTag]: 'Module';
};

export interface MenuItem {
  title: string;
  prependIcon: string;
  to?: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric;
  value?: string;
  children?: MenuItem[];
}

export interface ElementMeta {
  routeRecords: RouteRecordRaw[];
  appMenus: MenuItem[];
  personalMenus: MenuItem[];
}
