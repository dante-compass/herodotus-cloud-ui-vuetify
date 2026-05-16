import { SocialSourceEnum } from '../enums';
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
    /**
     * 自定义属性，用于 IOT 设备识别。
     *
     * 非 IOT 用途，在请求时可以不用传该参数
     */
    product_key?: string;
    /**
     * 指定 OAuth2 客户端 AccessToken 格式。
     *
     * 如果不指定，平台默认使用 Opaque Token
     */
    token_format?: string;
    /**
     * 客户端ID。
     *
     * 发送客户端动态注册请求时，该参数无需传递，SAS {@code OAuth2ClientRegistrationRegisteredClientConverter} 会自动生成。目前本系统未对该参数进行任何改造
     */
    client_id?: string;
    /**
     * 客户端颁发时间。
     *
     * 发送客户端动态注册请求时，该参数无需传递，SAS {@code OAuth2ClientRegistrationRegisteredClientConverter} 会自动生成，为当前时间。
     */
    client_id_issued_at?: string;
    /**
     * 客户端密钥。
     *
     * 发送客户端动态注册请求时，可以设置也可以不设置。
     * · 如果 token_endpoint_auth_method 设置为 ClientAuthenticationMethod.CLIENT_SECRET_POST，则会为客户端生成默认密码
     * · 如果 token_endpoint_auth_method 设置为 ClientAuthenticationMethod.NONE 则不会为客户端生成默认密码
     * · 如果不设置 token_endpoint_auth_method ，则会默认设置为 ClientAuthenticationMethod.CLIENT_SECRET_BASIC 并生成默认密码
     *
     * 参见 SAS {@code OAuth2ClientRegistrationRegisteredClientConverter}
     */
    client_secret?: string;
    /**
     * 客户端密钥过期时间
     *
     * 发送客户端动态注册请求时，可以不设置。如果不设置，则认为密钥不过期
     */
    client_secret_expires_at?: string;
    /**
     * 客户端名称。
     *
     * 发送客户端动态注册请求时，可以不设置。如果不设置，则默认设置为系统自动生成的 Client Id。参见：{@code RegisteredClient.Build}
     */
    client_name?: string;
    /**
     * 重定向地址。
     *
     * 如果 grantTypes 中包含 AuthorizationGrantType.AUTHORIZATION_CODE，或者 responseTypes 中包含 code，则必须传递 redirectUris。除此以外可以不传。
     */
    redirect_uris?: string[];
    /**
     * 客户端认证方法
     *
     * 发送客户端动态注册请求时，可以设置也可以不设置。
     * · 如果设置为 ClientAuthenticationMethod.CLIENT_SECRET_POST，则会为客户端生成默认密码
     * · 如果设置为 ClientAuthenticationMethod.NONE 则不会为客户端生成默认密码
     * · 如果不设置，则会默认设置为 ClientAuthenticationMethod.CLIENT_SECRET_BASIC 并生成默认密码
     */
    token_endpoint_auth_method?: string;
    /**
     * 认证方法。
     *
     * 发送客户端动态注册请求时，允许不传递该参数。但实际使用中，不指定认证方式，那么 OAuth2 没有任何意义
     */
    grant_types: string[];
    /**
     * 响应类型。
     *
     * 发送客户端动态注册请求时，允许不传递该参数。如果传递了该参数，同时其中包含 code，那么系统会自动将 grantTypes 设置为 AuthorizationGrantType.AUTHORIZATION_CODE。
     *
     * 参见 SAS {@code OAuth2ClientRegistrationRegisteredClientConverter}
     */
    response_types?: string[];
    /**
     * 这里 Scope 的格式只能是以空格分隔的字符串。否则存储的时候会出问题。
     *
     * 参见：<code>org.springframework.security.oauth2.server.authorization.oidc.http.converter.OidcClientRegistrationHttpMessageConverter</code>
     * 其中静态类<code>MapOidcClientRegistrationConverter</code>的<code>convertScope</code>方法
     *
     * 注意：在最新版本的 SAS 中，客户端动态注册时默认不需要传 scope 参数。如果传了 scope 参数，那么客户端动态注册时会抛出。参见：SAS {@code OAuth2ClientRegistrationAuthenticationValidator}
     * 当然，如果需要传递 scope，需要自己重新实现 {@code OAuth2ClientRegistrationAuthenticationValidator}
     */
    scope?: string[];
    /**
     * JWKS 地址。
     *
     * 发送客户端动态注册请求时，允许不传递该参数
     */
    jwks_uri?: string;
}
