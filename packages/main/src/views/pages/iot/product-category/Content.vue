<template>
  <h-center-form-layout :entity="editedItem" :title="title" :overlay="overlay" @save="onSave()" @cancel="onReturn">
    <v-form ref="productCategoryForm" validate-on="blur lazy">
      <v-text-field
        v-model.lazy="editedItem.name"
        label="产品品类名称"
        placeholder="请输入产品品类名称"
        :rules="[
          (v: string) => !!v || '产品品类名称不能为空',
          (v: string) => (v && v.length >= 5) || '产品品类名称至少5个字符',
        ]"
      ></v-text-field>
    </v-form>
  </h-center-form-layout>
</template>

<script setup lang="ts">
import type { ProductCategoryEntity } from "@herodotus/api";

import { useTableItem } from "@/composables/hooks";
import { API, PAGE_NAME } from "@/configurations";

defineOptions({ name: PAGE_NAME.IOT_PRODUCT_CATEGORY_CONTENT });

const productCategoryForm = ref();

const { editedItem, title, overlay, saveOrUpdate, onReturn } = useTableItem<ProductCategoryEntity>(
  API.core.iotProductCategory(),
  PAGE_NAME.IOT_PRODUCT_CATEGORY_CONTENT,
);

const onSave = async () => {
  const { valid } = await productCategoryForm.value.validate();
  if (valid) {
    saveOrUpdate();
  }
};
</script>
