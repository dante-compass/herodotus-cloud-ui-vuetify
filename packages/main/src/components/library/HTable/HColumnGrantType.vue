<template>
  <div>
    <h-action-button
      v-for="(item, i) in items"
      :key="i"
      :icon="icon(item)"
      :color="color(item)"
      :tooltip="text(item)"
    ></h-action-button>
  </div>
</template>

<script setup lang="ts">
import { GRANT_TYPE_STYLE_GROUP } from '@/configurations';
import { useDisplayElement } from '@/composables/hooks';

import HActionButton from './HActionButton.vue';

defineOptions({ name: 'HColumnGrantType', components: { HActionButton } });

interface Props {
  items: string[];
}

defineProps<Props>();

const { icon, color, text } = useDisplayElement(GRANT_TYPE_STYLE_GROUP);
</script>
