<template>
  <v-navigation-drawer v-model="application.leftDrawer" width="300">
    <layout-menu :items="items"></layout-menu>

    <template #append>
      <v-divider></v-divider>
      <layout-version></layout-version>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import type { MenuItem } from '@herodotus/framework';
import { useApplicationStore } from '@herodotus/framework';
import LayoutMenu from './LayoutMenu.vue';
import LayoutVersion from './LayoutVersion.vue';

defineOptions({ name: 'LayoutLeftDrawer', components: { LayoutMenu, LayoutVersion } });

interface Props {
  items: MenuItem[];
}

defineProps<Props>();

const application = useApplicationStore();
</script>
