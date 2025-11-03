<template>
  <v-img :src="logo" v-bind="$attrs" />
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify';

defineOptions({ name: 'HAppLogo' });

const theme = useTheme();

const logo = computed(() => {
  return `/images/layouts/dante-cloud-${theme.current.value.dark ? 'dark' : 'light'}.png`;
});
</script>
