<template>
  <v-app id="personal">
    <layout-setting-drawer></layout-setting-drawer>
    <layout-bar personal></layout-bar>

    <v-main :class="backgroundColor">
      <v-container fluid>
        <v-row>
          <v-col xxl="2" xl="2" lg="1" md="0" sm="0" xs="0"></v-col>
          <v-col xxl="8" xl="8" lg="10" md="12" sm="12" xs="12">
            <v-row>
              <v-col xxl="2" xl="2" lg="3" md="4" sm="5" xs="6"><personal-menu></personal-menu></v-col>
              <v-col xxl="10" xl="10" lg="9" md="8" sm="7" xs="6"><layout-content></layout-content></v-col>
            </v-row>
          </v-col>
          <v-col xxl="2" xl="2" lg="1" md="0" sm="0" xs="0"></v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { LayoutContent, LayoutBar, LayoutSettingDrawer } from "../common";

import { useSettingsStore } from "@herodotus/framework";

import PersonalMenu from "./PersonalMenu.vue";

defineOptions({
  name: "PersonalDefaultLayout",
  components: { LayoutContent, LayoutBar, LayoutSettingDrawer, PersonalMenu },
});

const settings = useSettingsStore();

const backgroundColor = computed(() => {
  return settings.isLight ? "bg-grey-lighten-3" : "";
});
</script>
