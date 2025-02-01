import { AxiosHttpResult, WebAuthnRegisterOptions, WebAuthnRegister, WebAuthnAuthenticateOptions, WebAuthnAuthenticate } from '../../declarations';
import { HttpConfig } from '../base';
declare class PasskeyApiService {
    private static instance;
    private config;
    private constructor();
    static getInstance(config: HttpConfig): PasskeyApiService;
    private getWebAuthnRegisterAddress;
    private getWebAuthnRegisterOptionsAddress;
    private getWebAuthnAuthenticateOptionsAddress;
    private getLogicWebAuthnAddress;
    webAuthnRegisterOptions(): Promise<AxiosHttpResult<WebAuthnRegisterOptions>>;
    webAuthnRegister(request: WebAuthnRegister): Promise<AxiosHttpResult<boolean>>;
    webAuthnAuthenticateOptions(): Promise<AxiosHttpResult<WebAuthnAuthenticateOptions>>;
    webAuthnAuthenticate(request: WebAuthnAuthenticate): Promise<AxiosHttpResult<boolean>>;
}
export { PasskeyApiService };
