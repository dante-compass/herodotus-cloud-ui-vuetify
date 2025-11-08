<template>
  <v-app-bar class="border-b px-md-3" flat>
    <div class="px-1" />

    <v-app-bar-nav-icon
      class="ml-12"
      :icon="application.leftDrawer ? 'mdi-menu-open' : 'mdi-menu-close'"
      @click="application.leftDrawer = !application.leftDrawer"
    />

    <template #prepend>
      <h-app-logo width="180"></h-app-logo>
    </template>

    <layout-breadcrumbs v-if="!profile"></layout-breadcrumbs>

    <v-spacer></v-spacer>

    <div class="d-flex ga-1">
      <template v-if="mdAndUp">
        <h-button
          icon="mdi-cog-outline"
          tooltip="设置"
          @click.stop="application.rightDrawer = !application.rightDrawer"
        ></h-button>
      </template>

      <v-divider vertical></v-divider>

      <v-btn aria-label="Refresh" icon="mdi-refresh"></v-btn>
    </div>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify';

import { useApplicationStore } from '@herodotus/framework';

import { HAppLogo } from '../../library/Logo';
import LayoutBreadcrumbs from './LayoutBreadcrumbs.vue';

defineOptions({ name: 'LayoutBar', components: { HAppLogo, LayoutBreadcrumbs } });

const { mdAndUp } = useDisplay();
const application = useApplicationStore();

interface Props {
  profile?: boolean;
}

withDefaults(defineProps<Props>(), {
  profile: false,
});
</script>
