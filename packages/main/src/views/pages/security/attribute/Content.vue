<template>
  <h-center-layout-container
    :entity="editedItem"
    :title="title"
    :operation="operation"
    @save="onSave()"
  >
    <h-dictionary-select
      v-model="editedItem.webExpression"
      dictionary="PermissionExpression"
      label="权限表达式"
    ></h-dictionary-select>
    <v-text-field
      v-model="editedItem.serviceId"
      name="serviceId"
      label="服务ID * "
      placeholder="请输入服务ID"
      disabled
    ></v-text-field>
    <v-text-field
      v-model="editedItem.url"
      name="url"
      label="URL * "
      placeholder="请输URL"
      disabled
    ></v-text-field>
    <v-text-field
      v-model="editedItem.requestMethod"
      name="requestMethod"
      label="Request Method * "
      placeholder="请输入Request Method"
      disabled
    ></v-text-field>
    <v-text-field
      v-model="editedItem.attributeCode"
      name="attributeCode"
      label="默认权限代码 * "
      placeholder="请输入默认权限代码"
      disabled
    ></v-text-field>
  </h-center-layout-container>
</template>

<script setup lang="ts">
import type { SysAttributeEntity } from '@herodotus/api';

import { useTableItem } from '@/composables/hooks';
import { API } from '@/configurations';

defineOptions({ name: 'SysAttributeContent' });

const { editedItem, operation, title, saveOrUpdate } = useTableItem<SysAttributeEntity>(
  API.core.sysAttribute(),
);

const onSave = () => {
  saveOrUpdate();
};
</script>
