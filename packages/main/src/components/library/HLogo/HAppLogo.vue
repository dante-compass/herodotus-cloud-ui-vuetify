<template>
  <v-img :src="logo" v-bind="$attrs" />
</template>

<script setup lang="ts">
import { useImage } from '@/composables/hooks';

defineOptions({ name: 'HAppLogo' });

const { getSystemLogo } = useImage();

const logo = computed(() => {
  return getSystemLogo();
});
</script>
