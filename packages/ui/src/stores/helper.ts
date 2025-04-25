import { useDictionaryStore } from '@/composables/constants';
import { VARIABLES } from '@/configurations';

import { useAuthenticationStore } from './authentication';
import { useCryptoStore } from './crypto';

export const clearPersistData = () => {
  console.log('Clear Persist Data');
  useAuthenticationStore().$reset();
  useDictionaryStore().$reset();
  useCryptoStore().$reset();
};

export const getSystemHeaders = () => {
  const authentication = useAuthenticationStore();
  const crypto = useCryptoStore();
  const token = authentication.access_token;
  const sessionId = crypto.sessionId;

  const headers = {} as Record<string, string>;

  if (token) {
    headers['Authorization'] = 'Bearer ' + token;
  }

  if (sessionId) {
    headers['X-Herodotus-Session-Id'] = sessionId;
  }

  const tenantId = VARIABLES.getCurrentTenantId();
  if (tenantId) {
    headers['X-Herodotus-Tenant-Id'] = tenantId;
  }

  return headers;
};
