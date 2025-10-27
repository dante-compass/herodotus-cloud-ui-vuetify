import type { App } from 'vue';

import { HButton } from './HButton';
import { HParticles } from './HParticles';
import { HSettingLabel } from './HLabel';
import { HSignInBackground } from './HSignIn';

const components = [HButton, HParticles, HSettingLabel, HSignInBackground];

const install = (app: App) => {
  components.map((component) => component.install(app));
};

export { HButton, HParticles, HSettingLabel, HSignInBackground };

export * from './declarations';

export default {
  install,
};
