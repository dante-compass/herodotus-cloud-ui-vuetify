<template>
  <q-btn-toggle v-model="selectedValue" :options="options" v-bind="$attrs" />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

import { useDictionary } from '../hooks';

export default defineComponent({
  name: 'HDictionaryToggleButton',

  props: {
    modelValue: { type: String, default: 'properties' },
    dictionary: { type: String, required: true },
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const selectedValue = computed({
      get: () => props.modelValue,
      set: newValue => {
        emit('update:modelValue', newValue);
      },
    });

    const { options } = useDictionary(props.dictionary);

    return {
      selectedValue,
      options,
    };
  },
});
</script>
