import type { App } from "vue";

import { HBitsGalaxy, HBitsGhostFibers, HBitsPrismaticBurst, HBitsThreads, HParticles } from "./HAnimate";
import { HSignInBackground } from "./HSignIn";

const components = [HBitsGalaxy, HBitsGhostFibers, HBitsPrismaticBurst, HBitsThreads, HParticles, HSignInBackground];

const install = (app: App) => {
  components.map((component) => component.install(app));
};

export { HBitsGalaxy, HBitsGhostFibers, HBitsPrismaticBurst, HBitsThreads, HParticles, HSignInBackground };

export default {
  install,
};
