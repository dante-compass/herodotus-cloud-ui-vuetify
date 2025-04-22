import type { AxiosResponse, ResponseStatus } from '@/declarations';

import { Toolkit } from '../../utils';

import qs from 'qs';

export const parseResponseStatus = (
  response: AxiosResponse<any>,
  message?: string,
): ResponseStatus => {
  const data = response.data;

  const responseStatus = {} as ResponseStatus;
  responseStatus.status = response.status;
  responseStatus.code = response.data && response.data.code ? response.data.code : 0;
  responseStatus.detail = data.error && data.error.detail ? data.error.detail : '';

  if (data.message) {
    responseStatus.message = data.message;
  } else {
    if (data.error && data.error.message) {
      responseStatus.message = data.error.message;
    } else {
      if (message) {
        responseStatus.message = message;
      }
    }
  }

  return responseStatus;
};

export const logResponse = (response: AxiosResponse<any>) => {
  const randomColor = `rgba(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(
    Math.random() * 255,
  )})`;
  console.log(
    '%c┍------------------------------------------------------------------------------------------┑',
    `color:${randomColor};`,
  );
  console.log('| 请求地址：', response.config.url);
  console.log('| 请求类型：', Toolkit.toUpper(response.config.method));
  console.log('| 请求参数：', qs.parse(response.config.params));
  console.log('| 响应数据：', response.data);
  console.log(
    '%c┕------------------------------------------------------------------------------------------┙',
    `color:${randomColor};`,
  );
};

export const isSuccess = (response: AxiosResponse<any>) => {
  if (response && response.status) {
    return /^(2|3)\d{2}$/.test(String(response.status));
  } else {
    return false;
  }
};
