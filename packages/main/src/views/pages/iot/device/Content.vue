<template>
  <h-center-form-layout :entity="editedItem" :title="title" :overlay="overlay" @save="onSave()">
    <v-form ref="deviceForm" validate-on="blur lazy">
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
import type { DeviceEntity } from "@herodotus/api";

import { useTableItem } from "@/composables/hooks";
import { API } from "@/configurations";

defineOptions({ name: "IotProductCategoryContent" });

const deviceForm = ref();

const { editedItem, title, overlay, saveOrUpdate } = useTableItem<DeviceEntity>(API.core.iotDevice());

const onSave = async () => {
  const { valid } = await deviceForm.value.validate();
  if (valid) {
    saveOrUpdate();
  }
};
</script>
