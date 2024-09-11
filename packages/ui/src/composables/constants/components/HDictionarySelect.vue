<template>
  <q-select
    v-model="selectedValue"
    :options="options"
    :option-label="optionLabel"
    :option-value="optionValue"
    :name="dictionary"
    outlined
    use-chips
    clearable
    emit-value
    map-options
    transition-show="scale"
    transition-hide="scale"
    bottom-slots
    v-bind="$attrs"></q-select>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

import { useDictionary } from '../hooks';

export default defineComponent({
  name: 'HDictionarySelect',

  props: {
    modelValue: { type: [Number, String, Array, Object] },
    dictionary: { type: String, required: true },
    optionLabel: { type: String, default: 'label' },
    optionValue: { type: String, default: 'value' },
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const selectedValue = computed({
      // 子组件v-model绑定 计算属性, 一旦发生变化, 就会给父组件传递值
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
