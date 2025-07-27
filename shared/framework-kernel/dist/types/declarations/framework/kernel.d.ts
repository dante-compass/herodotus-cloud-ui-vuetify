import { RouterOptions } from './router';
import { HttpConfig } from '@herodotus-cloud/core';
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
    config: HttpConfig;
}
export {};
