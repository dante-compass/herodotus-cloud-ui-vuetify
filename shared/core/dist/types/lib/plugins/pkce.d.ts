import { PkceCodePair } from '../../declarations';
declare class PkceUtilities {
    private static instance;
    private constructor();
    static getInstance(): PkceUtilities;
    /** 将随机字节映射到 PKCE 允许的字符集 (RFC 7636) */
    private bytesToVerifierString;
    /** 生成 PKCE 的 code_verifier，直接基于安全随机字节 */
    private generateVerifier;
    /** 从 verifier 生成 challenge（S256） */
    generateChallenge(code_verifier: string): string;
    generateCodePair(length?: number): PkceCodePair;
    verifyChallenge(code_verifier: string, expectedChallenge: string): boolean;
}
export declare const PKCE: PkceUtilities;
export {};
