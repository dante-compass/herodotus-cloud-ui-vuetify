<template>
  <layout-left-drawer :items="menuItems"></layout-left-drawer>
</template>

<script lang="ts" setup>
import { useElementStore } from '@herodotus/framework';
import { LayoutLeftDrawer } from '../commons';

defineOptions({ name: 'TestLeftDrawer', components: { LayoutLeftDrawer } });

const store = useElementStore();

const menuItems = computed(() => {
  return store.testMenus;
});
</script>
