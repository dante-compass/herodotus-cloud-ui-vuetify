import {
  create,
  CredentialCreationOptionsJSON,
  CredentialRequestOptionsJSON,
  parseCreationOptionsFromJSON,
  parseRequestOptionsFromJSON,
  get,
} from '@github/webauthn-json/browser-ponyfill';

import type { WebAuthnRegisterOptions, WebAuthnRegister, WebAuthnAuthenticateOptions } from '/@/lib/declarations';

import { api } from '/@/lib/utils';

export default function usePasskey() {
  // Availability of `window.PublicKeyCredential` means WebAuthn is usable.
  // `isUserVerifyingPlatformAuthenticatorAvailable` means the feature detection is usable.
  // `isConditionalMediationAvailable` means the feature detection is usable.
  const isSupported = async (): Promise<boolean> => {
    if (
      window.PublicKeyCredential &&
      PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable &&
      PublicKeyCredential.isConditionalMediationAvailable
    ) {
      // Check if user verifying platform authenticator is available.
      const results = await Promise.all([
        PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable(),
        PublicKeyCredential.isConditionalMediationAvailable(),
      ]);
      if (results.every(r => r === true)) {
        return true;
      }
    }
    return false;
  };

  const registration = async (label: string): Promise<boolean> => {
    const publicKey = (await api.passkey().webAuthnRegisterOptions()) as WebAuthnRegisterOptions;

    const registrationOptions = parseCreationOptionsFromJSON({ publicKey } as CredentialCreationOptionsJSON);

    const registration = await create(registrationOptions);

    const credential = registration.toJSON();

    const request: WebAuthnRegister = { publicKey: { label: label, credential: credential } };

    return (await api.passkey().webAuthnRegister(request)) as boolean;
  };

  const authentication = async (): Promise<boolean> => {
    const publicKey = (await api.passkey().webAuthnAuthenticateOptions()) as WebAuthnAuthenticateOptions;

    const authenticationOptions = parseRequestOptionsFromJSON({ publicKey } as CredentialRequestOptionsJSON);

    const authentication = await get(authenticationOptions);

    const request = authentication.toJSON();

    return (await api.passkey().webAuthnAuthenticate(request)) as boolean;
  };

  return {
    isSupported,
    registration,
    authentication,
  };
}
