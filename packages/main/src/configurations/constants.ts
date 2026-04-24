import type { DisplayElement, DisplayElementGroup } from '@/composables/declarations';

export const IS_PROD = import.meta.env.PROD;
export const IS_DEV = import.meta.env.DEV;
export const IS_SERVER = import.meta.env.SSR;

export const DEAULT_ROUTER_LINK = {
  root: {
    path: '/',
    name: 'Root',
    title: 'Root',
  },
  sign_in: {
    path: '/sign-in',
    name: 'SignIn',
  },
  home: {
    path: '/dashboard',
    name: 'Dashboard',
    title: '首页',
  },
  not_found: {
    path: '/:pathMatch(.*)*',
    name: 'PageNotFound',
    title: 'Page Not Found',
  },
};

export const PAGE_NAME = {
  SYS_USER: 'SysUser',
  SYS_ROLE: 'SysRole',
  SYS_PERMISSION: 'SysPermission',
  SYS_ATTRIBUTE: 'SysAttribute',
  SYS_ELEMENT: 'SysElement',
  SYS_DEFAULT_ROLE: 'SysDefaultRole',
  SYS_ORGANIZATION: 'SysOrganization',
  SYS_DEPARTMENT: 'SysDepartment',
  SYS_EMPLOYEE: 'SysEmployee',
  SYS_OWNERSHIP: 'SysOwnership',
  SYS_DICTIONARY: 'SysDictionary',
  OAUTH2_APPLICATION: 'OAuth2Application',
  OAUTH2_SCOPE: 'OAuth2Scope',
  OAUTH2_TOKEN: 'OAuth2Token',
  OAUTH2_COMPLIANCE: 'OAuth2Compliance',
  OAUTH2_AUDIT: 'OAuth2Audit',
  OAUTH2_DEVICE: 'OAuth2Device',
  OAUTH2_PRODUCT: 'OAuth2Product',
  OAUTH2_CREDENTIAL_RECORD: 'OAuth2CredentialRecord',
  ASSET_SERVER: 'AssetServer',
  ASSET_APPLICATION: 'AssetApplication',
  DATABASE_ACCOUNT: 'DatabaseAccount',
  DATABASE_CATALOG: 'DatabaseCatalog',
  DATABASE_INSTANCE: 'DatabaseInstance',
  WORKFLOW_DYNAMIC_FORM: 'WorkflowDynamicForm',
  WIDGETS_DYNAMIC_FORM: 'WidgetsDynamicForm',
  WORKFLOW_PROCESS_START: 'WorkflowProcessStart',
  WORKFLOW_PROCESS_APPROVE: 'WorkflowProcessApprove',
  SYS_TENANT_DATA_SOURCE: 'SysTenantDataSource',
  OSS_BUCKET: 'OssBucket',
  OSS_OBJECT: 'OssObject',
  SOCIAL_BINDING: 'SocialBinding',
  MGT_CERTIFICATE: 'MgtCertificate',
  MGT_CERTIFICATE_FILE: 'MgtCertificateFile',
  FOUNDATION_ACCOUNT: 'FoundationAccount',
  FOUNDATION_PROFILE: 'FoundationProfile',
  MESSAGE_INFORMATION: 'MessageInformation',
  MESSAGE_SETTING: 'MessageSetting',
  IOT_PRODUCT_CATEGORY: 'IotProductCategory',
  IOT_PRODUCT: 'IotProduct',
  IOT_DEVICE: 'IotDevice',
  IOT_TSL_FUNCTION: 'IotTslFunction',
  IOT_TSL_UNIT: 'IotTslUnit',
};

export const DATA_ITEM_STATUS: Array<DisplayElement> = [
  { color: 'success', icon: 'mdi-circle' },
  { color: 'error', icon: 'mdi-circle' },
  { color: 'warning', icon: 'mdi-circle' },
  { color: 'info', icon: 'mdi-circle' },
];

export const HTTP_METHOD_STYLE_GROUP: DisplayElementGroup = {
  PUT: { color: 'orange', icon: 'mdi-book-remove-multiple' },
  DELETE: { color: 'red', icon: 'mdi-book-minus-multiple' },
  POST: { color: 'green', icon: 'mdi-book-plus-multiple' },
  GET: { color: 'blue', icon: 'mdi-book-multiple' },
  ALL: { color: 'brown', icon: 'mdi-book-cog' },
};

export const GRANT_TYPE_STYLE_GROUP: DisplayElementGroup = {
  authorization_code: { color: 'pink', icon: 'mdi-security', text: '授权码认证' },
  client_credentials: { color: 'orange', icon: 'mdi-arrow-decision-auto', text: '客户端凭证认证' },
  refresh_token: { color: 'indigo', icon: 'mdi-cog-refresh', text: '刷新令牌认证' },
  password: { color: 'cyan', icon: 'mdi-file-key', text: '密码认证' },
  social_credentials: { color: 'light-blue', icon: 'mdi-charity', text: '社交化认证' },
  webauthn_credentials: {
    color: 'secondary',
    icon: 'mdi-account-key',
    text: 'Passkey 通行密钥认证',
  },
  'urn:ietf:params:oauth:grant-type:device_code': {
    color: 'primary',
    icon: 'mdi-devices',
    text: '设备激活码认证',
  },
  'urn:ietf:params:oauth:grant-type:jwt-bearer': {
    color: 'purple',
    icon: 'mdi-file-hidden',
    text: 'JWT Bearer 认证',
  },
};

export const COLOR_LIST: Array<string> = [
  'success',
  'error',
  'info',
  'warning',
  'accent',
  'secondary',
  'primary',
  'red',
  'pink',
  'purple',
  'deep-purple',
  'indigo',
  'blue',
  'light-blue',
  'cyan',
  'teal',
  'green',
  'light-green',
  'lime',
  'yellow',
  'amber',
  'orange',
  'deep-orange',
  'brown',
  'grey',
  'blue-grey',
];
