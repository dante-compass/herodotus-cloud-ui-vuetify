<template>
  <layout-left-drawer :items="menuItems"></layout-left-drawer>
</template>

<script lang="ts" setup>
import { useElementStore } from '@herodotus/framework';
import { LayoutLeftDrawer } from '../common';

defineOptions({ name: 'AppLeftDrawer', components: { LayoutLeftDrawer } });

const store = useElementStore();

const menuItems = computed(() => {
  return store.appMenus;
});
</script>
