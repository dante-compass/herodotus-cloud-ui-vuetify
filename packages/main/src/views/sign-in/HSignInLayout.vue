<template>
  <v-parallax :style="{ backgroundColor: backgroundColor }">
    <!-- <Particles id="tsparticles" :particlesInit="particlesInit" :options="particlesOptions" /> -->
    <v-container fluid>
      <v-row class="h-screen" justify="center">
        <v-col></v-col>
        <v-col align-self="center">
          <v-card class="mx-auto">
            <v-toolbar color="transparent">
              <template v-slot:prepend>
                <v-btn icon="$menu"></v-btn>
              </template>

              <v-toolbar-title class="text-h6" text="Messages"></v-toolbar-title>

              <template v-slot:append>
                <v-btn icon="mdi-dots-vertical"></v-btn>
              </template>
            </v-toolbar>
            <v-card-actions>
              <v-btn color="orange-lighten-2" text="Explore"></v-btn>

              <v-spacer></v-spacer>
            </v-card-actions>

            <v-expand-transition>
              <div>
                <v-divider></v-divider>

                <v-card-text>
                  I'm a thing. But, like most politicians, he promised more than he could deliver.
                  You won't have time for sleeping, soldier, not with all the bed making you'll be
                  doing. Then we'll go with that data file! Hey, you add a one and two zeros to that
                  or we walk! You're going to do his laundry? I've got to find a way to escape.
                </v-card-text>
              </div>
            </v-expand-transition>
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
import { defineComponent, ref, computed } from 'vue';
import { useRouter } from 'vue-router';

import { useAuthenticationStore, useSettingsStore, ThemeModeEnum } from '@herodotus/framework';
import { mixColor, getColorPalette } from './color';

defineOptions({
  name: 'HSignInLayout',
});

const settings = useSettingsStore();

const backgroundThemeColor = computed(() => {
  return settings.isDark ? getColorPalette(settings.theme.primary, 7) : settings.theme.primary;
});

const lightColor = computed(() => {
  return getColorPalette(backgroundThemeColor.value as string, 3);
});

const darkColor = computed(() => {
  return getColorPalette(backgroundThemeColor.value as string, 6);
});

const backgroundColor = computed(() => {
  const COLOR_WHITE = '#ffffff';
  const ratio = settings.isDark ? 0.5 : 0.2;
  return mixColor(COLOR_WHITE, settings.theme.primary, ratio);
});
// import type { Engine } from 'tsparticles-engine';

// import { options } from '/@/plugins/particles';

// export default defineComponent({
//   name: 'HSignInLayout',

//   setup() {
//     // const logo = getVuetifyImage('vuetify-logo-v3-light.svg');

//     // const particlesInit = async (engine: Engine) => {
//     // 	await loadFull(engine);
//     // };

//     const signIn = () => {
//       store.signIn(username.value, passowrd.value);
//       if (store.access_token) {
//         signInSuccess();
//       }
//     };

//     const signInSuccess = () => {
//       router.push('/');
//     };

//     const backgroundThemeColor = computed(() => {
//       return settings.theme.mode === ThemeModeEnum.DARK
//         ? getColorPalette(settings.theme.primary, 7)
//         : settings.theme.primary;
//     });

//     const backgroundColor = computed(() => {
//       const COLOR_WHITE = '#ffffff';
//       const ratio = settings.theme.mode === ThemeModeEnum.DARK ? 0.5 : 0.2;
//       return mixColor(COLOR_WHITE, settings.theme.primary, ratio);
//     });

//     // const particlesOptions = lodash.cloneDeep(options);

//     return {
//       signIn,
//       signInSuccess,
//       backgroundThemeColor,
//       backgroundColor,
//       // logo,
//       // particlesOptions,
//       // particlesInit,
//     };
//   },
// });
</script>
