import type { App } from "vue";

import { HBitsGalaxy, HBitsPrismaticBurst, HBitsThreads, HParticles } from "./HAnimate";
import { HSignInBackground } from "./HSignIn";

const components = [HBitsGalaxy, HBitsPrismaticBurst, HBitsThreads, HParticles, HSignInBackground];

const install = (app: App) => {
  components.map((component) => component.install(app));
};

export { HBitsGalaxy, HBitsPrismaticBurst, HBitsThreads, HParticles, HSignInBackground };

export default {
  install,
};
