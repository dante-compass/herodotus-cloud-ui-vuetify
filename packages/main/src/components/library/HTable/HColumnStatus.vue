<template>
  <h-action-button :color="color" :icon="icon" :tooltip="tooltip"></h-action-button>
</template>

<script setup lang="ts">
import type { Dictionary } from '@herodotus/core';

import { isEmpty } from 'lodash-es';

import { DATA_ITEM_STATUS } from '@/configurations';

import HActionButton from './HActionButton.vue';

defineOptions({ name: 'HColumnStatus', components: { HActionButton } });

interface Props {
  type: string;
  options: Array<Dictionary>;
}

const props = withDefaults(defineProps<Props>(), {
  type: '0',
});

const color = computed(() => {
  return DATA_ITEM_STATUS[Number(props.type)]!.color;
});

const icon = computed(() => {
  return DATA_ITEM_STATUS[Number(props.type)]!.icon;
});

const tooltip = computed(() => {
  if (!isEmpty(props.options)) {
    return props.options[Number(props.type)]!.label;
  } else {
    return '';
  }
});
</script>
