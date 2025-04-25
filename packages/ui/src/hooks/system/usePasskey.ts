import type {
  CredentialCreationOptionsJSON,
  CredentialRequestOptionsJSON,
} from '@github/webauthn-json/browser-ponyfill';

import {
  create,
  parseCreationOptionsFromJSON,
  parseRequestOptionsFromJSON,
  get,
} from '@github/webauthn-json/browser-ponyfill';

import type { WebAuthnRegister } from '@/lib/declarations';

import { API } from '@/configurations';
import { useAuthenticationStore } from '@/stores';

export default function usePasskey() {
  const authenticationStore = useAuthenticationStore();

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
      if (results.every((r) => r === true)) {
        return true;
      }
    }
    return false;
  };

  const registration = (label: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      API.core.passkey()
        .fetchWebAuthnRegisterOptions()
        .then((publicKey) => {
          const registrationOptions = parseCreationOptionsFromJSON({
            publicKey,
          } as CredentialCreationOptionsJSON);
          create(registrationOptions).then((registration) => {
            const credential = registration.toJSON();
            const request: WebAuthnRegister = {
              publicKey: { label: label, credential: credential },
            };
            API.core.passkey()
              .webAuthnRegister(request)
              .then(() => {
                resolve(true);
              });
          });
        })
        .catch(() => {
          reject(false);
        });
    });

    // const publicKey = (await API.passkey().fetchWebAuthnRegisterOptions()) as WebAuthnRegisterOptions;

    // const registrationOptions = parseCreationOptionsFromJSON({ publicKey } as CredentialCreationOptionsJSON);

    // const registration = await create(registrationOptions);

    // const credential = registration.toJSON();

    // const request: WebAuthnRegister = { publicKey: { label: label, credential: credential } };

    // return (await API.passkey().webAuthnRegister(request)) as boolean;
  };

  const authenticator = (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      API.core.passkey()
        .fetchWebAuthnAuthenticateOptions()
        .then((publicKey) => {
          const authenticationOptions = parseRequestOptionsFromJSON({
            publicKey,
          } as CredentialRequestOptionsJSON);
          get(authenticationOptions).then((authentication) => {
            const request = authentication.toJSON();
            authenticationStore.passkey(request).then((result) => {
              resolve(result);
            });
          });
        })
        .catch(() => {
          reject(false);
        });
    });

    // const publicKey = (await API.passkey().fetchWebAuthnAuthenticateOptions()) as WebAuthnAuthenticateOptions;

    // const authenticationOptions = parseRequestOptionsFromJSON({ publicKey } as CredentialRequestOptionsJSON);

    // const authentication = await get(authenticationOptions);

    // const request = authentication.toJSON();

    // return (await API.passkey().webAuthnAuthenticate(request)) as boolean;
  };

  return {
    isSupported,
    registration,
    authenticator,
  };
}
