<template>
  <v-btn icon="mdi-dots-vertical"></v-btn>
</template>

<script setup lang="ts">
import {useTheme} from 'vuetify'
defineOptions({ name: 'ScanPanel' });

import {useSettingsStore} from '@herodotus/framework'

const settings = useSettingsStore();

const theme = useTheme();

const change = computed( () => {
  if (settings.isSystemMode) {
    return 'mdi-brightness-4'
  }

  if (settings.isLightMode) {
    
  }
})


</script>
