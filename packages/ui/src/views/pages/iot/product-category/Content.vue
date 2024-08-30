<template>
  <h-center-form-layout :entity="editedItem" :title="title" :operation="operation" @save="onSave()">
    <h-text-field
      v-model="editedItem.categoryName"
      label="产品分类名称"
      placeholder="请输入产品分类名称"></h-text-field>
    <h-tree-field
      v-model:selected="editedItem.parentId"
      :items="treeItems"
      :value="parentName"
      bottom-slots
      label="上级分类名称"></h-tree-field>
  </h-center-form-layout>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

import type { IotProductCategoryEntity, IotProductCategoryConditions } from '/@/lib/declarations';
import { api } from '/@/lib/utils';

import { useTableItem, useTreeItems } from '/@/hooks';
import { HCenterFormLayout, HTreeField } from '/@/components';

export default defineComponent({
  name: 'IotProductCategoryContent',

  components: {
    HCenterFormLayout,
    HTreeField,
  },

  setup() {
    const { editedItem, operation, title, saveOrUpdate } = useTableItem<IotProductCategoryEntity>(
      api.iotProductCategory(),
    );
    const { treeItems } = useTreeItems<IotProductCategoryEntity, IotProductCategoryConditions>(
      api.iotProductCategory(),
    );

    const parentName = ref('');

    const onSave = () => {
      saveOrUpdate();
    };

    onMounted(() => {
      if (editedItem.value.parentId) {
        api
          .iotProductCategory()
          .fetchById(editedItem.value.parentId)
          .then(result => {
            const data = result.data as IotProductCategoryEntity;
            if (data) {
              parentName.value = data.categoryName;
            }
          });
      }
    });

    return {
      editedItem,
      operation,
      title,
      onSave,
      treeItems,
      parentName,
    };
  },
});
</script>
