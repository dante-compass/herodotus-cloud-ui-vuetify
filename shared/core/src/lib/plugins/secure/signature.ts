// ✅ @noble/hashes 替换 crypto-js
import { hmac } from "@noble/hashes/hmac.js";
import { sha256 } from "@noble/hashes/sha2.js";
import { sha1, md5 } from "@noble/hashes/legacy.js";
import { bytesToHex, utf8ToBytes } from "@noble/hashes/utils.js";

class SignatureUtilities {
  private static instance = new SignatureUtilities();

  private constructor() {}

  public static getInstance(): SignatureUtilities {
    return this.instance;
  }

  /**
   * 计算签名
   * @param method 签名方法，目前支持 hmacsha1、hmacsha256 和 hmacmd5
   * @param key 签名密钥
   * @param content 签名内容
   * @returns
   */
  public calculate(method: string, key: string, content: string): string {
    // ✅ 核心：字符串 → Uint8Array
    const keyBytes = utf8ToBytes(key);
    const msgBytes = utf8ToBytes(content);

    let hash: Uint8Array;
    switch (method) {
      case "hmacsha1":
        hash = hmac(sha1, keyBytes, msgBytes);
        break;
      case "hmacsha256":
        hash = hmac(sha256, keyBytes, msgBytes);
        break;
      default:
        hash = hmac(md5, keyBytes, msgBytes);
        break;
    }

    // ✅ Uint8Array → Hex 字符串
    return bytesToHex(hash);
  }
}

export const SignatureUtils = SignatureUtilities.getInstance();
