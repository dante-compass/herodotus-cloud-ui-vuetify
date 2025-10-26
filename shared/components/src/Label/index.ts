import type { App } from 'vue';

import HSettingLabel from './HSettingLabel.vue';

HSettingLabel.install = (app: App): void => {
  app.component(HSettingLabel.name as string, HSettingLabel);
};

export { HSettingLabel };
