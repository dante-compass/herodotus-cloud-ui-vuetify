import type {
  AxiosHttpResult,
  WebAuthnRegisterOptions,
  WebAuthnRegister,
  WebAuthnAuthenticateOptions,
  WebAuthnAuthenticate,
} from '/@/declarations';

import { HttpConfig } from '../base';

class PasskeyApiService {
  private static instance: PasskeyApiService;
  private config = {} as HttpConfig;

  private constructor(config: HttpConfig) {
    this.config = config;
  }

  public static getInstance(config: HttpConfig): PasskeyApiService {
    if (this.instance == null) {
      this.instance = new PasskeyApiService(config);
    }
    return this.instance;
  }

  private getWebAuthnRegisterAddress(): string {
    return this.config.getUaa() + '/webauthn/register';
  }

  private getWebAuthnRegisterOptionsAddress(): string {
    return this.getWebAuthnRegisterAddress() + '/options';
  }

  private getWebAuthnAuthenticateOptionsAddress(): string {
    return this.config.getUaa() + '/webauthn/authenticate/options';
  }

  private getLogicWebAuthnAddress(): string {
    return this.config.getUaa() + '/login/webauthn';
  }

  public webAuthnRegisterOptions(): Promise<AxiosHttpResult<WebAuthnRegisterOptions>> {
    return this.config.getHttp().post<WebAuthnRegisterOptions, string>(this.getWebAuthnRegisterOptionsAddress(), '');
  }

  public webAuthnRegister(request: WebAuthnRegister): Promise<AxiosHttpResult<boolean>> {
    return this.config.getHttp().post<boolean, WebAuthnRegister>(this.getWebAuthnRegisterAddress(), request);
  }

  public webAuthnAuthenticateOptions(): Promise<AxiosHttpResult<WebAuthnAuthenticateOptions>> {
    return this.config
      .getHttp()
      .post<WebAuthnAuthenticateOptions, string>(this.getWebAuthnAuthenticateOptionsAddress(), '');
  }

  public webAuthnAuthenticate(request: WebAuthnAuthenticate): Promise<AxiosHttpResult<boolean>> {
    return this.config.getHttp().post<boolean, WebAuthnAuthenticate>(this.getLogicWebAuthnAddress(), request);
  }
}

export { PasskeyApiService };
