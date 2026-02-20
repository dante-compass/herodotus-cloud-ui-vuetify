import type { App } from 'vue';
// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

// Composables
import { createVuetify } from 'vuetify';
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n';
import { createI18n, useI18n } from 'vue-i18n';
import { md3 } from 'vuetify/blueprints';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import * as VuetifyI18n from '@/i18n/vuetify';

const i18n = createI18n({
  legacy: false, // Vuetify does not support the legacy mode of vue-i18n
  locale: 'zh',
  fallbackLocale: 'en',
  messages: {
    ...VuetifyI18n,
  },
});

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
const vuetify = createVuetify({
  defaults: {
    VTextField: {
      color: 'primary',
      clearable: true,
    },
    VSwitch: {
      color: 'primary',
      inset: true,
    },
    VList: {
      color: 'primary',
    },
    VBtnToggle: {
      color: 'primary',
    },
    VCard: {
      rounded: 'xl',
    },
  },

  theme: {
    defaultTheme: 'system',
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  locale: {
    adapter: createVueI18nAdapter({ i18n, useI18n }),
  },

  blueprint: md3,
});

export const setupVuetify = (app: App<Element>) => {
  app.use(i18n);
  app.use(vuetify);
};
