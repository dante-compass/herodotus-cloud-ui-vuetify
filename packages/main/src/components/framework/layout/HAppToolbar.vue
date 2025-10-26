<template>
  <v-app-bar id="tool-bar" app class="border-b" flat :priority="priority">
    <v-app-bar-nav-icon
      color="white"
      :icon="application.leftDrawer ? 'mdi-menu-open' : 'mdi-menu-close'"
      @click="application.leftDrawer = !application.leftDrawer"
    />

    <!-- <h-app-breadcrumbs v-if="showBreadcrumbs"></h-app-breadcrumbs> -->

    <v-spacer></v-spacer>

    <template v-if="mdAndUp">
      <v-btn aria-label="Refresh" icon="mdi-refresh"></v-btn>
      <h-button
        icon="mdi-cog-outline"
        tooltip="设置"
        @click.stop="application.rightDrawer = !application.rightDrawer"
      ></h-button>
    </template>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useDisplay } from 'vuetify';

import { useApplicationStore, useSettingsStore } from '@herodotus/framework';

defineOptions({ name: 'HAppToolbar' });

const { mdAndUp } = useDisplay();
const application = useApplicationStore();
const settings = useSettingsStore();

const priority = computed(() => {
  return settings.isClassicLayout ? -2 : 0;
});
</script>
