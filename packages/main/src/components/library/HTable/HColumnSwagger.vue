<template>
  <v-alert :color="color(method)" variant="outlined" :density="settings.density" class="py-1">
    <v-row>
      <v-col cols="2">
        <div class="d-flex justify-center">
          <v-chip :color="color(method)" :density="settings.density">
            {{ method }}
          </v-chip>
        </div>
      </v-col>
      <v-col cols="5" align-self="center">
        <div class="d-flex justify-start">{{ url }}</div>
      </v-col>
      <v-col cols="5" align-self="center">
        <div class="d-flex justify-end">{{ description }}</div>
      </v-col>
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
</script>
