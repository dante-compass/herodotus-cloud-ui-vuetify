<template>
  <q-btn-toggle
    v-model="selectedValue"
    :options="[
      { label: '属性', value: 'properties' },
      { label: '事件', value: 'events' },
      { label: '服务', value: 'services' },
    ]"
    v-bind="$attrs" />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'HDictionaryToggleButton',

  props: {
    modelValue: { type: String, default: 'properties' },
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const selectedValue = computed({
      get: () => props.modelValue,
      set: newValue => {
        emit('update:modelValue', newValue);
      },
    });

    return {
      selectedValue,
    };
  },
});
</script>
