<template>
  <v-btn :icon="isIcon" :color="buttonColor" v-bind="$attrs">
    <template #append>
      <slot name="append"></slot>
    </template>

    <template #prepend>
      <slot name="prepend"></slot>
    </template>

    <template #loader>
      <slot name="loader"></slot>
    </template>

    <template v-if="!$slots.default && isIcon">
      <v-icon :icon="icon" :color="color"></v-icon>
    </template>
    <slot v-else></slot>

    <v-tooltip v-if="tooltip" :location="location" activator="parent">
      {{ tooltip }}
    </v-tooltip>
  </v-btn>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { VBtn, VIcon, VTooltip } from 'vuetify/components';

interface Props {
  icon?: VIcon['icon'];
  color?: string | undefined;
  tooltip?: string;
  location?: VTooltip['location'];
}

defineOptions({ name: 'HButton', components: { VBtn, VIcon } });

const props = withDefaults(defineProps<Props>(), { location: 'bottom' });

const isIcon = computed(() => {
  return props.icon ? true : false;
});

const buttonColor = computed(() => {
  return isIcon ? undefined : props.color;
});
</script>
