<template>
  <v-app>
    <h-app-right-drawer></h-app-right-drawer>
    <h-app-bar></h-app-bar>
    <h-app-left-drawer></h-app-left-drawer>

    <v-main :class="backgroundColor">
      <h-app-tab-view></h-app-tab-view>
      <h-app-container></h-app-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import { useSettingsStore } from '@herodotus/framework';

import { HAppLeftDrawer, HAppRightDrawer } from './drawer';
import { HAppBar } from './header';
import HAppContainer from './HAppContainer.vue';
import HAppTabView from './HAppTabView.vue';

defineOptions({
  name: 'HAppDefaultLayout',
  components: { HAppLeftDrawer, HAppRightDrawer, HAppContainer, HAppBar, HAppTabView },
});

const settings = useSettingsStore();

const backgroundColor = computed(() => {
  return settings.isLight ? 'bg-grey-lighten-3' : '';
});
</script>
