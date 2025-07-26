import { HttpConfig, AxiosHttpResult, Service } from '@herodotus-cloud/core';
import { WebAuthnRegisterOptions, WebAuthnRegister, WebAuthnAuthenticateOptions, WebAuthnAuthenticate } from '../../declarations';
export declare class PasskeyApiService extends Service {
    private static _instance;
    private static _initialized;
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
