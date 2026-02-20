<template>
  <v-parallax :style="{ backgroundColor: backgroundColor }">
    <h-particles></h-particles>

    <v-container fluid>
      <v-row class="h-screen" justify="center">
        <v-col></v-col>
        <v-col align-self="center">
          <v-card class="elevation-20 mx-auto rounded-xl" style="z-index: 5">
            <template v-slot:append>
              <v-btn :icon="cycleChangeThemeIcon" @click="onCycleChangeTheme()" class="mx-2"></v-btn>
            </template>
            <h-app-logo height="10vh" class="mb-2"></h-app-logo>
            <v-card-text>
              <v-card variant="tonal" elevation="2" class="mx-auto" max-width="420">
                <v-tabs v-model="tabs" align-tabs="center">
                  <v-tab value="account" class="font-weight-bold">账号密码登录</v-tab>
                  <v-tab value="mobile" class="font-weight-bold">手机短信登录</v-tab>
                  <!-- <v-tab value="scan" class="font-weight-bold">微信扫码登录</v-tab> -->
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
import { useSystemTheme, useApplicationStore } from '@herodotus/framework';

import { HAppLogo } from '@/components/library/HLogo';

defineOptions({
  name: 'HSignInLayout',
  components: {
    HAppLogo,
  },
});

const { lightColor, darkColor, backgroundColor, onCycleChangeTheme, cycleChangeThemeIcon } = useSystemTheme();
const application = useApplicationStore();

const tabs = shallowRef('account');

watch(tabs, (newValue) => {
  application.signInPanel = newValue;
});
</script>
