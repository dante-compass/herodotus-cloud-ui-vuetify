<template>
  <v-navigation-drawer
    id="settings-drawer"
    v-model="application.rightDrawer"
    location="right"
    width="350"
    disable-route-watcher
    temporary
    touchless
  >
    <v-toolbar title="系统设置" flat>
      <template #append>
        <v-btn icon="mdi-close" variant="flat" @click="application.rightDrawer = false"></v-btn>
      </template>
    </v-toolbar>

    <v-divider></v-divider>

    <v-container class="px-3 py-3">
      <setting-options></setting-options>
      <v-divider class="mt-4 mb-3" />
      <!-- <h-text-divider justify="start" label="界面效果"></h-text-divider>
      <h-setting-switch
        v-model="settings.effect.isUniqueOpened"
        label="菜单手风琴"
      ></h-setting-switch>
      <h-text-divider justify="start" label="界面展示"></h-text-divider>
      <h-setting-switch
        v-model="settings.display.isTabsView"
        label="开启 TabsView"
      ></h-setting-switch> -->
    </v-container>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { useApplicationStore } from '@herodotus/framework';

import { SettingOptions } from '../setting';

defineOptions({ name: 'AppRightDrawer', components: { SettingOptions } });

const application = useApplicationStore();
</script>
