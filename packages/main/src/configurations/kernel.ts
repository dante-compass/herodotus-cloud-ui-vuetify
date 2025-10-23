import type { Router } from 'vue-router';
import type { KernelOptions } from '@herodotus/framework';

import { initializer, RouterUtilities } from '@herodotus/framework';
import { DEAULT_ROUTER_LINK } from './constants';
import { VARIABLES } from './variables';
import { config } from './http';
// import { useWebSocketMessage } from '@/composables/messages';
// import { useDictionaryStore } from '@/composables/constants';

let RouterUtils = {} as RouterUtilities;

const setupKernel = (currentRouter: Router) => {
  const options: KernelOptions = {
    router: {
      instance: currentRouter,
      path: {
        root: { path: DEAULT_ROUTER_LINK.root.path },
        home: { name: DEAULT_ROUTER_LINK.home.name },
        signIn: { name: DEAULT_ROUTER_LINK.sign_in.name },
      },
    },
    staticRoutes: currentRouter.getRoutes(),
    config: config,
    variables: {
      securityKey: VARIABLES.getSecretKey(),
      tenantId: VARIABLES.getCurrentTenantId(),
      isAutoRefreshToken: VARIABLES.getAutoRefreshToken(),
      isUseCrypto: VARIABLES.isUseCrypto(),
      redirectUri: VARIABLES.getRedirectUri(),
    },
    signOutExtension: () => {
      // const { disconnect } = useWebSocketMessage();
      // disconnect();
      // useDictionaryStore().$reset();
    },
  };

  initializer(options);

  RouterUtils = RouterUtilities.getInstance();
};

export { setupKernel, RouterUtils };
