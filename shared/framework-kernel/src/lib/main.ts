import type { KernelOptions } from '@/declarations';

import { RouterUtilities } from './utilities';

const initializer = (options: KernelOptions) => {
  RouterUtilities.initialize(options.router);
};

export { initializer };
