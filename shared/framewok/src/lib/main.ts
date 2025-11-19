import type { KernelOptions } from '@/declarations';

// 防止 store 类出现异常提示
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { changeSwalTheme } from '@herodotus/core';
import { useSettingsStore } from './stores';
import { SecurityApiResources } from './api';
import { OptionsUtilities, RouterUtilities, SignOutUtilities } from './utilities';

const initializer = (options: KernelOptions) => {
  const store = useSettingsStore();
  changeSwalTheme(store.theme.mode);

  OptionsUtilities.initialize(options);
  RouterUtilities.initialize(options.router);
  SecurityApiResources.initialize(options.config);
  SignOutUtilities.initialize(options.signOutExtension);
};

export { initializer, piniaPluginPersistedstate };
