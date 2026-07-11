import type { DisplayElement, DisplayElementGroup } from "@/composables/declarations";

import { OperationEnum } from "@herodotus/core";

export const IS_PROD = import.meta.env.PROD;
export const IS_DEV = import.meta.env.DEV;
export const IS_SERVER = import.meta.env.SSR;

export const DEAULT_ROUTER_LINK = {
  root: {
    path: "/",
    name: "Root",
    title: "Root",
  },
  sign_in: {
    path: "/sign-in",
    name: "SignIn",
  },
  home: {
    path: "/dashboard",
    name: "Dashboard",
    title: "首页",
  },
  not_found: {
    path: "/:pathMatch(.*)*",
    name: "PageNotFound",
    title: "Page Not Found",
  },
};

export const PAGE_NAME = (() => {
  const SYS_USER = "SysUser";
  const SYS_ROLE = "SysRole";
  const SYS_PERMISSION = "SysPermission";
  const SYS_ATTRIBUTE = "SysAttribute";
  const SYS_ELEMENT = "SysElement";
  const SYS_DEFAULT_ROLE = "SysDefaultRole";
  const SYS_ORGANIZATION = "SysOrganization";
  const SYS_DEPARTMENT = "SysDepartment";
  const SYS_EMPLOYEE = "SysEmployee";
  const SYS_OWNERSHIP = "SysOwnership";
  const SYS_DICTIONARY = "SysDictionary";
  const OAUTH2_APPLICATION = "OAuth2Application";
  const OAUTH2_SCOPE = "OAuth2Scope";
  const OAUTH2_TOKEN = "OAuth2Token";
  const OAUTH2_COMPLIANCE = "OAuth2Compliance";
  const OAUTH2_AUDIT = "OAuth2Audit";
  const OAUTH2_DEVICE = "OAuth2Device";
  const OAUTH2_PRODUCT = "OAuth2Product";
  const OAUTH2_CREDENTIAL_RECORD = "OAuth2CredentialRecord";
  const OAUTH2_PERSISTENT = "OAuth2Persistent";
  const WORKFLOW_DYNAMIC_FORM = "WorkflowDynamicForm";
  const WIDGETS_DYNAMIC_FORM = "WidgetsDynamicForm";
  const WORKFLOW_PROCESS_START = "WorkflowProcessStart";
  const WORKFLOW_PROCESS_APPROVE = "WorkflowProcessApprove";
  const SYS_TENANT_DATA_SOURCE = "SysTenantDataSource";
  const OSS_BUCKET = "OssBucket";
  const OSS_OBJECT = "OssObject";
  const SOCIAL_BINDING = "SocialBinding";
  const MGT_CERTIFICATE = "MgtCertificate";
  const MGT_CERTIFICATE_FILE = "MgtCertificateFile";
  const FOUNDATION_ACCOUNT = "FoundationAccount";
  const FOUNDATION_PROFILE = "FoundationProfile";
  const MESSAGE_INFORMATION = "MessageInformation";
  const MESSAGE_SETTING = "MessageSetting";
  const IOT_PRODUCT_CATEGORY = "IotProductCategory";
  const IOT_PRODUCT = "IotProduct";
  const IOT_PRODUCT_CONTENT = IOT_PRODUCT + OperationEnum.CONTENT;
  const IOT_PRODUCT_INFO = IOT_PRODUCT + OperationEnum.INFO;
  const IOT_DEVICE = "IotDevice";
  const IOT_TSL_FUNCTION = "IotTslFunction";
  const IOT_TSL_UNIT = "IotTslUnit";
  const THINGS_MQTT_ACCOUNT = "ThingsMqttAccount";
  const THINGS_MQTT_ACCOUNT_AUTHORIZE = THINGS_MQTT_ACCOUNT + OperationEnum.AUTHORIZE;
  const THINGS_MQTT_AUTHORITY = "ThingsMqttAuthority";
  const THINGS_MQTT_CATEGORY = "ThingsMqttCategory";

  return {
    SYS_USER,
    SYS_ROLE,
    SYS_PERMISSION,
    SYS_ATTRIBUTE,
    SYS_ELEMENT,
    SYS_DEFAULT_ROLE,
    SYS_ORGANIZATION,
    SYS_DEPARTMENT,
    SYS_EMPLOYEE,
    SYS_OWNERSHIP,
    SYS_DICTIONARY,
    OAUTH2_APPLICATION,
    OAUTH2_SCOPE,
    OAUTH2_TOKEN,
    OAUTH2_COMPLIANCE,
    OAUTH2_AUDIT,
    OAUTH2_DEVICE,
    OAUTH2_PRODUCT,
    OAUTH2_CREDENTIAL_RECORD,
    OAUTH2_PERSISTENT,
    WORKFLOW_DYNAMIC_FORM,
    WIDGETS_DYNAMIC_FORM,
    WORKFLOW_PROCESS_START,
    WORKFLOW_PROCESS_APPROVE,
    SYS_TENANT_DATA_SOURCE,
    OSS_BUCKET,
    OSS_OBJECT,
    SOCIAL_BINDING,
    MGT_CERTIFICATE,
    MGT_CERTIFICATE_FILE,
    FOUNDATION_ACCOUNT,
    FOUNDATION_PROFILE,
    MESSAGE_INFORMATION,
    MESSAGE_SETTING,
    IOT_PRODUCT_CATEGORY,
    IOT_PRODUCT,
    IOT_PRODUCT_CONTENT,
    IOT_PRODUCT_INFO,
    IOT_DEVICE,
    IOT_TSL_FUNCTION,
    IOT_TSL_UNIT,
    THINGS_MQTT_ACCOUNT,
    THINGS_MQTT_ACCOUNT_AUTHORIZE,
    THINGS_MQTT_AUTHORITY,
    THINGS_MQTT_CATEGORY,
  };
})();

export const DATA_ITEM_STATUS: Array<DisplayElement> = [
  { color: "success", icon: "mdi-circle" },
  { color: "error", icon: "mdi-circle" },
  { color: "warning", icon: "mdi-circle" },
  { color: "info", icon: "mdi-circle" },
];

export const HTTP_METHOD_STYLE_GROUP: DisplayElementGroup = {
  PUT: { color: "orange", icon: "mdi-book-remove-multiple" },
  DELETE: { color: "red", icon: "mdi-book-minus-multiple" },
  POST: { color: "green", icon: "mdi-book-plus-multiple" },
  GET: { color: "blue", icon: "mdi-book-multiple" },
  ALL: { color: "brown", icon: "mdi-book-cog" },
};

export const GRANT_TYPE_STYLE_GROUP: DisplayElementGroup = {
  authorization_code: { color: "pink", icon: "mdi-security", text: "授权码认证" },
  client_credentials: { color: "orange", icon: "mdi-arrow-decision-auto", text: "客户端凭证认证" },
  refresh_token: { color: "indigo", icon: "mdi-cog-refresh", text: "刷新令牌认证" },
  password: { color: "cyan", icon: "mdi-file-key", text: "密码认证" },
  social_credentials: { color: "light-blue", icon: "mdi-charity", text: "社交化认证" },
  webauthn_credentials: {
    color: "secondary",
    icon: "mdi-account-key",
    text: "Passkey 通行密钥认证",
  },
  "urn:ietf:params:oauth:grant-type:device_code": {
    color: "primary",
    icon: "mdi-devices",
    text: "设备激活码认证",
  },
  "urn:ietf:params:oauth:grant-type:jwt-bearer": {
    color: "purple",
    icon: "mdi-file-hidden",
    text: "JWT Bearer 认证",
  },
};

export const COLOR_LIST: Array<string> = [
  "success",
  "error",
  "info",
  "warning",
  "accent",
  "secondary",
  "primary",
  "red",
  "pink",
  "purple",
  "deep-purple",
  "indigo",
  "blue",
  "light-blue",
  "cyan",
  "teal",
  "green",
  "light-green",
  "lime",
  "yellow",
  "amber",
  "orange",
  "deep-orange",
  "brown",
  "grey",
  "blue-grey",
];
