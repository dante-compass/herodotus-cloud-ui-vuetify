import type { App } from 'vue';

import HDuration from './HDuration.vue';

HDuration.install = (app: App): void => {
  app.component(HDuration.name as string, HDuration);
};

export { HDuration };
