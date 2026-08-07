import type { App } from "vue";

import { HBitsGalaxy, HBitsPrismaticBurst, HBitsThreads, HParticles } from "./HAnimate";
import { HIconButton } from "./HButton";
import { HDate, HDateTime, HDuration, HTime } from "./HDateTime";
import { HDialog } from "./HDialog";
import { HDivider } from "./HDivider";
import { HDownloadProgress } from "./HProgress";
import { HLabel } from "./HLabel";
import { HMdiIconSelect, HTreeSelect } from "./HSelect";
import { HSignInBackground } from "./HSignIn";
import { HLabelItem } from "./HItem";

const components = [
  HBitsGalaxy,
  HBitsPrismaticBurst,
  HBitsThreads,
  HDate,
  HDateTime,
  HDialog,
  HDivider,
  HDownloadProgress,
  HDuration,
  HMdiIconSelect,
  HIconButton,
  HLabel,
  HLabelItem,
  HParticles,
  HSignInBackground,
  HTime,
  HTreeSelect,
];

const install = (app: App) => {
  components.map((component) => component.install(app));
};

export {
  HBitsGalaxy,
  HBitsPrismaticBurst,
  HBitsThreads,
  HDate,
  HDateTime,
  HDialog,
  HDivider,
  HDownloadProgress,
  HDuration,
  HMdiIconSelect,
  HIconButton,
  HLabel,
  HLabelItem,
  HParticles,
  HSignInBackground,
  HTime,
  HTreeSelect,
};

export * from "./lib";

export default {
  install,
};
