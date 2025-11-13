<template>
  <h-action-button
    v-if="value"
    :color="trueColor"
    :icon="trueIcon"
    :tooltip="trueTooltip"
  ></h-action-button>
  <h-action-button
    v-else
    :color="falseColor"
    :icon="falseIcon"
    :tooltip="falseTooltip"
  ></h-action-button>
</template>

<script setup lang="ts">
import HActionButton from './HActionButton.vue';

defineOptions({ name: 'HColumnBoolean', components: { HActionButton } });

interface Props {
  value: boolean;
  trueColor?: string;
  falseColor?: string;
  trueIcon?: string;
  falseIcon?: string;
  trueTooltip?: string;
  falseTooltip?: string;
}

withDefaults(defineProps<Props>(), {
  trueColor: 'success',
  falseColor: 'error',
  trueIcon: 'mdi-check-circle-outline',
  falseIcon: 'mdi-close-circle-outline',
  trueTooltip: 'TRUE',
  falseTooltip: 'FALSE',
});
</script>
