<template>
  <v-tooltip v-if="tooltip" interactive :location="location">
    <template #activator="{ props: activatorProps }">
      <v-icon-btn :color="color" v-bind="mergeProps(activatorProps, $attrs)"></v-icon-btn>
    </template>
    <span>{{ tooltip }}</span>
  </v-tooltip>
  <v-icon-btn v-else v-bind="$attrs"></v-icon-btn>
</template>

<script setup lang="ts">
import { mergeProps } from 'vue';
import { VTooltip, VIconBtn } from 'vuetify/components';

defineOptions({ name: 'HIconButton', components: { VTooltip, VIconBtn } });

interface Props {
  color?: string;
  tooltip?: string;
  location?: VTooltip['location'];
}

withDefaults(defineProps<Props>(), { location: 'bottom' });
</script>
