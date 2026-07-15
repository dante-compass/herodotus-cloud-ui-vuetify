<template>
  <h-center-form-layout :entity="editedItem" :title="title" :overlay="overlay" @save="onSave()" @cancel="onReturn">
    <v-form ref="permissionForm" validate-on="blur lazy">
      <v-text-field
        v-model.lazy="editedItem.permissionName"
        label="权限名称 * "
        placeholder="请输入权限名称"
        :rules="[
          (v: string) => !!v || '权限名称不能为空',
          (v: string) => (v && v.length >= 5) || '权限名称至少5个字符',
        ]"
      ></v-text-field>
      <v-text-field v-model.lazy="editedItem.permissionCode" label="权限代码" placeholder="请输权限代码"></v-text-field>
    </v-form>
  </h-center-form-layout>
</template>

<script setup lang="ts">
import type { SysPermissionEntity } from "@herodotus/api";

import { useTableItem } from "@/composables/hooks";
import { API, PAGE_NAME } from "@/configurations";

defineOptions({ name: PAGE_NAME.SYS_PERMISSION_CONTENT });

const { editedItem, title, overlay, saveOrUpdate, onReturn } = useTableItem<SysPermissionEntity>(
  API.core.sysPermission(),
  PAGE_NAME.SYS_PERMISSION_CONTENT,
);

const permissionForm = ref();

const onSave = async () => {
  const { valid } = await permissionForm.value.validate();
  if (valid) {
    saveOrUpdate();
  }
};
</script>
