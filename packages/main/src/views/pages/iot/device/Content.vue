<template>
  <h-center-form-layout :entity="editedItem" :title="title" :overlay="overlay" @save="onSave()">
    <v-form ref="deviceForm" validate-on="blur lazy">
      <v-autocomplete
        v-model="editedItem.product"
        v-model:search="search"
        label="产品"
        :items="items"
        :loading="loading"
        item-title="productKey"
        item-value="id"
        autocomplete="off"
        placeholder="输入ProductKey模糊搜索..."
        return-object
        hide-no-data
        :rules="[(v: string) => !!v || '产品不能为空']"
      >
        <template v-slot:item="{ props: itemProps, item }">
          <v-list-item v-bind="itemProps" :title="item.productKey + ' -- ' + item.productName"></v-list-item>
        </template>
      </v-autocomplete>
      <v-text-field
        v-model.lazy="editedItem.clientId"
        label="设备Client ID *"
        placeholder="请输入设备Client ID名称"
        :rules="[
          (v: string) => !!v || '设备Client ID不能为空',
          (v: string) => (v && v.length >= 5) || '设备Client ID至少5个字符',
        ]"
      ></v-text-field>
      <v-text-field
        v-model.lazy="editedItem.deviceName"
        label="设备名称 *"
        placeholder="请输入设备名称"
        :rules="[
          (v: string) => !!v || '设备名称不能为空',
          (v: string) => (v && v.length >= 5) || '设备名称至少5个字符',
        ]"
      ></v-text-field>
    </v-form>
  </h-center-form-layout>
</template>

<script setup lang="ts">
import type { DeviceEntity, ProductConditions, ProductEntity } from "@herodotus/api";

import { useAutocomplete } from "@herodotus/framework";
import { useTableItem } from "@/composables/hooks";
import { API } from "@/configurations";

defineOptions({ name: "IotProductCategoryContent" });

const deviceForm = ref();

const { editedItem, title, overlay, saveOrUpdate } = useTableItem<DeviceEntity>(API.core.iotDevice());
const { loading, items, search } = useAutocomplete<ProductConditions, ProductEntity>(
  "productKey",
  API.core.iotProduct(),
);

const onSave = async () => {
  const { valid } = await deviceForm.value.validate();
  if (valid) {
    saveOrUpdate();
  }
};
</script>
