/**
 * 获取方法中参数的类型
 */
export type ParametersType<T> = T extends (args: infer R) => any ? R : any;

/**
 * 数据字典定义
 */
export type Dictionary = {
  ordinal: number;
  name: string;
  value: string;
  label: string;
};

export interface Validation {
  validate: () => Promise<boolean>;
}

export type { QTableProps, QNotifyCreateOptions } from 'quasar';

export type { SweetAlertIcon, SweetAlertResult } from 'sweetalert2';

export type {
  RawAxiosRequestConfig,
  RawAxiosRequestHeaders,
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  AxiosRequestConfig,
  AxiosProgressEvent,
  InternalAxiosRequestConfig,
  CreateAxiosDefaults,
  Canceler,
  ParamsSerializerOptions,
} from 'axios';
