import type { RouteRecordRaw } from 'vue-router';
import type { RouterOptions } from './router';
import type { HttpConfig } from '@herodotus-cloud/core';

export interface KernelOptions {
  router: RouterOptions;
  staticRoutes: Array<RouteRecordRaw>;
  config: HttpConfig;
  securityKey: string;
  redirectUri: string;
  tenantId: string;
  isUseCrypto: boolean;
  isAutoRefreshToken: boolean;
}
