import type { App } from 'vue';

import { HButton } from './HButton';
import { HDuration } from './HDateTime';
import { HParticles } from './HParticles';
import { HSettingLabel } from './HLabel';
import { HMdiIconSelect, HTreeSelect } from './HSelect';
import { HSignInBackground } from './HSignIn';

const components = [
  HButton,
  HDuration,
  HMdiIconSelect,
  HParticles,
  HSettingLabel,
  HSignInBackground,
  HTreeSelect,
];

const install = (app: App) => {
  components.map((component) => component.install(app));
};

export {
  HButton,
  HDuration,
  HMdiIconSelect,
  HParticles,
  HSettingLabel,
  HSignInBackground,
  HTreeSelect,
};

export * from './lib';

export default {
  install,
};
