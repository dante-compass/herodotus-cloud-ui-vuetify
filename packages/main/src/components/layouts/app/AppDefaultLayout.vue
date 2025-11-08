<template>
  <v-app>
    <app-right-drawer></app-right-drawer>
    <layout-bar></layout-bar>
    <app-left-drawer></app-left-drawer>

    <v-main :class="backgroundColor">
      <app-tab-view></app-tab-view>
      <layout-container></layout-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import { useSettingsStore } from '@herodotus/framework';

import { LayoutContainer, LayoutBar } from '../commons';
import AppTabView from './AppTabView.vue';
import AppLeftDrawer from './AppLeftDrawer.vue';
import AppRightDrawer from './AppRightDrawer.vue';

defineOptions({
  name: 'AppDefaultLayout',
  components: { LayoutContainer, LayoutBar, AppLeftDrawer, AppRightDrawer, AppTabView },
});

const settings = useSettingsStore();

const backgroundColor = computed(() => {
  return settings.isLight ? 'bg-grey-lighten-3' : '';
});
</script>
