import type { App } from "vue";

import HButton from "./HButton.vue";
import HIconButton from "./HIconButton.vue";

HButton.install = (app: App): void => {
  app.component(HButton.name as string, HButton);
};

HIconButton.install = (app: App): void => {
  app.component(HIconButton.name as string, HIconButton);
};

export { HButton, HIconButton };
