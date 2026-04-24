import type { App } from 'vue';

import HDownloadProgress from './HDownloadProgress.vue';

HDownloadProgress.install = (app: App): void => {
  app.component(HDownloadProgress.name as string, HDownloadProgress);
};

export { HDownloadProgress };
