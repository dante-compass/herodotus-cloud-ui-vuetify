import type { Tree } from './base';

export interface MenuItem {
  title: string | unknown;
  prependIcon: string | unknown;
  to?: string;
  value?: string;
  $children?: MenuItem[];
}

export interface RemoteRouteMeta {
  title: string;
  icon: string;
  sort: number;
  isHaveChild?: boolean;
  isNotKeepAlive?: boolean;
  isHideAllChild?: boolean;
  isDetailContent?: boolean;
  isIgnoreAuth?: boolean;
}
export interface RemoteRoute extends Tree {
  componentName: string;
  componentPath: string;
  redirect: string;
  meta: RemoteRouteMeta;
  roles: Array<string>;
  children?: Array<RemoteRoute>;
}

export interface WidgetItem {
  tooltip: string;
  icon: string;
  path: string;
}
