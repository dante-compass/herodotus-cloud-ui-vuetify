import type { App } from 'vue';

import HMdiIconSelect from './HMdiIconSelect.vue';
import HTreeSelect from './HTreeSelect.vue';

HMdiIconSelect.install = (app: App): void => {
  app.component(HMdiIconSelect.name as string, HMdiIconSelect);
};

HTreeSelect.install = (app: App): void => {
  app.component(HTreeSelect.name as string, HTreeSelect);
};

export { HMdiIconSelect, HTreeSelect };
