import { HttpConfig, AxiosHttpResult, AccessTokenResponse, DeviceAuthorizationResponse } from '@herodotus-cloud/core';
import { SocialSource, AccessPrincipal, WebAuthnAuthenticate } from '../../declarations';
export declare class OAuth2ApiService {
    private static instance;
    private config;
    private constructor();
    static getInstance(config: HttpConfig): OAuth2ApiService;
    private getOAuth2TokenAddress;
    private getOAuth2RevokeAddress;
    private getOAuth2SignOutAddress;
    private getOAuth2DeviceAuthorizationAddress;
    private createBasicHeader;
    private createClientData;
    private createOAuth2Data;
    signOut(token: string, clientId?: string, clientSecret?: string): Promise<AxiosHttpResult<string>>;
    revoke(token: string, clientId?: string, clientSecret?: string): Promise<AxiosHttpResult>;
    refreshTokenFlow(refreshToken: string, oidc?: boolean, clientId?: string, clientSecret?: string): Promise<AxiosHttpResult<AccessTokenResponse>>;
    passwordFlow(username: string, password: string, oidc?: boolean, clientId?: string, clientSecret?: string): Promise<AxiosHttpResult<AccessTokenResponse>>;
    authorizationCodeFlow(code: string, redirect_uri: string, state?: string, oidc?: boolean, clientId?: string, clientSecret?: string): Promise<AxiosHttpResult<AccessTokenResponse>>;
    clientCredentialsFlow(scope?: string, clientId?: string, clientSecret?: string): Promise<AxiosHttpResult<AccessTokenResponse>>;
    deviceCodeFlow(deviceCode: string, scope?: string, clientId?: string, clientSecret?: string): Promise<AxiosHttpResult<AccessTokenResponse>>;
    deviceAuthorizationFlow(scope?: string, clientId?: string, clientSecret?: string): Promise<AxiosHttpResult<DeviceAuthorizationResponse>>;
    socialCredentialsFlowBySms(mobile: string, code: string, oidc?: boolean, clientId?: string, clientSecret?: string): Promise<AxiosHttpResult<AccessTokenResponse>>;
    socialCredentialsFlowByJustAuth(source: SocialSource, accessPrincipal: AccessPrincipal, oidc?: boolean, clientId?: string, clientSecret?: string): Promise<AxiosHttpResult<AccessTokenResponse>>;
    webAuthnCredentialsFlow(publicKey: WebAuthnAuthenticate, oidc?: boolean, clientId?: string, clientSecret?: string): Promise<AxiosHttpResult<AccessTokenResponse>>;
}
