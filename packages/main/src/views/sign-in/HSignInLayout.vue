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
            <v-card-text>
              <v-card variant="tonal" rounded="xl" class="mx-auto" max-width="420">
                <v-tabs align-tabs="center">
                  <v-tab class="font-weight-bold">账号密码登录</v-tab>
                  <v-tab class="font-weight-bold">手机短信登录</v-tab>
                  <v-tab class="font-weight-bold">微信扫码登录</v-tab>
                </v-tabs>
              </v-card>
            </v-card-text>
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
