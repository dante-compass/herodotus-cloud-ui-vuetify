import type { App } from "vue";

import HBitsGalaxy from "./HBitsGalaxy.vue";
import HBitsPrismaticBurst from "./HBitsPrismaticBurst.vue";
import HBitsThreads from "./HBitsThreads.vue";
import HParticles from "./HParticles.vue";

HBitsGalaxy.install = (app: App): void => {
  app.component(HBitsGalaxy.name as string, HBitsGalaxy);
};

HBitsPrismaticBurst.install = (app: App): void => {
  app.component(HBitsPrismaticBurst.name as string, HBitsPrismaticBurst);
};

HBitsThreads.install = (app: App): void => {
  app.component(HBitsThreads.name as string, HBitsThreads);
};

HParticles.install = (app: App): void => {
  app.component(HParticles.name as string, HParticles);
};

export { HBitsThreads, HBitsPrismaticBurst, HBitsGalaxy, HParticles };
