export declare const useCryptoStore: import('pinia').StoreDefinition<"Crypto", {
    sessionId: string;
    key: string;
    state: string;
}, {}, {
    setSessionId(sessionId: string): void;
    setKey(key: string): void;
    getKey(): any;
    encrypt(content: string): any;
    decrypt(content: string): any;
    exchange(identity?: string): Promise<string>;
}>;
