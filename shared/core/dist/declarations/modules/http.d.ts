import { AxiosResponse } from 'axios';
import { AccessTokenResponse, DeviceAuthorizationResponse } from './oauth2';
import { HttpMethodEnum } from '../../enums';
export type HttpMethod = keyof typeof HttpMethodEnum;
export type Result<T = unknown> = {
    code: number;
    message: string;
    path: string;
    data: T;
    status: number;
    timestamp: string;
    error?: {
        detail: string;
        message: string;
        code: string;
        field: string;
    };
};
export interface ResponseStatus {
    message: string;
    status: number;
    code: number;
    detail?: string;
}
export interface HttpConfigOption {
    project: string;
    clientId: string;
    clientSecret: string;
    oidc?: boolean;
    proxy?: string;
}
export type HttpResult<T = unknown> = AccessTokenResponse & DeviceAuthorizationResponse & Result<T> & T[] & T & unknown;
export type AxiosHttpResult<T = unknown> = AxiosResponse<HttpResult<T>> | HttpResult<T>;
