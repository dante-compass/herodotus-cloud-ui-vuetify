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
                <v-btn icon="mdi-google-nearby" class="mx-2"></v-btn>
              </template>

              <v-divider vertical></v-divider>

              <v-toolbar-title class="text-h6">欢迎使用</v-toolbar-title>

              <template v-slot:append>
                <v-btn
                  :icon="cycleChangeThemeIcon"
                  @click="onCycleChangeTheme()"
                  class="mx-2"
                ></v-btn>
              </template>
            </v-toolbar>
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
import { useSystemTheme } from '@herodotus/framework';

defineOptions({
  name: 'HSignInLayout',
});

const { lightColor, darkColor, backgroundColor, onCycleChangeTheme, cycleChangeThemeIcon } =
  useSystemTheme();
</script>
