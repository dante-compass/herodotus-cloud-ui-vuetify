import type { App } from "vue";

import HSwitch from "./HSwitch.vue";

HSwitch.install = (app: App): void => {
  app.component(HSwitch.name as string, HSwitch);
};

export { HSwitch };
