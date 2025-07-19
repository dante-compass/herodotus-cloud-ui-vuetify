import type { Router } from 'vue-router';
import type { KernelOptions } from '@herodotus-cloud/framework-kernel';

import { initializer, RouterUtilities } from '@herodotus-cloud/framework-kernel';
import { Path } from './constants';

let RouterUtils = {} as RouterUtilities;

const setupKernel = (currentRouter: Router) => {
  const options: KernelOptions = {
    router: {
      instance: currentRouter,
      path: {
        root: { path: Path.ROOT },
        home: { name: Path.HOME_NAME },
        signIn: { name: Path.SIGN_IN_NAME },
      },
    },
  };

  initializer(options);

  RouterUtils = RouterUtilities.getInstance();
};

export { setupKernel, RouterUtils };
