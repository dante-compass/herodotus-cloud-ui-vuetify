import type { Router, RouteLocationRaw, RouteLocationNormalizedLoaded } from 'vue-router';
import type { OperationEnum } from '@herodotus-cloud/core';

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
