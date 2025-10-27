<template>
  <v-app-bar class="border-b px-md-3" flat>
    <div class="px-1" />

    <v-app-bar-nav-icon
      class="ml-12"
      :icon="application.leftDrawer ? 'mdi-menu-open' : 'mdi-menu-close'"
      @click="application.leftDrawer = !application.leftDrawer"
    />

    <template #prepend>
      <v-img :src="logo" width="180" />
    </template>

    <!-- <h-app-breadcrumbs v-if="showBreadcrumbs"></h-app-breadcrumbs> -->

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

<script lang="ts" setup>
import { computed } from 'vue';
import { useDisplay, useTheme } from 'vuetify';

import { useApplicationStore } from '@herodotus/framework';

defineOptions({ name: 'HAppToolbar' });

const { mdAndUp } = useDisplay();
const application = useApplicationStore();

const theme = useTheme();

const logo = computed(() => {
  return `/images/layouts/dante-cloud-${theme.current.value.dark ? 'dark' : 'light'}.png`;
});
</script>
