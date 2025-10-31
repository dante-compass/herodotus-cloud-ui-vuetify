/// <reference types="vite/client" />

declare interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_PROJECT;
  readonly VITE_APPLICATION_NAME;
  readonly VITE_API_URL;
  readonly VITE_WS_URL;
  readonly VITE_OAUTH2_CLIENT_ID;
  readonly VITE_OAUTH2_CLIENT_SECRET;
  readonly VITE_OAUTH2_REDIRECT_URI;
  readonly VITE_AUTO_REFRESH_TOKEN;
  readonly VITE_USE_OIDC;
  readonly VITE_USE_WEBSOCKET;
  readonly VITE_USE_CRYPTO;
  readonly VITE_SECRET_KEY;
  readonly VITE_CAPTCHA;
  readonly VITE_MULTI_TENANCY_ID;
  readonly VITE_USE_DISABLE_DEVTOOL;
  // 更多环境变量...
}

/**
 * The type of `import.meta`.
 *
 * If you need to declare that a given property exists on `import.meta`,
 * this type may be augmented via interface merging.
 */
declare interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare interface Window {
  APPLICATION_ENVIRONMENT_VARIABLES_PROJECT: string;
  APPLICATION_ENVIRONMENT_VARIABLES_APPLICATION_NAME: string;
  APPLICATION_ENVIRONMENT_VARIABLES_API_URL: string;
  APPLICATION_ENVIRONMENT_VARIABLES_WS_URL: string;
  APPLICATION_ENVIRONMENT_VARIABLES_OAUTH2_CLIENT_ID: string;
  APPLICATION_ENVIRONMENT_VARIABLES_OAUTH2_CLIENT_SECRET: string;
  APPLICATION_ENVIRONMENT_VARIABLES_OAUTH2_REDIRECT_URI: string;
  APPLICATION_ENVIRONMENT_VARIABLES_USE_DISABLE_DEVTOOL: string;
}
