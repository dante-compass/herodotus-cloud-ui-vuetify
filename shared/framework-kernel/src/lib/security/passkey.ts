import type { HttpConfig, AxiosHttpResult } from '@herodotus-cloud/core';

import type {
  WebAuthnRegisterOptions,
  WebAuthnRegister,
  WebAuthnAuthenticateOptions,
  WebAuthnAuthenticate,
} from '@/declarations';

import { Service } from '@herodotus-cloud/core';

export class PasskeyApiService extends Service {
  // 静态私有实例引用
  private static _instance: PasskeyApiService | null = null;
  // 初始化标志
  private static _initialized = false;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): PasskeyApiService {
    if (PasskeyApiService._initialized) {
      throw new Error('PasskeyApiService has already been initialized');
    }

    PasskeyApiService._instance = new PasskeyApiService(config);
    PasskeyApiService._initialized = true;
    return PasskeyApiService._instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getUaa() + '/webauthn/register';
  }

  private getWebAuthnRegisterOptionsAddress(): string {
    return this.getBaseAddress() + '/options';
  }

  private getWebAuthnAuthenticateAddress(): string {
    return this.getConfig().getUaa() + '/login/webauthn';
  }

  private getWebAuthnAuthenticateOptionsAddress(): string {
    return this.getConfig().getUaa() + '/webauthn/authenticate/options';
  }

  protected getIdPath(id: string): string {
    return this.getParamPath(this.getBaseAddress(), id);
  }

  public fetchWebAuthnRegisterOptions(): Promise<AxiosHttpResult<WebAuthnRegisterOptions>> {
    return this.getConfig()
      .getHttp()
      .post<WebAuthnRegisterOptions, string>(this.getWebAuthnRegisterOptionsAddress(), '');
  }

  public webAuthnRegister(request: WebAuthnRegister): Promise<AxiosHttpResult<boolean>> {
    return this.getConfig()
      .getHttp()
      .post<boolean, WebAuthnRegister>(this.getBaseAddress(), request);
  }

  public fetchWebAuthnAuthenticateOptions(): Promise<AxiosHttpResult<WebAuthnAuthenticateOptions>> {
    return this.getConfig()
      .getHttp()
      .post<WebAuthnAuthenticateOptions, string>(this.getWebAuthnAuthenticateOptionsAddress(), '');
  }

  public webAuthnAuthenticate(request: WebAuthnAuthenticate): Promise<AxiosHttpResult<boolean>> {
    return this.getConfig()
      .getHttp()
      .post<boolean, WebAuthnAuthenticate>(this.getWebAuthnAuthenticateAddress(), request);
  }

  public delete(id: string): Promise<AxiosHttpResult<string>> {
    return this.getConfig().getHttp().delete<string, string>(this.getIdPath(id));
  }
}
