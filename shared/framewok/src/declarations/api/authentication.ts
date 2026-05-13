import { SocialSourceEnum } from "../enums";

export type SocialSource = keyof typeof SocialSourceEnum;

export interface AccessPrincipal {
  code?: string;
  appId?: string;
  encryptedData?: string;
  iv?: string;
  openId?: string;
  sessionKey?: string;
  unionId?: string;
  rawData?: string;
  signature?: string;
  auth_code?: string;
  state?: string;
  authorization_code?: string;
  oauth_token?: string;
  oauth_verifier?: string;
  mobile?: string;
}

export type PingResponse = {
  id: number;
  icon: string;
  color: string;
  text: string;
};

export interface OAuth2ClientRegistration {
  product_key?: string;
  /**
   * 无需设定，系统自动生成。
   */
  client_id?: string;
  /**
   * 无需设定，系统自动生成。默认为客户端动态注册时间。
   */
  client_id_issued_at?: string;
  /**
   * 发送客户端动态注册请求时，可以设置也可以不设置。
   * · 如果 token_endpoint_auth_method 设置为 ClientAuthenticationMethod.CLIENT_SECRET_POST，则会为客户端生成默认密码
   * · 如果 token_endpoint_auth_method 设置为 ClientAuthenticationMethod.NONE 则不会为客户端生成默认密码
   * · 如果不设置 token_endpoint_auth_method ，则会默认设置为 ClientAuthenticationMethod.CLIENT_SECRET_BASIC 并生成默认密码
   */
  client_secret?: string;
  /**
   * 无需设定
   */
  client_secret_expires_at?: string;
  /**
   * 如果不设置，则默认设置为系统自动生成的 Client Id
   */
  client_name?: string;
  /**
   * 如果 grantTypes 中包含 AuthorizationGrantType.AUTHORIZATION_CODE，或者 responseTypes 中包含 code，则必须传递 redirectUris。除此以外可以不传。
   */
  redirect_uris?: string[];
  token_endpoint_auth_method?: string;
  /**
   * 发送客户端动态注册请求时，允许不传递该参数。但实际使用中，不指定认证方式，那么 OAuth2 没有任何意义
   */
  grant_types?: string[];
  response_types?: string[];
  /**
   * 注意：在最新版本的 SAS 中，客户端动态注册时默认不需要传 scope 参数。如果传了 scope 参数，那么客户端动态注册时会抛出。参见：SAS {@code OAuth2ClientRegistrationAuthenticationValidator}
   * 当然，如果需要传递 scope，需要自己重新实现 {@code OAuth2ClientRegistrationAuthenticationValidator}
   */
  scope?: string[];
  jwks_uri?: string;
}
