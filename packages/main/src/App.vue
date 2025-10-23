<template>
  <v-theme-provider :theme="theme">
    <router-view />
  </v-theme-provider>
</template>

<script lang="ts" setup>
import { useSystemTheme } from '@herodotus/framework';

const { theme } = useSystemTheme();
</script>
