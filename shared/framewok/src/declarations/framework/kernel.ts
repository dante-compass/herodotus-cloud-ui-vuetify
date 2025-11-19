import type { RouteRecordRaw } from 'vue-router';
import type { RouterOptions } from './router';
import type { HttpConfig } from '@herodotus/core';

import { ThemeModeEnum } from '@herodotus/core';

interface VariableOptions {
  securityKey: string;
  redirectUri: string;
  tenantId: string;
  isUseCrypto: boolean;
  isAutoRefreshToken: boolean;
}

export interface KernelOptions {
  router: RouterOptions;
  variables: VariableOptions;
  staticRoutes: Array<RouteRecordRaw>;
  config: HttpConfig;
  theme: ThemeModeEnum;
  signOutExtension: () => void;
}
