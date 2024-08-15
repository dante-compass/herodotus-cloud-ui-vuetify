import type { DisplayElementGroup, DisplayElement } from '/@/lib/declarations';

export const HTTP_METHOD_STYLE_GROUP: DisplayElementGroup = {
  PUT: { color: 'orange', icon: 'mdi-book-remove-multiple' },
  DELETE: { color: 'red', icon: 'mdi-book-minus-multiple' },
  POST: { color: 'green', icon: 'mdi-book-plus-multiple' },
  GET: { color: 'blue', icon: 'mdi-book-multiple' },
  ALL: { color: 'black', icon: 'mdi-book-cog' }
};

export const DATA_ITEM_STATUS: Array<DisplayElement> = [
  { color: 'green', icon: 'mdi-database-check' },
  { color: 'error', icon: 'mdi-database-off' },
  { color: 'error', icon: 'mdi-database-lock' },
  { color: 'warning', icon: 'mdi-database-clock' }
];

export const DEFAULT_HTTP_METHOD_STYLE: DisplayElement = HTTP_METHOD_STYLE_GROUP.GET;

export const GRANT_TYPE_STYLE_GROUP: DisplayElementGroup = {
  authorization_code: { color: 'pink', icon: 'mdi-security', text: '授权码认证' },
  client_credentials: { color: 'teal', icon: 'mdi-arrow-decision-auto', text: '客户端凭证认证' },
  refresh_token: { color: 'indigo', icon: 'mdi-cog-refresh', text: '刷新令牌认证' },
  password: { color: 'cyan', icon: 'mdi-file-key', text: '密码认证' },
  social_credentials: { color: 'light-blue', icon: 'mdi-cast-connected', text: '社交化认证' },
  'urn:ietf:params:oauth:grant-type:device_code': { color: 'primary', icon: 'mdi-devices', text: '设备激活码认证' },
  'urn:ietf:params:oauth:grant-type:jwt-bearer': { color: 'purple', icon: 'mdi-file-hidden', text: 'JWT Bearer 认证' }
};

export const Path = {
  ROOT: '/',
  // 登录
  SIGN_IN: '/sign-in',
  // 首页
  HOME: '/dashboard',
  HOME_NAME: 'Dashboard',
  HOME_TITLE: '首页',
  // 错误
  NOT_FOUND: '/:path(.*)*',
  NOT_FOUND_NAME: 'PageNotFound',
};

export const ComponentName = {
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
  OAUTH2_APPLICATION: 'OAuth2Application',
  OAUTH2_SCOPE: 'OAuth2Scope',
  OAUTH2_TOKEN: 'OAuth2Token',
  OAUTH2_COMPLIANCE: 'OAuth2Compliance',
  OAUTH2_DEVICE: 'OAuth2Device',
  OAUTH2_PRODUCT: 'OAuth2Product',
  ASSET_SERVER: 'AssetServer',
  ASSET_APPLICATION: 'AssetApplication',
  DATABASE_ACCOUNT: 'DatabaseAccount',
  DATABASE_CATALOG: 'DatabaseCatalog',
  DATABASE_INSTANCE: 'DatabaseInstance',
  MESSAGE_INFORMATION: 'MessageInformation',
  WORKFLOW_DYNAMIC_FORM: 'WorkflowDynamicForm',
  WIDGETS_DYNAMIC_FORM: 'WidgetsDynamicForm',
  WORKFLOW_PROCESS_START: 'WorkflowProcessStart',
  WORKFLOW_PROCESS_APPROVE: 'WorkflowProcessApprove',
  SYS_TENANT_DATA_SOURCE: 'SysTenantDataSource',
  OSS_BUCKET: 'OssBucket',
  OSS_OBJECT: 'OssObject',
  SOCIAL_BINDING: 'SocialBinding',
};
