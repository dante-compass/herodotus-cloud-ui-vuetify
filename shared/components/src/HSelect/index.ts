import type { App } from 'vue';

import HMdiIconSelect from './HMdiIconSelect.vue';

HMdiIconSelect.install = (app: App): void => {
  app.component(HMdiIconSelect.name as string, HMdiIconSelect);
};

export { HMdiIconSelect };
