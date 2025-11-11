<template>
  <v-app>
    <layout-setting-drawer></layout-setting-drawer>
    <layout-bar></layout-bar>
    <app-left-drawer></app-left-drawer>

    <v-main :class="backgroundColor">
      <app-tab-view></app-tab-view>
      <v-container class="pt-0" fluid>
        <layout-content></layout-content>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { useSettingsStore } from '@herodotus/framework';

import { LayoutContent, LayoutSettingDrawer, LayoutBar } from '../commons';
import AppTabView from './AppTabView.vue';
import AppLeftDrawer from './AppLeftDrawer.vue';

defineOptions({
  name: 'AppDefaultLayout',
  components: { LayoutContent, LayoutBar, LayoutSettingDrawer, AppLeftDrawer, AppTabView },
});

const settings = useSettingsStore();

const backgroundColor = computed(() => {
  return settings.isLight ? 'bg-grey-lighten-3' : '';
});
</script>
