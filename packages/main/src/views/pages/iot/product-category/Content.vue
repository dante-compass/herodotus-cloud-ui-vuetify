<template>
  <h-center-form-layout :entity="editedItem" :title="title" :overlay="overlay" @save="onSave()">
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
import { API } from "@/configurations";

defineOptions({ name: "IotProductCategoryContent" });

const productCategoryForm = ref();

const { editedItem, title, overlay, saveOrUpdate } = useTableItem<ProductCategoryEntity>(API.core.iotProductCategory());

const onSave = async () => {
  const { valid } = await productCategoryForm.value.validate();
  if (valid) {
    saveOrUpdate();
  }
};
</script>
