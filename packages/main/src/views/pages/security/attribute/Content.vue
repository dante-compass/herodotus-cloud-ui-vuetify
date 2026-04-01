<template>
  <h-center-form-layout :entity="editedItem" :title="title" :overlay="overlay" @save="onSave()">
    <h-dictionary-select
      v-model="editedItem.webExpression"
      dictionary="PermissionExpression"
      label="权限表达式"
    ></h-dictionary-select>
    <v-text-field v-model="editedItem.serviceId" label="服务ID * " placeholder="请输入服务ID" disabled></v-text-field>
    <v-text-field v-model="editedItem.url" label="URL * " placeholder="请输URL" disabled></v-text-field>
    <v-text-field
      v-model="editedItem.requestMethod"
      label="Request Method * "
      placeholder="请输入Request Method"
      disabled
    ></v-text-field>
    <v-text-field
      v-model="editedItem.attributeCode"
      label="默认权限代码 * "
      placeholder="请输入默认权限代码"
      disabled
    ></v-text-field>
  </h-center-form-layout>
</template>

<script setup lang="ts">
import type { SysAttributeEntity } from '@herodotus/api';

import { useTableItem } from '@/composables/hooks';
import { API } from '@/configurations';

defineOptions({ name: 'SysAttributeContent' });

const { editedItem, title, overlay, saveOrUpdate } = useTableItem<SysAttributeEntity>(API.core.sysAttribute());

const onSave = () => {
  saveOrUpdate();
};
</script>
