import type { App } from 'vue';

import HCardTitle from './HCardTitle.vue';
import HChartCard from './HChartCard.vue';

HChartCard.install = (app: App): void => {
  app.component(HCardTitle.name as string, HCardTitle);
  app.component(HChartCard.name as string, HChartCard);
};

export { HCardTitle, HChartCard };
