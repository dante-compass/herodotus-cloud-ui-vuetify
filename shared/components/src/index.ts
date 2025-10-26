import type { App } from 'vue';

import { HButton } from './Button';
import { HSettingLabel } from './Label';

const components = [HButton, HSettingLabel];

const install = (app: App) => {
  components.map((component) => component.install(app));
};

export { HButton, HSettingLabel };

export default {
  install,
};
