import type {
  Router,
  MatcherLocation,
  RouteRecordRaw,
  RouteLocationRaw,
  RouteRecordNameGeneric,
  RouteLocationAsRelativeGeneric,
  RouteLocationAsPathGeneric,
} from "vue-router";

import type { OperationEnum } from "@herodotus/core";

export interface RouterOptions {
  instance: Router;
  path: {
    root: RouteLocationRaw;
    home: RouteLocationRaw;
    signIn: RouteLocationRaw;
  };
}

/**
 * 自定义一个 TabMeta
 *
 * 修复 error TS4023: Exported variable 'useTabsViewStore'  has or is using name 'ABORT_CONTROLLER_KEY' from external module 问题。
 *
 * 原因：MatcherLocation 是基础类型，如果从其中 Pick meta 类型，因为 meta 为 RouteMeta，RouteMeta 中包含了私有的 [LOADER_SET_KEY] 和 [ABORT_CONTROLLER_KEY] 定义，会导致编译出错。所以自定义一个 TabMeta 类型，解决编译出错问题。
 */
export interface TabMeta extends Record<PropertyKey, unknown> {}

export interface Tab extends Pick<MatcherLocation, "name" | "path"> {
  meta: TabMeta;
}

export type TabName = RouteRecordNameGeneric | null | undefined;

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
  [Symbol.toStringTag]: "Module";
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
  testingMenus: MenuItem[];
}

export type { RouteLocationNormalizedLoadedGeneric } from "vue-router";
