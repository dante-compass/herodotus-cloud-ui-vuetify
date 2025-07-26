import { RouteRecordRaw } from 'vue-router';
import { RouterOptions } from './router';
import { HttpConfig } from '@herodotus-cloud/core';
export interface KernelOptions {
    router: RouterOptions;
    staticRoutes: Array<RouteRecordRaw>;
    config: HttpConfig;
    securityKey: string;
    redirectUri: string;
    isUseCrypto: boolean;
    isAutoRefreshToken: boolean;
}
