import type { App } from "vue";

import { HIconButton } from "./HButton";
import { HDate, HDateTime, HDuration, HTime } from "./HDateTime";
import { HDialog } from "./HDialog";
import { HDivider } from "./HDivider";
import { HDownloadProgress } from "./HProgress";
import { HLabel } from "./HLabel";
import { HParticles } from "./HParticles";
import { HMdiIconSelect, HTreeSelect } from "./HSelect";
import { HSignInBackground } from "./HSignIn";

const components = [
  HDate,
  HDateTime,
  HDialog,
  HDivider,
  HDownloadProgress,
  HDuration,
  HMdiIconSelect,
  HIconButton,
  HLabel,
  HParticles,
  HSignInBackground,
  HTime,
  HTreeSelect,
];

const install = (app: App) => {
  components.map((component) => component.install(app));
};

export {
  HDate,
  HDateTime,
  HDialog,
  HDivider,
  HDownloadProgress,
  HDuration,
  HMdiIconSelect,
  HIconButton,
  HLabel,
  HParticles,
  HSignInBackground,
  HTime,
  HTreeSelect,
};

export * from "./lib";

export default {
  install,
};
