import { AxiosHttpResult, WebAuthnRegisterOptions, WebAuthnRegister, WebAuthnAuthenticateOptions, WebAuthnAuthenticate } from '../../declarations';
import { HttpConfig, Service } from '../base';
declare class PasskeyApiService extends Service {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): PasskeyApiService;
    getBaseAddress(): string;
    private getWebAuthnRegisterOptionsAddress;
    private getWebAuthnAuthenticateAddress;
    private getWebAuthnAuthenticateOptionsAddress;
    protected getIdPath(id: string): string;
    fetchWebAuthnRegisterOptions(): Promise<AxiosHttpResult<WebAuthnRegisterOptions>>;
    webAuthnRegister(request: WebAuthnRegister): Promise<AxiosHttpResult<boolean>>;
    fetchWebAuthnAuthenticateOptions(): Promise<AxiosHttpResult<WebAuthnAuthenticateOptions>>;
    webAuthnAuthenticate(request: WebAuthnAuthenticate): Promise<AxiosHttpResult<boolean>>;
    delete(id: string): Promise<AxiosHttpResult<string>>;
}
export { PasskeyApiService };
