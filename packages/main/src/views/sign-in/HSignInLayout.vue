<template>
  <v-parallax v-if="isLightenMode" :style="{ backgroundColor: backgroundColor }">
    <h-particles></h-particles>
    <h-sign-in-container>
      <slot></slot>
    </h-sign-in-container>
    <h-sign-in-background :start-color="lightColor" :end-color="darkColor"></h-sign-in-background>
  </v-parallax>
  <div v-else>
    <h-bits-galaxy :transparent="false" :saturation="1" :auto-center-repulsion="1" :hue-shift="200"></h-bits-galaxy>
    <!-- <h-bits-threads></h-bits-threads> -->
    <!-- <h-bits-prismatic-burst></h-bits-prismatic-burst> -->

    <h-sign-in-container>
      <slot></slot>
    </h-sign-in-container>
  </div>
</template>

<script setup lang="ts">
import { useSystemTheme, useApplicationStore } from '@herodotus/framework';

import HSignInContainer from './HSignInContainer.vue';

defineOptions({ name: 'HSignInLayout', components: { HSignInContainer } });

const { isLightenMode, lightColor, darkColor, backgroundColor, onCycleChangeTheme, cycleChangeThemeIcon } =
  useSystemTheme();
const application = useApplicationStore();

const tabs = shallowRef('account');

watch(tabs, (newValue) => {
  application.signInPanel = newValue;
});
</script>
