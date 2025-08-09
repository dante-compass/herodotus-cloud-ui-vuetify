import type {
  RawAxiosRequestConfig,
  RawAxiosRequestHeaders,
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from '@/declarations';

import type { HttpResult, AxiosHttpResult } from '../modules';

import { ContentTypeEnum } from '@/enums';

export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined;

export type RetryRequest = (value: any) => void;

export interface RequestOptions {
  // 指定当前请求的 ContentType 类型
  contentType: ContentTypeEnum;
  prohibitRepeatRequests?: boolean;
  isTransformResponse?: boolean;
  // Error message prompt type
  errorMessageMode?: ErrorMessageMode;

  // Whether to send token in header
  withToken?: boolean;
}

export interface AxiosHook {
  /**
   * @description: 请求前处理配置
   */
  onRequestHook?: (config: RawAxiosRequestConfig, options: RequestOptions) => RawAxiosRequestConfig;

  /**
   * @description: 请求成功处理
   */
  onResponseSuccessHook?: <D = unknown>(
    response: AxiosResponse<HttpResult<D>>,
    options?: RequestOptions,
  ) => AxiosHttpResult<D>;

  /**
   * @description: 请求失败处理
   */
  onResponseErrorHook?: <D = unknown>(error: AxiosError, options?: RequestOptions) => HttpResult<D>;

  /**
   * @description: 请求之前的拦截器
   */
  requestInterceptors: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig;

  /**
   * @description: 请求之后的拦截器
   */
  responseInterceptors: (response: AxiosResponse<any>) => Promise<any>;

  /**
   * @description: 请求之前的拦截器错误处理
   */
  requestInterceptorsError: (axiosInstance: AxiosInstance, error: AxiosError) => Promise<any>;

  /**
   * @description: 请求之后的拦截器错误处理
   */
  responseInterceptorsError: (axiosInstance: AxiosInstance, error: AxiosError) => Promise<any>;
}

export interface AxiosConfig extends RawAxiosRequestConfig {
  authenticationScheme?: string;
  hook?: AxiosHook;
  requestOptions?: RequestOptions;
}

interface AxiosParameterConverter {
  dataConvert: (params: Record<string, any>) => any;
}

export interface AxiosHeaderStrategy extends AxiosParameterConverter {
  headers: RawAxiosRequestHeaders;
}

export interface AxiosRequestStrategy extends AxiosParameterConverter {
  config: RawAxiosRequestConfig;
  options: RequestOptions;
}
