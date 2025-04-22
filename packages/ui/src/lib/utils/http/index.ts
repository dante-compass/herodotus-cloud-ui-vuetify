import type {
  AxiosTransform,
  AxiosHttpResult,
  RequestOptions,
  HttpResult,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosError,
  AxiosInstance,
  BpmnDesignerResources,
  FormDesignerResources,
  HttpConfigOption,
} from '@/lib/declarations';

import { ContentTypeEnum } from '@/lib/definitions';
import {
  variables,
  createApi,
  createBpmnApi,
  createFormApi,
  createOssApi,
  Axios,
  DeploymentService,
  GroupService,
  UserService,
  DynamicFormService,
  logResponse,
  isSuccess,
} from '../base';

import { getSystemHeaders } from '@/stores';
import { processor } from './status';

const transform: AxiosTransform = {
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

export const http = new Axios(
  {
    timeout: 1000 * 12,
    withCredentials: true,
  },
  transform,
  {
    contentType: ContentTypeEnum.JSON,
    // 是否阻止重复请求，
    prohibitRepeatRequests: true,
    // 需要对返回数据进行处理
    isTransformResponse: true,
    // 消息提示类型
    errorMessageMode: 'message',

    // 是否携带token
    withToken: true,
  },
);

const options: HttpConfigOption = {
  project: variables.getProject(),
  clientId: variables.getClientId(),
  clientSecret: variables.getClientSecret(),
  oidc: variables.isUseOidc(),
};

export const api = createApi(http, options);

export const bpmnApi = createBpmnApi(http, options);

export const formApi = createFormApi(http, options);

export const ossApi = createOssApi(http, options);

class BpmnDesignerStorage implements BpmnDesignerResources {
  private static instance: BpmnDesignerStorage;

  private constructor() {}

  public static getInstance(): BpmnDesignerStorage {
    if (this.instance == null) {
      this.instance = new BpmnDesignerStorage();
    }
    return this.instance;
  }

  public user(): UserService {
    return bpmnApi.user();
  }

  public group(): GroupService {
    return bpmnApi.group();
  }

  public deployment(): DeploymentService {
    return bpmnApi.deployment();
  }

  public dynamicForm(): DynamicFormService {
    return formApi.dynamicForm();
  }
}

class FormDesignerStorage implements FormDesignerResources {
  private static instance: FormDesignerStorage;

  private constructor() {}

  public static getInstance(): FormDesignerStorage {
    if (this.instance == null) {
      this.instance = new FormDesignerStorage();
    }
    return this.instance;
  }

  public dynamicForm(): DynamicFormService {
    return formApi.dynamicForm();
  }
}

export const BpmnDesignerInstance = BpmnDesignerStorage.getInstance();
export const FormDesignerInstance = FormDesignerStorage.getInstance();
