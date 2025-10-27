import type { App } from 'vue';

import { HButton } from './Button';
import { HSettingLabel } from './Label';
import { HSignInBackground } from './SignIn';

const components = [HButton, HSettingLabel, HSignInBackground];

const install = (app: App) => {
  components.map((component) => component.install(app));
};

export { HButton, HSettingLabel, HSignInBackground };

export * from './declarations';

export default {
  install,
};
