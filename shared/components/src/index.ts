import type { App } from 'vue';

import { HButton } from './HButton';
import { HDate, HDateTime, HDuration, HTime } from './HDateTime';
import { HDialog } from './HDialog';
import { HDownloadProgress } from './HProgress';
import { HParticles } from './HParticles';
import { HLabel } from './HLabel';
import { HMdiIconSelect, HTreeSelect } from './HSelect';
import { HSignInBackground } from './HSignIn';

const components = [
  HButton,
  HDate,
  HDateTime,
  HDialog,
  HDownloadProgress,
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
  HDialog,
  HDownloadProgress,
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
