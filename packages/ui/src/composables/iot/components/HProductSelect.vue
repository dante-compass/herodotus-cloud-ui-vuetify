<template>
  <q-select
    v-model="selectedValue"
    :options="products"
    option-label="productName"
    option-value="productId"
    outlined
    use-chips
    clearable
    transition-show="scale"
    transition-hide="scale"
    :bottom-slots="hasError"
    :error="hasError"
    :error-message="errorMessage"
    v-bind="$attrs"></q-select>
</template>

<script lang="ts">
import { defineComponent, computed, ref, Ref, PropType, onMounted } from 'vue';
import type { IotProductEntity } from '/@/lib/declarations';
import { api } from '/@/lib/utils';

export default defineComponent({
  name: 'HProductSelect',

  props: {
    modelValue: { type: Object as PropType<IotProductEntity>, default: () => {} },
    organizationId: { type: String, default: '' },
    errorMessage: { type: String },
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const products = ref([]) as Ref<Array<IotProductEntity>>;

    const selectedValue = computed({
      get: () => props.modelValue,
      set: newValue => {
        emit('update:modelValue', newValue);
      },
    });

    const loadData = () => {
      api
        .iotProduct()
        .fetchAll()
        .then(result => {
          const data = result.data as Array<IotProductEntity>;
          products.value = data;
        });
    };

    const hasError = computed(() => {
      return props.errorMessage ? true : false;
    });

    onMounted(() => {
      loadData();
    });

    return {
      products,
      selectedValue,
      hasError,
    };
  },
});
</script>
