<template>
  <v-btn :icon="icon" v-bind="$attrs">
    <template #append>
      <slot name="append"></slot>
    </template>

    <template #prepend>
      <slot name="prepend"></slot>
    </template>

    <template #loader>
      <slot name="loader"></slot>
    </template>

    <template v-if="!$slots.default && hasIcon">
      <v-icon>{{ icon }}</v-icon>
    </template>
    <slot v-else></slot>

    <v-tooltip v-if="tooltip" :location="location" activator="parent">
      {{ tooltip }}
    </v-tooltip>
  </v-btn>
</template>

<script lang="ts" setup>
import { VBtn, VIcon, VTooltip } from 'vuetify/components';

interface Props {
  icon?: string | boolean;
  tooltip?: string;
  location?: VTooltip['location'];
}

defineOptions({ name: 'HButton', components: { VBtn, VIcon } });
const props = withDefaults(defineProps<Props>(), { location: 'bottom' });

const hasIcon = !!(props.icon && props.icon !== true);
</script>
