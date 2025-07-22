import type { KernelOptions } from '@/declarations';

import { OptionsUtilities, RouterUtilities } from './utilities';

const initializer = (options: KernelOptions) => {
  OptionsUtilities.initialize(options);
  RouterUtilities.initialize(options.router);
};

export { initializer };
