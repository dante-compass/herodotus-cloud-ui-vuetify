import type { HttpConfig, AxiosHttpResult, AccessTokenResponse } from '@herodotus-cloud/core';

import type { SocialSource, AccessPrincipal, WebAuthnAuthenticate } from '@/declarations';

import { Base64, ContentTypeEnum, AuthorizationGrantTypeEnum } from '@herodotus-cloud/core';

export class OAuth2ApiService {
  // 静态私有实例引用
  private static _instance: OAuth2ApiService | null = null;
  // 初始化标志
  private static _initialized = false;
  private config = {} as HttpConfig;

  private constructor(config: HttpConfig) {
    this.config = config;
  }

  public static getInstance(config: HttpConfig): OAuth2ApiService {
    if (OAuth2ApiService._initialized) {
      throw new Error('OAuth2ApiService has already been initialized');
    }

    OAuth2ApiService._instance = new OAuth2ApiService(config);
    OAuth2ApiService._initialized = true;
    return OAuth2ApiService._instance;
  }

  private getOAuth2TokenAddress(): string {
    return this.config.getUaa() + '/oauth2/token';
  }

  private getOAuth2RevokeAddress(): string {
    return this.config.getUaa() + '/oauth2/revoke';
  }

  private getOAuth2SignOutAddress(): string {
    return this.config.getUaa() + '/oauth2/sign-out';
  }

  private getBasicHeader(): string {
    return (
      'Basic ' + Base64.encode(this.config.getClientId() + ':' + this.config.getClientSecret())
    );
  }

  public signOut(token: string): Promise<AxiosHttpResult<string>> {
    return this.config.getHttp().put(
      this.getOAuth2SignOutAddress(),
      {
        accessToken: token,
      },
      {
        contentType: ContentTypeEnum.URL_ENCODED,
      },
      {
        headers: {
          Authorization: this.getBasicHeader(),
        },
      },
    );
  }

  public revoke(token: string): Promise<AxiosHttpResult> {
    return this.config.getHttp().post(
      this.getOAuth2RevokeAddress(),
      {
        token: token,
      },
      {
        contentType: ContentTypeEnum.URL_ENCODED,
      },
      {
        headers: {
          Authorization: this.getBasicHeader(),
        },
      },
    );
  }

  public refreshTokenFlow(
    refreshToken: string,
    oidc = false,
  ): Promise<AxiosHttpResult<AccessTokenResponse>> {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      oidc
        ? {
            refresh_token: refreshToken,
            grant_type: AuthorizationGrantTypeEnum.REFRESH_TOKEN,
            scope: 'openid',
          }
        : { refresh_token: refreshToken, grant_type: AuthorizationGrantTypeEnum.REFRESH_TOKEN },
      {
        contentType: ContentTypeEnum.URL_ENCODED,
      },
      {
        headers: {
          Authorization: this.getBasicHeader(),
        },
      },
    );
  }

  public passwordFlow(
    username: string,
    password: string,
    oidc = false,
  ): Promise<AxiosHttpResult<AccessTokenResponse>> {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      oidc
        ? {
            username: username,
            password: password,
            grant_type: AuthorizationGrantTypeEnum.PASSWORD,
            scope: 'openid',
          }
        : {
            username: username,
            password: password,
            grant_type: AuthorizationGrantTypeEnum.PASSWORD,
          },
      {
        contentType: ContentTypeEnum.URL_ENCODED,
      },
      {
        headers: {
          Authorization: this.getBasicHeader(),
        },
      },
    );
  }

  public authorizationCodeFlow(
    code: string,
    redirect_uri: string,
    state = '',
    oidc = false,
  ): Promise<AxiosHttpResult<AccessTokenResponse>> {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      oidc
        ? {
            code: code,
            state: state,
            redirect_uri: redirect_uri,
            grant_type: AuthorizationGrantTypeEnum.AUTHORIZATION_CODE,
            scope: 'openid',
          }
        : {
            code: code,
            state: state,
            redirect_uri: redirect_uri,
            grant_type: AuthorizationGrantTypeEnum.AUTHORIZATION_CODE,
          },
      {
        contentType: ContentTypeEnum.URL_ENCODED,
      },
      {
        headers: {
          Authorization: this.getBasicHeader(),
        },
      },
    );
  }

  public socialCredentialsFlowBySms(
    mobile: string,
    code: string,
    oidc = false,
  ): Promise<AxiosHttpResult<AccessTokenResponse>> {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      oidc
        ? {
            mobile,
            code,
            grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
            source: 'SMS',
            scope: 'openid',
          }
        : {
            mobile,
            code,
            grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
            source: 'SMS',
          },
      {
        contentType: ContentTypeEnum.URL_ENCODED,
      },
      {
        headers: {
          Authorization: this.getBasicHeader(),
        },
      },
    );
  }

  public socialCredentialsFlowByJustAuth(
    source: SocialSource,
    accessPrincipal: AccessPrincipal,
    oidc = false,
  ): Promise<AxiosHttpResult<AccessTokenResponse>> {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      oidc
        ? {
            ...accessPrincipal,
            grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
            source: source,
            scope: 'openid',
          }
        : {
            ...accessPrincipal,
            grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
            source: source,
          },
      {
        contentType: ContentTypeEnum.URL_ENCODED,
      },
      {
        headers: {
          Authorization: this.getBasicHeader(),
        },
      },
    );
  }

  public webAuthnCredentialsFlow(
    publicKey: WebAuthnAuthenticate,
    oidc = false,
  ): Promise<AxiosHttpResult<AccessTokenResponse>> {
    return this.config.getHttp().postWithParams(
      this.getOAuth2TokenAddress(),
      oidc
        ? { grant_type: AuthorizationGrantTypeEnum.WEBAUTHN_CREDENTIALS, scope: 'openid' }
        : { grant_type: AuthorizationGrantTypeEnum.WEBAUTHN_CREDENTIALS },
      { ...publicKey },
      {
        contentType: ContentTypeEnum.JSON,
      },
      {
        headers: {
          Authorization: this.getBasicHeader(),
        },
      },
    );
  }
}
