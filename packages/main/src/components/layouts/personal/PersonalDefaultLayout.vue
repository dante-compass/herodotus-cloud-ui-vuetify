<template>
  <v-app id="user">
    <layout-setting-drawer></layout-setting-drawer>
    <layout-bar personal></layout-bar>

    <v-main :class="backgroundColor">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg">
              <personal-menu></personal-menu>
            </v-sheet>
          </v-col>
          <v-col>
            <v-sheet min-height="70vh" rounded="lg">
              <layout-content></layout-content>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { LayoutContent, LayoutBar, LayoutSettingDrawer } from '../commons';

import { useSettingsStore } from '@herodotus/framework';

import PersonalMenu from './PersonalMenu.vue';

defineOptions({
  name: 'PersonalDefaultLayout',
  components: { LayoutContent, LayoutBar, LayoutSettingDrawer, PersonalMenu },
});

const settings = useSettingsStore();

const backgroundColor = computed(() => {
  return settings.isLight ? 'bg-grey-lighten-3' : '';
});
</script>
