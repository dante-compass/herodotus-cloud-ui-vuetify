import type { App } from "vue";

import { HButton } from "./HButton";
import { HDate, HDateTime, HDuration, HTime } from "./HDateTime";
import { HDialog } from "./HDialog";
import { HSwitch } from "./HForm";
import { HTextDivider } from "./HDivider";
import { HDownloadProgress } from "./HProgress";
import { HLabel } from "./HLabel";
import { HParticles } from "./HParticles";
import { HMdiIconSelect, HTreeSelect } from "./HSelect";
import { HSignInBackground } from "./HSignIn";

const components = [
  HButton,
  HDate,
  HDateTime,
  HDialog,
  HDownloadProgress,
  HDuration,
  HMdiIconSelect,
  HLabel,
  HParticles,
  HSignInBackground,
  HSwitch,
  HTextDivider,
  HTime,
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
  HLabel,
  HParticles,
  HSignInBackground,
  HSwitch,
  HTextDivider,
  HTime,
  HTreeSelect,
};

export * from "./lib";

export default {
  install,
};
