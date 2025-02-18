<template>
  <q-layout view="lHr LpR lFr" :class="[$q.dark.isActive ? 'bg-black' : 'bg-grey-2']">
    <h-app-header :tab-view="isTabsView" :breadcrumbs="showBreadcrumbs" message></h-app-header>

    <h-app-left-drawer></h-app-left-drawer>

    <h-app-right-drawer></h-app-right-drawer>

    <h-app-container></h-app-container>
  </q-layout>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useQuasar } from 'quasar';

import { HAppHeader, HAppLeftDrawer, HAppRightDrawer, HAppContainer } from '@/components';

import { useSettingsStore } from '@/stores';

defineOptions({
  name: 'HDefaultLayout',
  components: {
    HAppContainer,
    HAppHeader,
    HAppLeftDrawer,
    HAppRightDrawer,
  },
});

const settings = useSettingsStore();
const $q = useQuasar();

const isTabsView = computed(() => {
  return settings.display.isTabsView;
});

const showBreadcrumbs = computed(() => {
  return settings.display.showBreadcrumbs;
});
</script>
