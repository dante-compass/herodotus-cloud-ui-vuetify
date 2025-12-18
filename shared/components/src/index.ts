import type { App } from 'vue';

import { HButton } from './HButton';
import { HDate, HDateTime, HDuration, HTime } from './HDateTime';
import { HParticles } from './HParticles';
import { HLabel } from './HLabel';
import { HMdiIconSelect, HTreeSelect } from './HSelect';
import { HSignInBackground } from './HSignIn';

const components = [
  HButton,
  HDate,
  HDateTime,
  HDuration,
  HTime,
  HMdiIconSelect,
  HParticles,
  HLabel,
  HSignInBackground,
  HTreeSelect,
];

const install = (app: App) => {
  components.map((component) => component.install(app));
};

export {
  HButton,
  HDate,
  HDateTime,
  HDuration,
  HMdiIconSelect,
  HParticles,
  HLabel,
  HSignInBackground,
  HTime,
  HTreeSelect,
};

export * from './lib';

export default {
  install,
};
