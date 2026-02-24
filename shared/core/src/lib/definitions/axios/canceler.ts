import type { AxiosRequestConfig, Canceler } from '@/declarations';

import axios from 'axios';
import qs from 'qs';
import { isFunction, isEmpty } from 'lodash-es';

// Used to store the identification and cancellation function of each request
let pendingMap = new Map<string, Canceler>();

const convertParams = (params: any) => {
  let paramsString = '';
  if (params) {
    if (typeof params === 'string') {
      paramsString = params;
    } else if (params instanceof URLSearchParams) {
      paramsString = params.toString();
    } else if (typeof params === 'object') {
      // 使用 qs 序列化，并按键排序
      paramsString = qs.stringify(params, {
        sort: (a, b) => a.localeCompare(b), // 保证顺序稳定
        // 可添加其他选项与 Axios 默认行为对齐
      });
    } else {
      // 其他类型按实际情况处理，或转为字符串
      paramsString = String(params);
    }
  }

  return paramsString;
};

export const getPendingUrl = (config: AxiosRequestConfig) => {
  if (!isEmpty(config.params)) {
    const params = convertParams(config.params);
    return [config.method, config.url, params].join('|');
  }

  return [config.method, config.url].join('|');
};

export class AxiosCanceler {
  /**
   * Add request
   * @param {Object} config
   */
  addPending(config: AxiosRequestConfig) {
    this.removePending(config);
    const url = getPendingUrl(config);
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel) => {
        if (!pendingMap.has(url)) {
          // If there is no current request in pending, add it
          pendingMap.set(url, cancel);
        }
      });
  }

  /**
   * @description: Clear all pending
   */
  removeAllPending() {
    pendingMap.forEach((cancel) => {
      cancel && isFunction(cancel) && cancel();
    });
    pendingMap.clear();
  }

  /**
   * Removal request
   * @param {Object} config
   */
  removePending(config: AxiosRequestConfig) {
    const url = getPendingUrl(config);

    if (pendingMap.has(url)) {
      // If there is a current request identifier in pending,
      // the current request needs to be cancelled and removed
      const cancel = pendingMap.get(url);
      cancel && cancel(url);
      pendingMap.delete(url);
    }
  }

  /**
   * @description: reset
   */
  reset(): void {
    pendingMap = new Map<string, Canceler>();
  }
}
