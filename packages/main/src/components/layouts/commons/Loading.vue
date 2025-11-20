<template>
  <v-overlay v-model="overlay" class="align-center justify-center">
    <v-progress-circular
      v-model="value"
      :rotate="360"
      :size="100"
      :width="15"
      color="primary"
      indeterminate
    >
      <template #default>{{ value }} %</template>
    </v-progress-circular>
  </v-overlay>
</template>

<script setup lang="ts">
import { useApplicationStore } from '@herodotus/framework';

defineOptions({ name: 'loading' });

const store = useApplicationStore();

const value = shallowRef(0);

const overlay = computed(() => {
  return store.loading;
});
</script>
