<template>
  <v-app id="test">
    <layout-setting-drawer></layout-setting-drawer>
    <layout-bar></layout-bar>
    <testing-left-drawer></testing-left-drawer>

    <v-main :class="backgroundColor">
      <v-container class="pt-0" fluid>
        <layout-content></layout-content>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useSettingsStore } from '@herodotus/framework';
import { LayoutContent, LayoutBar, LayoutSettingDrawer } from '../common';
import TestingLeftDrawer from './TestingLeftDrawer.vue';

defineOptions({
  name: 'TestingDefaultLayout',
  components: { LayoutContent, LayoutBar, LayoutSettingDrawer, TestingLeftDrawer },
});

const settings = useSettingsStore();

const backgroundColor = computed(() => {
  return settings.isLight ? 'bg-grey-lighten-3' : '';
});
</script>
