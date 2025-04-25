import type {
  HttpResult,
  AxiosHttpResult,
  AxiosTransform,
  AxiosResponse,
  RequestOptions,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosInstance,
} from '@herodotus-cloud/core';

import { logResponse, isSuccess } from '@herodotus-cloud/core';

import { getSystemHeaders } from '@/stores';
import { processor } from './status';

export const transform: AxiosTransform = {
  // 请求之前处理config
  beforeRequestHook(config, options) {
    return config;
  },

  /**
   * @description: 请求成功处理
   */
  transformRequestHook<D = unknown>(
    response: AxiosResponse<HttpResult<D>>,
    options?: RequestOptions,
  ): AxiosHttpResult<D> {
    if (isSuccess(response)) {
      if (options) {
        const { isTransformResponse } = options;
        // 不进行任何处理，直接返回
        // 用于页面代码可能需要直接获取code，data，message这些信息时开启
        if (isTransformResponse) {
          return response.data;
        }
      }
    }
    return response;
  },

  requestCatchHook<D = any>(error: AxiosError, options?: RequestOptions): HttpResult<D> {
    return error?.response?.data as HttpResult<D>;
  },

  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors(config: InternalAxiosRequestConfig) {
    const headers = getSystemHeaders();

    Object.keys(headers).forEach((key) => {
      if (config.headers && !config.headers[key]) {
        config.headers[key] = headers[key];
      }
    });

    return config;
  },

  /**
   * @description: 响应拦截器处理
   */
  responseInterceptors(response: AxiosResponse<any>): Promise<any> {
    if (process.env.NODE_ENV === 'development') {
      logResponse(response);
    }
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (isSuccess(response)) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },

  requestInterceptorsCatch(axiosInstance: AxiosInstance, error: AxiosError): Promise<any> {
    return Promise.reject(error);
  },

  responseInterceptorsCatch(axiosInstance: AxiosInstance, error: AxiosError): Promise<any> {
    return processor(axiosInstance, error);
  },
};
