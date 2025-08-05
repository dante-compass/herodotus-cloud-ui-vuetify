import type {
  HttpConfig,
  AxiosHttpResult,
  AccessTokenResponse,
  DeviceAuthorizationResponse,
} from '@herodotus-cloud/core';
import type { SocialSource, AccessPrincipal, WebAuthnAuthenticate } from '@/declarations';

import { Base64, lodash, ContentTypeEnum, AuthorizationGrantTypeEnum } from '@herodotus-cloud/core';

export class OAuth2ApiService {
  // 静态私有实例引用
  private static instance: OAuth2ApiService | null = null;
  private config = {} as HttpConfig;

  private constructor(config: HttpConfig) {
    this.config = config;
  }

  public static getInstance(config: HttpConfig): OAuth2ApiService {
    if (this.instance == null) {
      this.instance = new OAuth2ApiService(config);
    }

    return this.instance;
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

  private getOAuth2DeviceAuthorizationAddress(): string {
    return this.config.getUaa() + '/oauth2/device_authorization';
  }

  private createBasicHeader(clientId = '', clientSecret = ''): string {
    let data = this.config.getClientId() + ':' + this.config.getClientSecret();
    if (clientId && clientSecret) {
      data = clientId + ':' + clientSecret;
    }

    return 'Basic ' + Base64.encode(data);
  }

  private createClientData(scope = '', clientId = '', clientSecret = ''): Record<string, string> {
    const data = {
      client_id: clientId || this.config.getClientId(),
      client_secret: clientSecret || this.config.getClientSecret(),
    };

    if (scope) {
      lodash.merge(data, { scope: scope });
    }

    return data;
  }

  private createOAuth2Data(
    grantType: AuthorizationGrantTypeEnum,
    params: Record<string, unknown>,
    oidc = false,
  ): Record<string, unknown> {
    const data = {
      grant_type: grantType,
    };

    if (!lodash.isEmpty(params)) {
      lodash.merge(data, params);
    }

    if (oidc) {
      lodash.merge(data, { scope: 'openid' });
    }

    return data;
  }

  public signOut(
    token: string,
    clientId = '',
    clientSecret = '',
  ): Promise<AxiosHttpResult<string>> {
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
          Authorization: this.createBasicHeader(clientId, clientSecret),
        },
      },
    );
  }

  public revoke(token: string, clientId = '', clientSecret = ''): Promise<AxiosHttpResult> {
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
          Authorization: this.createBasicHeader(clientId, clientSecret),
        },
      },
    );
  }

  public refreshTokenFlow(
    refreshToken: string,
    oidc = false,
    clientId = '',
    clientSecret = '',
  ): Promise<AxiosHttpResult<AccessTokenResponse>> {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      this.createOAuth2Data(
        AuthorizationGrantTypeEnum.REFRESH_TOKEN,
        { refresh_token: refreshToken },
        oidc,
      ),
      {
        contentType: ContentTypeEnum.URL_ENCODED,
      },
      {
        headers: {
          Authorization: this.createBasicHeader(clientId, clientSecret),
        },
      },
    );
  }

  public passwordFlow(
    username: string,
    password: string,
    oidc = false,
    clientId = '',
    clientSecret = '',
  ): Promise<AxiosHttpResult<AccessTokenResponse>> {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      this.createOAuth2Data(
        AuthorizationGrantTypeEnum.PASSWORD,
        { username: username, password: password },
        oidc,
      ),
      {
        contentType: ContentTypeEnum.URL_ENCODED,
      },
      {
        headers: {
          Authorization: this.createBasicHeader(clientId, clientSecret),
        },
      },
    );
  }

  public authorizationCodeFlow(
    code: string,
    redirect_uri: string,
    state = '',
    oidc = false,
    clientId = '',
    clientSecret = '',
  ): Promise<AxiosHttpResult<AccessTokenResponse>> {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      this.createOAuth2Data(
        AuthorizationGrantTypeEnum.AUTHORIZATION_CODE,
        { code: code, state: state, redirect_uri: redirect_uri },
        oidc,
      ),
      {
        contentType: ContentTypeEnum.URL_ENCODED,
      },
      {
        headers: {
          Authorization: this.createBasicHeader(clientId, clientSecret),
        },
      },
    );
  }

  public clientCredentialsFlow(
    scope = '',
    clientId = '',
    clientSecret = '',
  ): Promise<AxiosHttpResult<AccessTokenResponse>> {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      this.createOAuth2Data(AuthorizationGrantTypeEnum.CLIENT_CREDENTIALS, {
        ...this.createClientData(scope, clientId, clientSecret),
      }),
      {
        contentType: ContentTypeEnum.URL_ENCODED,
      },
    );
  }

  public deviceCodeFlow(
    deviceCode: string,
    scope = '',
    clientId = '',
    clientSecret = '',
  ): Promise<AxiosHttpResult<AccessTokenResponse>> {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      this.createOAuth2Data(AuthorizationGrantTypeEnum.DEVICE_CODE, {
        device_code: deviceCode,
        ...this.createClientData(scope, clientId, clientSecret),
      }),
      {
        contentType: ContentTypeEnum.URL_ENCODED,
      },
    );
  }

  public deviceAuthorizationFlow(
    scope = 'mail',
    clientId = '',
    clientSecret = '',
  ): Promise<AxiosHttpResult<DeviceAuthorizationResponse>> {
    return this.config
      .getHttp()
      .post(
        this.getOAuth2DeviceAuthorizationAddress(),
        this.createClientData(scope, clientId, clientSecret),
        {
          contentType: ContentTypeEnum.URL_ENCODED,
        },
      );
  }

  public socialCredentialsFlowBySms(
    mobile: string,
    code: string,
    oidc = false,
    clientId = '',
    clientSecret = '',
  ): Promise<AxiosHttpResult<AccessTokenResponse>> {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      this.createOAuth2Data(
        AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
        { mobile, code, source: 'SMS' },
        oidc,
      ),
      {
        contentType: ContentTypeEnum.URL_ENCODED,
      },
      {
        headers: {
          Authorization: this.createBasicHeader(clientId, clientSecret),
        },
      },
    );
  }

  public socialCredentialsFlowByJustAuth(
    source: SocialSource,
    accessPrincipal: AccessPrincipal,
    oidc = false,
    clientId = '',
    clientSecret = '',
  ): Promise<AxiosHttpResult<AccessTokenResponse>> {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      this.createOAuth2Data(
        AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
        { ...accessPrincipal, source: source },
        oidc,
      ),
      {
        contentType: ContentTypeEnum.URL_ENCODED,
      },
      {
        headers: {
          Authorization: this.createBasicHeader(clientId, clientSecret),
        },
      },
    );
  }

  public webAuthnCredentialsFlow(
    publicKey: WebAuthnAuthenticate,
    oidc = false,
    clientId = '',
    clientSecret = '',
  ): Promise<AxiosHttpResult<AccessTokenResponse>> {
    return this.config.getHttp().postWithParams(
      this.getOAuth2TokenAddress(),
      this.createOAuth2Data(AuthorizationGrantTypeEnum.WEBAUTHN_CREDENTIALS, {}, oidc),
      { ...publicKey },
      {
        contentType: ContentTypeEnum.JSON,
      },
      {
        headers: {
          Authorization: this.createBasicHeader(clientId, clientSecret),
        },
      },
    );
  }
}
