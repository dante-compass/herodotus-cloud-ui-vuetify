import { sha256 } from "@noble/hashes/sha2.js";
import { randomBytes, utf8ToBytes } from "@noble/hashes/utils.js";
import { base64urlnopad } from "@scure/base";

import type { PkceCodePair } from "@/declarations";

class PkceUtilities {
  private static instance = new PkceUtilities();

  private constructor() {}

  public static getInstance(): PkceUtilities {
    return this.instance;
  }

  /** 将随机字节映射到 PKCE 允许的字符集 (RFC 7636) */
  private bytesToVerifierString(bytes: Uint8Array): string {
    const mask = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~";
    let result = "";
    for (let i = 0; i < bytes.length; i++) {
      result += mask[bytes[i]! % mask.length];
    }
    return result;
  }

  /** 生成 PKCE 的 code_verifier，直接基于安全随机字节 */
  private generateVerifier(length: number): string {
    const bytes = randomBytes(length); // 生成 length 个密码学安全随机字节
    return this.bytesToVerifierString(bytes);
  }

  /** 从 verifier 生成 challenge（S256） */
  public generateChallenge(code_verifier: string) {
    const bytes = utf8ToBytes(code_verifier); // 字符串转 Uint8Array
    const hash = sha256(bytes); // 返回 Uint8Array
    return base64urlnopad.encode(hash); // Base64url 无填充编码
  }

  public generateCodePair(length: number = 43): PkceCodePair {
    if (length < 43 || length > 128) {
      throw `Expected a length between 43 and 128. Received ${length}.`;
    }
    const verifier = this.generateVerifier(length);
    const challenge = this.generateChallenge(verifier);
    return { codeVerifier: verifier, codeChallenge: challenge };
  }

  public verifyChallenge(code_verifier: string, expectedChallenge: string) {
    return this.generateChallenge(code_verifier) === expectedChallenge;
  }
}

export const PKCE = PkceUtilities.getInstance();
