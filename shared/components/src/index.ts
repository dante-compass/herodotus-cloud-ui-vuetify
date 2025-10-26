import type { App } from 'vue';

import { HButton } from './Button';

const components = [HButton];

const install = (app: App) => {
  components.map((component) => component.install(app));
};

export { HButton };

export default {
  install,
};
