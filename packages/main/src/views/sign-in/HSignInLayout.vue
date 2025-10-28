<template>
  <v-parallax :style="{ backgroundColor: backgroundColor }">
    <h-particles></h-particles>
    <v-container fluid>
      <v-row class="h-screen" justify="center">
        <v-col></v-col>
        <v-col align-self="center">
          <v-card class="elevation-20 mx-auto rounded-xl" style="z-index: 5">
            <v-toolbar>
              <template v-slot:prepend>
                <v-btn icon="mdi-google-nearby"></v-btn>
              </template>

              <v-divider vertical></v-divider>

              <v-toolbar-title class="text-h6">欢迎使用</v-toolbar-title>

              <template v-slot:append>
                <v-btn icon="mdi-dots-vertical"></v-btn>
              </template>
            </v-toolbar>
            <slot></slot>
          </v-card>
        </v-col>
        <v-col></v-col>
      </v-row>
    </v-container>
    <h-sign-in-background
      :start-color="lightColor"
      :end-color="darkColor"
      st
    ></h-sign-in-background>
  </v-parallax>
</template>

<script setup lang="ts">
import { useSettingsStore } from '@herodotus/framework';
import { mixColor, getColorPalette } from './color';

defineOptions({
  name: 'HSignInLayout',
});

const settings = useSettingsStore();

const backgroundThemeColor = computed(() => {
  return settings.isDarkMode ? getColorPalette(settings.theme.primary, 7) : settings.theme.primary;
});

const lightColor = computed(() => {
  return getColorPalette(backgroundThemeColor.value as string, 3);
});

const darkColor = computed(() => {
  return getColorPalette(backgroundThemeColor.value as string, 6);
});

const backgroundColor = computed(() => {
  const COLOR_WHITE = '#ffffff';
  const ratio = settings.isDarkMode ? 0.5 : 0.2;
  return mixColor(COLOR_WHITE, settings.theme.primary, ratio);
});
</script>
