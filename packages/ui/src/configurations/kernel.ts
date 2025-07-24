import type { Router, RouteRecordRaw } from 'vue-router';
import type { KernelOptions } from '@herodotus-cloud/framework-kernel';

import { initializer, RouterUtilities } from '@herodotus-cloud/framework-kernel';
import { Path } from './constants';

let RouterUtils = {} as RouterUtilities;

const setupKernel = (currentRouter: Router, staticRoutes: Array<RouteRecordRaw>) => {
  const options: KernelOptions = {
    router: {
      instance: currentRouter,
      path: {
        root: { path: Path.ROOT },
        home: { name: Path.HOME_NAME },
        signIn: { name: Path.SIGN_IN_NAME },
      },
    },
    staticRoutes: staticRoutes,
  };

  initializer(options);

  RouterUtils = RouterUtilities.getInstance();
};

export { setupKernel, RouterUtils };
