import type { App } from 'vue';

import HButton from './HButton.vue';

HButton.install = (app: App): void => {
  app.component(HButton.name as string, HButton);
};

export { HButton };
