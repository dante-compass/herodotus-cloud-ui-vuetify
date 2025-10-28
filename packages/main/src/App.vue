<template>
  <v-theme-provider :theme="theme">
    <router-view />
  </v-theme-provider>
</template>

<script lang="ts" setup>
import { useThemeTransition } from '@herodotus/framework';

const { theme } = useThemeTransition();
</script>
