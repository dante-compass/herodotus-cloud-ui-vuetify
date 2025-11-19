import type { App } from 'vue';

import { HButton } from './HButton';
import { HParticles } from './HParticles';
import { HSettingLabel } from './HLabel';
import { HMdiIconSelect } from './HSelect';
import { HSignInBackground } from './HSignIn';

const components = [HButton, HMdiIconSelect, HParticles, HSettingLabel, HSignInBackground];

const install = (app: App) => {
  components.map((component) => component.install(app));
};

export { HButton, HMdiIconSelect, HParticles, HSettingLabel, HSignInBackground };

export * from './lib';

export default {
  install,
};
