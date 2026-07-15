import type { App } from "vue";

import HIconButton from "./HIconButton.vue";

HIconButton.install = (app: App): void => {
  app.component(HIconButton.name as string, HIconButton);
};

export { HIconButton };
