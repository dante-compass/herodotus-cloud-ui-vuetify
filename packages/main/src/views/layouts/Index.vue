<template>
  <v-app>
    <h-app-right-drawer></h-app-right-drawer>

    <h-app-left-drawer></h-app-left-drawer>

    <h-app-toolbar></h-app-toolbar>

    <v-main :class="backgroundColor">
      <h-app-container></h-app-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import {
  HAppContainer,
  HAppLeftDrawer,
  HAppRightDrawer,
  HAppToolbar,
} from '@/components/application/layout';
import { useSettingsStore } from '@herodotus/framework';

defineOptions({
  name: 'HAppDefaultLayout',
  components: { HAppContainer, HAppLeftDrawer, HAppRightDrawer, HAppToolbar },
});

const settings = useSettingsStore();

const backgroundColor = computed(() => {
  return settings.isLight ? 'bg-grey-lighten-3' : '';
});
</script>
