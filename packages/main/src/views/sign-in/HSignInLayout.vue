<template>
  <v-parallax :style="{ backgroundColor: backgroundColor }">
    <h-particles></h-particles>

    <v-container fluid>
      <v-row class="h-screen" justify="center">
        <v-col></v-col>
        <v-col align-self="center">
          <v-card class="elevation-20 mx-auto rounded-xl" style="z-index: 5">
            <template v-slot:append>
              <v-btn
                :icon="cycleChangeThemeIcon"
                @click="onCycleChangeTheme()"
                class="mx-2"
              ></v-btn>
            </template>
            <h-app-logo height="15vh"></h-app-logo>
            <slot></slot>
          </v-card>
        </v-col>
        <v-col></v-col>
      </v-row>
    </v-container>
    <h-sign-in-background :start-color="lightColor" :end-color="darkColor"></h-sign-in-background>
  </v-parallax>
</template>

<script setup lang="ts">
import { useSystemTheme, useSettingsStore } from '@herodotus/framework';

defineOptions({
  name: 'HSignInLayout',
});

const { lightColor, darkColor, backgroundColor, onCycleChangeTheme, cycleChangeThemeIcon } =
  useSystemTheme();
const settings = useSettingsStore();

const item = shallowRef(0);
const toolbarColor = computed(() => {
  return settings.isLightenMode ? 'primary' : undefined;
});
</script>
