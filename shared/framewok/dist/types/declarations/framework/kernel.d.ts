import { RouteRecordRaw } from 'vue-router';
import { RouterOptions } from './router';
import { HttpConfig, ThemeModeEnum } from '@herodotus/core';
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
export {};
