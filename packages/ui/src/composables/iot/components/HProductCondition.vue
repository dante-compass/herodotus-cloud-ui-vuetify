<template>
  <q-list>
    <q-expansion-item label="查询条件：" default-opened>
      <q-card>
        <q-card-section>
          <h-row align="center" gutter="md" horizontal>
            <h-column :cols="2">
              <h-tree-field
                v-model:selected="conditionsModelValue.categoryId"
                :items="treeItems"
                dense
                label="产品分类"></h-tree-field>
            </h-column>
            <h-column :cols="2">
              <h-text-field
                v-model="conditionsModelValue.productKey"
                debounce="1000"
                label="ProductKey"
                dense
                class="q-pb-none"></h-text-field>
            </h-column>
            <h-column :cols="2">
              <h-text-field
                v-model="conditionsModelValue.productName"
                debounce="1000"
                label="产品名称"
                dense
                class="q-pb-none"></h-text-field>
            </h-column>
            <h-column :cols="2"></h-column>
            <h-column :cols="2"></h-column>
            <h-column auto>
              <h-button color="red" icon="mdi-broom" tooltip="清空" @click.stop="onClear()"></h-button>
            </h-column>
          </h-row>
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </q-list>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';

import type { IotProductCategoryEntity, IotProductCategoryConditions, IotProductConditions } from '/@/lib/declarations';

import { useTreeItems } from '/@/hooks';

import { api } from '/@/lib/utils';

export default defineComponent({
  name: 'HProductCondition',

  props: {
    conditions: { type: Object as PropType<IotProductConditions>, required: true },
  },

  emits: ['update:conditions'],

  setup(props, { emit }) {
    const conditionsModelValue = computed({
      get: () => props.conditions,
      set: newValue => {
        emit('update:conditions', newValue);
      },
    });

    const { treeItems } = useTreeItems<IotProductCategoryEntity, IotProductCategoryConditions>(
      api.iotProductCategory(),
    );

    const onClear = () => {
      conditionsModelValue.value = {} as IotProductConditions;
    };

    return {
      conditionsModelValue,
      onClear,
      treeItems,
    };
  },
});
</script>
