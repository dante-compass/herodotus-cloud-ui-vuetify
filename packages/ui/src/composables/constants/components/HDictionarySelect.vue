<template>
  <q-select
    v-model="selectedValue"
    :options="items"
    :option-label="optionLabel"
    :option-value="optionValue"
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
import { defineComponent, computed, reactive, toRefs, onBeforeMount } from 'vue';

import type { ConstantDictionary } from '/@/lib/declarations';

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
    const state = reactive({
      items: [] as Array<ConstantDictionary>,
    });

    const selectedValue = computed({
      // 子组件v-model绑定 计算属性, 一旦发生变化, 就会给父组件传递值
      get: () => props.modelValue,
      set: newValue => {
        emit('update:modelValue', newValue);
      },
    });

    const { getDictionary } = useDictionary();

    const initialize = () => {
      state.items = getDictionary(props.dictionary);
    };

    onBeforeMount(() => {
      initialize();
    });

    return {
      ...toRefs(state),
      selectedValue,
    };
  },
});
</script>
