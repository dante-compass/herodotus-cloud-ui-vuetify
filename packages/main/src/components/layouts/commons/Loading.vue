<template>
  <v-overlay v-model="store.loading" class="align-center justify-center">
    <v-progress-circular
      :rotate="360"
      :size="100"
      :width="10"
      color="primary"
      indeterminate
    ></v-progress-circular>
  </v-overlay>
</template>

<script setup lang="ts">
import { useApplicationStore } from '@herodotus/framework';

defineOptions({ name: 'loading' });

const store = useApplicationStore();
</script>

<style lang="scss" scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
