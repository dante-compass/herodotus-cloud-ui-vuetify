import type { App } from 'vue';

import HDate from './HDate.vue';
import HDateTime from './HDateTime.vue';
import HDuration from './HDuration.vue';
import HTime from './HTime.vue';

HDate.install = (app: App): void => {
  app.component(HDate.name as string, HDate);
};

HDateTime.install = (app: App): void => {
  app.component(HDateTime.name as string, HDateTime);
};

HDuration.install = (app: App): void => {
  app.component(HDuration.name as string, HDuration);
};

HTime.install = (app: App): void => {
  app.component(HTime.name as string, HTime);
};

export { HDate, HDateTime, HDuration, HTime };
