<template>
  <v-app id="personal">
    <layout-setting-drawer></layout-setting-drawer>
    <layout-bar personal></layout-bar>

    <v-main :class="backgroundColor">
      <v-container>
        <v-row>
          <v-col cols="1"></v-col>
          <v-col cols="10">
            <v-row>
              <v-col cols="2"><personal-menu></personal-menu></v-col>
              <v-col cols="10"><layout-content></layout-content></v-col>
            </v-row>
          </v-col>
          <v-col cols="1"></v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { LayoutContent, LayoutBar, LayoutSettingDrawer } from '../common';

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
