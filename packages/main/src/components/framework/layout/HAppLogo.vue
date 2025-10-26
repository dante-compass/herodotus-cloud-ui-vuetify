<template>
  <v-img height="50" :src="logo" width="280" alt="Vuetify Logo" class="mx-auto" max-width="100%" />
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify';

defineOptions({ name: 'HAppLogo' });

const theme = useTheme();

const logo = computed(() => {
  return `/images/layouts/dante-cloud-${theme.current.value.dark ? 'dark' : 'light'}.png`;
});
</script>
