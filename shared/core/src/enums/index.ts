export enum ContentTypeEnum {
  URL_ENCODED,
  MULTI_PART,
  TEXT,
  JSON,
}

export enum HttpMethodEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum StatusEnum {
  FORBIDDEN,
  ENABLE,
  LOCKING,
  EXPIRED,
}

export enum AuthorizationTokenEnum {
  BASIC = 'Basic ',
  BEARER = 'Bearer ',
}

export enum AuthorizationGrantTypeEnum {
  AUTHORIZATION_CODE = 'authorization_code',
  REFRESH_TOKEN = 'refresh_token',
  CLIENT_CREDENTIALS = 'client_credentials',
  PASSWORD = 'password',
  SOCIAL_CREDENTIALS = 'social_credentials',
  WEBAUTHN_CREDENTIALS = 'webauthn_credentials',
  DEVICE_CODE = 'urn:ietf:params:oauth:grant-type:device_code',
  JWT_BEARER = 'urn:ietf:params:oauth:grant-type:jwt-bearer',
  TOKEN_EXCHANGE = 'urn:ietf:params:oauth:grant-type:token-exchange',
}

export enum OperationEnum {
  CREATE = 'create',
  EDIT = 'edit',
  AUTHORIZE = 'authorize',
  INFO = 'info',
  ALLOCATABLE = 'allocatable',
  SETUP = 'setup',
  INVOKE = 'invoke',
}
