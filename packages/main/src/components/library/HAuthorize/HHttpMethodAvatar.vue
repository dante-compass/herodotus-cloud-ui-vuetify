<template>
  <v-avatar>
    <v-icon :color="color(method)" text-color="white" :icon="icon(method)"></v-icon>
  </v-avatar>
</template>

<script setup lang="ts">
import type { HttpMethod } from '@herodotus/core';

import { HTTP_METHOD_STYLE_GROUP } from '@/configurations';
import { useDisplayElement } from '@/composables/hooks';

defineOptions({ name: 'HHttpMethodAvatar' });

interface Props {
  method: HttpMethod;
}

defineProps<Props>();

const { icon, color } = useDisplayElement(HTTP_METHOD_STYLE_GROUP);
</script>
