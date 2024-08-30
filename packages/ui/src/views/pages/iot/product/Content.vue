<template>
  <h-center-form-layout :entity="editedItem" :title="title" :operation="operation" @save="onSave()">
    <h-text-field
      v-model.lazy="v.editedItem.productKey.$model"
      name="productKey"
      label="ProductKey * "
      placeholder="请输入 ProductKey"
      debounce="5000"
      :error="v.editedItem.productKey.$error"
      :error-message="
        v.editedItem.productKey.$errors[0] ? v.editedItem.productKey.$errors[0].$message : ''
      "></h-text-field>
    <h-text-field v-model="editedItem.productName" label="产品名称" placeholder="请输入产品名称"></h-text-field>
    <h-tree-field
      v-model:selected="categoryId"
      :items="treeItems"
      :value="categoryName"
      bottom-slots
      label="所属品类"></h-tree-field>
    <h-dictionary-select v-model="editedItem.node" dictionary="Node" label="节点类型"></h-dictionary-select>
    <h-dictionary-select v-model="editedItem.protocol" dictionary="Protocol" label="网关协议"></h-dictionary-select>
    <h-dictionary-select v-model="editedItem.networking" dictionary="Networking" label="联网方式"></h-dictionary-select>
  </h-center-form-layout>
</template>

<script lang="ts">
import { defineComponent, onMounted, watch, ref } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';

import type { IotProductEntity, IotProductCategoryEntity, IotProductCategoryConditions } from '/@/lib/declarations';
import { api, lodash } from '/@/lib/utils';

import { useTableItem, useTreeItems } from '/@/hooks';
import { HCenterFormLayout, HTreeField } from '/@/components';
import { HDictionarySelect } from '/@/composables/constants';

export default defineComponent({
  name: 'IotProductContent',

  components: {
    HCenterFormLayout,
    HDictionarySelect,
    HTreeField,
  },

  setup() {
    const { editedItem, operation, title, saveOrUpdate } = useTableItem<IotProductEntity>(api.iotProduct());
    const { treeItems } = useTreeItems<IotProductCategoryEntity, IotProductCategoryConditions>(
      api.iotProductCategory(),
    );

    const isUnique = () => {
      let productKey = editedItem.value.productKey;

      return new Promise((resolve, reject) => {
        if (productKey) {
          api
            .iotProduct()
            .fetchByProductKey(productKey)
            .then(result => {
              let user = result.data as IotProductEntity;
              // 如果能够查询到username
              // 如果该username 对应的 userId 与当前 editedItem中的userId相同
              // 则认为是编辑状态，而且username 没有变化，那么就校验通过。
              // 目前能想到的解决新建空值、编辑是原值等校验问题的最优解
              resolve(!(user && user.productKey !== editedItem.value.productKey));
            });
        } else {
          reject(false);
        }
      });
    };

    const rules = {
      editedItem: {
        productKey: {
          required: helpers.withMessage('ProductKey不能为空', required),
          regex: helpers.withMessage('用户名只能包含字母，数字，下划线，减号', helpers.regex(/^[a-zA-Z0-9_-]{4,16}$/)),
          isUnique: helpers.withMessage('ProductKey已存在，请使用其它ProductKey', helpers.withAsync(isUnique)),
        },
      },
    };

    const v = useVuelidate(rules, { editedItem }, { $lazy: true });

    const categoryId = ref('');
    const categoryName = ref('');

    const onSave = () => {
      if (!v.value.$anyDirty) {
        saveOrUpdate();
      } else {
        v.value.$validate().then(result => {
          if (result) {
            saveOrUpdate();
          }
        });
      }
    };

    watch(
      () => categoryId.value,
      newValue => {
        if (newValue) {
          editedItem.value.category['categoryId'] = newValue;
        }
      },
      {
        immediate: true,
      },
    );

    onMounted(() => {
      if (!lodash.isEmpty(editedItem.value.category)) {
        categoryId.value = editedItem.value.category.categoryId;
        categoryName.value = editedItem.value.category.categoryName;
      }
    });

    return {
      editedItem,
      operation,
      title,
      v,
      onSave,
      treeItems,
      categoryId,
      categoryName,
    };
  },
});
</script>
