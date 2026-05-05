import type { App } from 'vue';

import HTextDivider from './HTextDivider.vue';

HTextDivider.install = (app: App): void => {
  app.component(HTextDivider.name as string, HTextDivider);
};

export { HTextDivider };
