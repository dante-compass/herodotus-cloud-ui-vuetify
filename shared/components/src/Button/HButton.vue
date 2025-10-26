<template>
  <v-btn :icon="isIcon" v-bind="$attrs">
    <template v-if="!icon">
      {{ label }}
    </template>
    <v-icon v-else :color="color ? color : undefined" :icon="icon"></v-icon>

    <v-tooltip v-if="tooltip" :location="location" activator="parent">
      {{ tooltip }}
    </v-tooltip>
  </v-btn>
</template>

<script lang="ts" setup>
import { VBtn, VIcon, VTooltip } from 'vuetify/components';

import { computed } from 'vue';
import { isEmpty } from 'lodash-es';

interface Props {
  label: string;
  icon?: string;
  tooltip?: string;
  color?: string;
  location?: VTooltip['location'];
}

defineOptions({ name: 'HButton', components: { VBtn, VIcon } });
const props = withDefaults(defineProps<Props>(), { location: 'bottom' });

const isIcon = computed(() => {
  return !isEmpty(props.icon);
});
</script>
