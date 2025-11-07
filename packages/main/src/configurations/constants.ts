import type { DisplayElement } from '@/composables/declarations';

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
  MESSAGE_INFORMATION: 'MessageInformation',
  WORKFLOW_DYNAMIC_FORM: 'WorkflowDynamicForm',
  WIDGETS_DYNAMIC_FORM: 'WidgetsDynamicForm',
  WORKFLOW_PROCESS_START: 'WorkflowProcessStart',
  WORKFLOW_PROCESS_APPROVE: 'WorkflowProcessApprove',
  SYS_TENANT_DATA_SOURCE: 'SysTenantDataSource',
  OSS_BUCKET: 'OssBucket',
  OSS_OBJECT: 'OssObject',
  SOCIAL_BINDING: 'SocialBinding',
  IOT_PRODUCT_CATEGORY: 'IotProductCategory',
  IOT_PRODUCT: 'IotProduct',
  IOT_DEVICE: 'IotDevice',
  IOT_TSL_FUNCTION: 'IotTslFunction',
  IOT_TSL_UNIT: 'IotTslUnit',
  MGT_CERTIFICATE: 'MgtCertificate',
};

export const DATA_ITEM_STATUS: Array<DisplayElement> = [
  { color: 'success', icon: 'mdi-circle' },
  { color: 'error', icon: 'mdi-circle' },
  { color: 'warning', icon: 'mdi-circle' },
  { color: 'info', icon: 'mdi-circle' },
];
