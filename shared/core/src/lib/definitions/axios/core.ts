import type {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  ParamsSerializerOptions,
  RawAxiosRequestConfig,
  InternalAxiosRequestConfig,
  HttpResult,
  AxiosHook,
  AxiosHttpResult,
  AxiosHeaderStrategy,
  AxiosRequestStrategy,
  RequestOptions,
} from '@/declarations';

import { ContentTypeEnum, HttpMethodEnum } from '@/enums';

import axios from 'axios';
import qs from 'qs';

import { AxiosCanceler } from './canceler';
import { lodash } from '../../utils';

/**
 * @description:  axios module
 */
export class Axios {
  private axiosInstance: AxiosInstance;
  private readonly axiosConfig: RawAxiosRequestConfig;
  private readonly axiosHook: AxiosHook;
  private readonly defaultRequestOptions: RequestOptions;

  constructor(config: RawAxiosRequestConfig, hook: AxiosHook, options: RequestOptions) {
    this.axiosConfig = config;
    this.axiosHook = hook;
    this.defaultRequestOptions = options;
    this.axiosInstance = this.createAxiosInstance(config);
    this.setupInterceptors();
  }

  private createAxiosInstance(config: RawAxiosRequestConfig): AxiosInstance {
    return axios.create(config);
  }

  private getAxiosConfig(): RawAxiosRequestConfig {
    return this.axiosConfig;
  }

  private getAxiosHook(): AxiosHook {
    return this.axiosHook;
  }

  private getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }

  private getDefaultRequestOptions(): RequestOptions {
    return this.defaultRequestOptions;
  }

  private getAxiosHeaderStrategy(contentType: ContentTypeEnum): AxiosHeaderStrategy {
    switch (contentType) {
      case ContentTypeEnum.URL_ENCODED:
        return {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          dataConvert: (data: unknown) => {
            return qs.stringify(data, { arrayFormat: 'brackets' });
          },
        };
      case ContentTypeEnum.MULTI_PART:
        return {
          headers: { 'Content-Type': 'multipart/form-data' },
          dataConvert: (data: unknown) => {
            return data;
          },
        };
      default:
        return {
          headers: { 'Content-Type': 'application/json' },
          dataConvert: (data: unknown) => {
            return JSON.stringify(data);
          },
        };
    }
  }

  private setupInterceptors(): void {
    const hook = this.getAxiosHook();

    if (!hook) {
      return;
    }

    const {
      requestInterceptors,
      requestInterceptorsError,
      responseInterceptors,
      responseInterceptorsError,
    } = hook;

    const axiosCanceler = new AxiosCanceler();

    // Request interceptor configuration processing
    this.getAxiosInstance().interceptors.request.use(
      (config: InternalAxiosRequestConfig<any>) => {
        // If cancel repeat request is turned on, then cancel repeat request is prohibited
        const { prohibitRepeatRequests } = this.getDefaultRequestOptions();

        if (prohibitRepeatRequests) {
          axiosCanceler.addPending(config);
        }
        return requestInterceptors(config);
      },
      (error: AxiosError) => {
        return requestInterceptorsError(this.getAxiosInstance(), error);
      },
    );

    // Response result interceptor processing
    this.getAxiosInstance().interceptors.response.use(
      (response: AxiosResponse<any>) => {
        response && axiosCanceler.removePending(response.config);
        return responseInterceptors(response);
      },
      (error: AxiosError) => {
        return responseInterceptorsError(this.getAxiosInstance(), error);
      },
    );
  }

  /**
   * 把当前请求的 options 与全局 options 整合获得一个完整的 options
   */
  private mergeRequestOptions(options?: RequestOptions): RequestOptions {
    const requestOptions = this.getDefaultRequestOptions();
    if (!lodash.isEmpty(options)) {
      return Object.assign({}, requestOptions, options);
    } else {
      return requestOptions;
    }
  }

  /**
   * 把当前请求的 AxiosRequestConfig 与全局 AxiosRequestConfig 整合获得一个完整的 AxiosRequestConfig
   */
  private mergeRequestConfigs<D = any>(config?: RawAxiosRequestConfig<D>): RawAxiosRequestConfig {
    const axiosConfig = this.getAxiosConfig();

    const paramsSerializer: ParamsSerializerOptions = {
      serialize(params: any): string {
        return Object.keys(params)
          .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
          .join('&');
      },
    };

    const requestConfigs = Object.assign({ paramsSerializer }, axiosConfig);

    if (config) {
      return Object.assign({}, requestConfigs, config);
    } else {
      return requestConfigs;
    }
  }

  private setupRequestStrategy<D = any>(
    url: string,
    options: RequestOptions,
    config?: RawAxiosRequestConfig<D>,
  ): AxiosRequestStrategy {
    const { onRequestHook } = this.getAxiosHook();

    // 合并 options。把当前请求的 options 与全局 options 整合获得一个完整的 options
    const requestOptions = this.mergeRequestOptions(options);

    // 合并 axios request config。把当前请求的 AxiosRequestConfig 与全局 AxiosRequestConfig 整合获得一个完整的 AxiosRequestConfig
    let axiosRequestConfig: RawAxiosRequestConfig = this.mergeRequestConfigs<D>(config);
    if (onRequestHook && lodash.isFunction(onRequestHook)) {
      // 允许在 beforeRequestHook 中，对 AxiosRequestConfig 进行一些额外的设置
      axiosRequestConfig = onRequestHook(axiosRequestConfig, requestOptions);
    }

    const contentType: ContentTypeEnum = requestOptions.contentType;
    const strategy = this.getAxiosHeaderStrategy(contentType);
    if (axiosRequestConfig.headers) {
      axiosRequestConfig.headers = Object.assign(axiosRequestConfig.headers, strategy.headers);
    } else {
      axiosRequestConfig.headers = strategy.headers;
    }

    axiosRequestConfig.url = url;
    if (!lodash.isEmpty(axiosRequestConfig.data)) {
      axiosRequestConfig.data = strategy.dataConvert(axiosRequestConfig.data);
    }

    return {
      config: axiosRequestConfig,
      options: requestOptions,
      dataConvert: strategy.dataConvert,
    };
  }

  public get<T = any, D = any>(
    url: string,
    params = {},
    options = { contentType: ContentTypeEnum.JSON },
  ): Promise<AxiosHttpResult<T>> {
    let policy = this.setupRequestStrategy<D>(url, options, { params, method: HttpMethodEnum.GET });
    return this.request<T, D>(policy.config, policy.options);
  }

  /**
   * POST
   *
   * <T> 返回响应中实际 data 中的内容类型
   * <D> RequestBody 中的数据类型，实际对应 axios config 中的 data
   *
   * @param url 请求地址
   * @param data 放置在 RequestBody 中的数据
   * @param options 对当前请求设置的参数。
   * @param config 当前请求对 axios 特殊设置
   * @returns
   */
  public post<T = any, D = any>(
    url: string,
    data: D,
    options = { contentType: ContentTypeEnum.JSON },
    config?: RawAxiosRequestConfig<D>,
  ): Promise<AxiosHttpResult<T>> {
    let policy = this.setupRequestStrategy<D>(url, options, {
      ...config,
      data,
      method: HttpMethodEnum.POST,
    });
    return this.request<T, D>(policy.config, policy.options);
  }

  /**
   * POST
   *
   * <T> 返回响应中实际 data 中的内容类型
   * <D> RequestBody 中的数据类型，实际对应 axios config 中的 data
   *
   * @param url 请求地址
   * @param params 拼接在请求地址路径后面的参数，根据实际情况也可能不需要。
   * @param data 放置在 RequestBody 中的数据，根据实际情况也可能不需要
   * @param config 当前请求对 axios 特殊设置
   * @returns
   */
  public postWithParams<T = any, D = any>(
    url: string,
    params = {},
    data = {} as D,
    options = { contentType: ContentTypeEnum.JSON },
    config?: RawAxiosRequestConfig<D>,
  ): Promise<AxiosHttpResult<T>> {
    let policy = this.setupRequestStrategy<D>(url, options, {
      ...config,
      params,
      data,
      method: HttpMethodEnum.POST,
    });
    return this.request<T, D>(policy.config, policy.options);
  }

  /**
   * 更新操作。
   *
   * 针对 url 中有参数同时 request body 中也有数据的情况。额外增加一个方法，以防对现有的代码产生影响。
   *
   * <T> 返回响应中实际 data 中的内容类型
   * <D> RequestBody 中的数据类型，实际对应 axios config 中的 data
   *
   * @param url 请求地址
   * @param data 放置在 RequestBody 中的数据
   * @param options 对当前请求设置的参数。
   * @param config 当前请求对 axios 特殊设置
   * @returns 响应数据
   */
  public put<T = any, D = any>(
    url: string,
    data: D,
    options = { contentType: ContentTypeEnum.JSON },
    config?: RawAxiosRequestConfig<D>,
  ): Promise<AxiosHttpResult<T>> {
    let policy = this.setupRequestStrategy<D>(url, options, {
      ...config,
      data,
      method: HttpMethodEnum.PUT,
    });
    return this.request<T, D>(policy.config, policy.options);
  }

  /**
   * 更新操作。
   *
   * 针对 url 中有参数同时 request body 中也有数据的情况。额外增加一个方法，以防对现有的代码产生影响。
   *
   * <T> 返回响应中实际 data 中的内容类型
   * <D> RequestBody 中的数据类型，实际对应 axios config 中的 data
   *
   * @param url 请求地址
   * @param data 放置在 RequestBody 中的数据
   * @param options 对当前请求设置的参数。
   * @param config 当前请求对 axios 特殊设置
   * @returns 响应数据
   */
  public putWithParams<T = any, D = any>(
    url: string,
    params = {},
    data = {} as D,
    options = { contentType: ContentTypeEnum.JSON },
    config?: RawAxiosRequestConfig<D>,
  ): Promise<AxiosHttpResult<T>> {
    let policy = this.setupRequestStrategy<D>(url, options, {
      ...config,
      params,
      data,
      method: HttpMethodEnum.PUT,
    });
    return this.request<T, D>(policy.config, policy.options);
  }

  /**
   * 删除操作
   *
   * <T> 返回响应中实际 data 中的内容类型
   * <D> RequestBody 中的数据类型，实际对应 axios config 中的 data
   *
   * @param url 请求地址
   * @param params 拼接在请求地址路径后面的参数，根据实际情况也可能不需要。
   * @param data 放置在 RequestBody 中的数据，根据实际情况也可能不需要
   * @param options 对当前请求设置的参数。
   * @returns 响应数据
   */
  public delete<T = any, D = any>(
    url: string,
    data = {} as D,
    options = { contentType: ContentTypeEnum.JSON },
  ): Promise<AxiosHttpResult<T>> {
    let policy = this.setupRequestStrategy<D>(url, options, {
      data,
      method: HttpMethodEnum.DELETE,
    });
    return this.request<T, D>(policy.config, policy.options);
  }

  /**
   * 删除操作。
   *
   * 针对 url 中有参数同时 request body 中也有数据的情况。额外增加一个方法，以防对现有的代码产生影响。
   *
   * <T> 返回响应中实际 data 中的内容类型
   * <D> RequestBody 中的数据类型，实际对应 axios config 中的 data
   *
   * @param url 请求地址
   * @param params 拼接在请求地址路径后面的参数，根据实际情况也可能不需要。
   * @param data 放置在 RequestBody 中的数据，根据实际情况也可能不需要
   * @param options 对当前请求设置的参数。
   * @returns 响应数据
   */
  public deleteWithParams<T = any, D = any>(
    url: string,
    params = {},
    data = {} as D,
    options = { contentType: ContentTypeEnum.JSON },
  ): Promise<AxiosHttpResult<T>> {
    let policy = this.setupRequestStrategy<D>(url, options, {
      params,
      data,
      method: HttpMethodEnum.DELETE,
    });
    return this.request<T, D>(policy.config, policy.options);
  }

  /**
   * 请求核心方法
   * @param config axios request 必要参数
   * @param options 针对每个请求特别指定的参数
   * @returns 响应数据
   */
  public request<T = any, D = any>(
    config: RawAxiosRequestConfig<D>,
    options?: RequestOptions,
  ): Promise<AxiosHttpResult<T>> {
    return new Promise<AxiosHttpResult<T>>((resolve, reject) => {
      const { onResponseErrorHook, onResponseSuccessHook } = this.getAxiosHook();
      this.getAxiosInstance()
        .request<HttpResult<T>, AxiosResponse<HttpResult<T>>, D>(config)
        .then((response: AxiosResponse<HttpResult<T>>) => {
          if (onResponseSuccessHook && lodash.isFunction(onResponseSuccessHook)) {
            const result = onResponseSuccessHook(response, options);
            resolve(result);
          } else {
            resolve(response);
          }
        })
        .catch((error: AxiosError) => {
          if (onResponseErrorHook && lodash.isFunction(onResponseErrorHook)) {
            reject(onResponseErrorHook(error, options));
          } else {
            reject(error);
          }
        });
    });
  }
}
