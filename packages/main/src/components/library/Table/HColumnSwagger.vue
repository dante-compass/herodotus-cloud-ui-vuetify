<template>
  <v-alert :color="color(method)" variant="outlined" density="compact" class="my-3">
    <v-row>
      <v-col cols="2">
        <div class="d-flex justify-center">
          <v-chip :color="color(method)" density="compact">
            {{ method }}
          </v-chip>
        </div></v-col
      >
      <v-col cols="5"
        ><div class="d-flex justify-start">{{ url }}</div></v-col
      >
      <v-col cols="5"
        ><div class="d-flex justify-end">{{ description }}</div></v-col
      >
    </v-row>
  </v-alert>
</template>

<script setup lang="ts">
import type { HttpMethod } from '@herodotus/core';

import { useSettingsStore } from '@herodotus/framework';

import { HTTP_METHOD_STYLE_GROUP } from '@/configurations';
import { useDisplayElement } from '@/composables/hooks';

defineOptions({ name: 'HColumnSwagger' });

interface Props {
  method: HttpMethod;
  url: string;
  description?: string;
}

defineProps<Props>();

const { color } = useDisplayElement(HTTP_METHOD_STYLE_GROUP);
const settings = useSettingsStore();

const dense = computed(() => {
  return settings.display.table.dense;
});

const size = computed(() => {
  return settings.display.table.dense ? 'small' : 'default';
});
</script>

<style lang="scss" scoped>
.v-alert__append {
  align-self: center !important;
}
</style>
