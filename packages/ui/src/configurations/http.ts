import type { HttpConfigOption } from '@herodotus-cloud/core';

import { Axios, ContentTypeEnum } from '@herodotus-cloud/core';

import { VARIABLES } from '@/configurations';
import { transform } from './axios';

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

export const options: HttpConfigOption = {
  project: VARIABLES.getProject(),
  clientId: VARIABLES.getClientId(),
  clientSecret: VARIABLES.getClientSecret(),
  oidc: VARIABLES.isUseOidc(),
};
