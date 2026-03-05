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
import { useSlots, computed } from 'vue';
import { VBtn, VIcon, VTooltip } from 'vuetify/components';

import { isEmpty } from 'lodash-es';

interface Props {
  icon?: VIcon['icon'];
  color?: string | undefined;
  tooltip?: string;
  location?: VTooltip['location'];
}

defineOptions({ name: 'HButton', components: { VBtn, VIcon } });

const props = withDefaults(defineProps<Props>(), { location: 'bottom' });

const slots = useSlots() as ReturnType<typeof useSlots>;

const isIcon = computed(() => {
  return !isEmpty(props.icon) ? true : false;
});

const buttonColor = computed(() => {
  // v-btn 默认通过 default slot 设置按钮的文字。设置文字则认为是普通 button 而不是 icon 类型 button
  return !isEmpty(slots.default) ? props.color : undefined;
});
</script>
