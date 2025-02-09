import type {
  CredentialCreationOptionsJSON,
  CredentialRequestOptionsJSON,
  PublicKeyCredentialWithAttestationJSON,
  PublicKeyCredentialWithAssertionJSON,
} from '@github/webauthn-json';

export type WebAuthnRegisterOptions = CredentialCreationOptionsJSON['publicKey'];
export type WebAuthnAuthenticateOptions = CredentialRequestOptionsJSON['publicKey'];

interface WebAuthnRegisterPublicKey {
  credential: PublicKeyCredentialWithAttestationJSON;
  label: string;
}

export interface WebAuthnRegister {
  publicKey: WebAuthnRegisterPublicKey;
}

export type WebAuthnAuthenticate = PublicKeyCredentialWithAssertionJSON;
