<template>
  <q-option-group v-if="isShow" v-model="selectedValue" :options="options" inline v-bind="$attrs" />
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, watch, onBeforeMount } from 'vue';

import { useDictionary } from '../hooks';

export default defineComponent({
  name: 'HOptionField',

  props: {
    modelValue: { type: String, default: '' },
    dictionary: { type: String, required: true },
    defaultValue: { type: String },
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const selectedValue = computed({
      get: () => props.modelValue,
      set: newValue => {
        emit('update:modelValue', newValue);
      },
    });

    const { options, isShow } = useDictionary(props.dictionary);

    onBeforeMount(() => {
      console.log('-------', props.defaultValue);
    });

    onMounted(() => {
      console.log('-------', props.defaultValue);
      if (props.defaultValue) {
        selectedValue.value = props.defaultValue;
      }
    });

    watch(
      () => props.defaultValue,
      newValue => {
        console.log('---new value----', newValue);
      },
    );

    return {
      selectedValue,
      options,
      isShow,
    };
  },
});
</script>
