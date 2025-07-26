import type { KernelOptions } from '@/declarations';

// 防止 store 类出现异常提示
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { SecurityApiResources } from './security';
import { OptionsUtilities, RouterUtilities } from './utilities';

const initializer = (options: KernelOptions) => {
  OptionsUtilities.initialize(options);
  RouterUtilities.initialize(options.router);
  SecurityApiResources.initialize(options.config);
};

export { initializer };
