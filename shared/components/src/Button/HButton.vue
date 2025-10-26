<template>
  <v-btn v-bind="$attrs">
    {{ label }}
    <v-tooltip v-if="tooltip" :location="location" :open-delay="openDelay" activator="parent">
      {{ tooltip }}
    </v-tooltip>
  </v-btn>
</template>

<script lang="ts" setup>
import type { VTooltip } from 'vuetify/components';

interface Props {
  label: string;
  tooltip?: string;
  location: VTooltip['location'];
  openDelay: string | number;
}

defineOptions({ name: 'HButton' });
withDefaults(defineProps<Props>(), { location: 'bottom', openDelay: 200 });
</script>
