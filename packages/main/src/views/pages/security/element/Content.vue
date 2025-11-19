<template>
  <h-center-layout-container
    :entity="editedItem"
    :title="title"
    :operation="operation"
    @save="onSave()"
  >
    <v-text-field
      v-model="editedItem.path"
      label="Vue Router 请求路径"
      placeholder="请输入 Vue Router 请求路径"
    ></v-text-field>
    <v-text-field
      v-model="editedItem.name"
      label="Vue Component 名称 "
      placeholder="Vue Component 名称"
    ></v-text-field>
    <v-text-field
      v-model="editedItem.title"
      label="显示标题"
      placeholder="请输入显示标题"
    ></v-text-field>
    <h-mdi-icon-select
      v-model="editedItem.icon"
      label="显示图标"
      placeholder="输入图标名称..."
    ></h-mdi-icon-select>
    <v-text-field
      v-model="editedItem.component"
      label="Vue Component 页面相对路径"
      placeholder="请输入Vue Component 页面相对路径"
    ></v-text-field>
    <v-text-field
      v-model="editedItem.redirect"
      label="Vue Router 重定向地址 "
      placeholder="如果包含子节点，即 children 中元素的 path"
    ></v-text-field>

    <h-tree-field></h-tree-field>

    <v-switch v-model="editedItem.isNotKeepAlive" label="该应页面不需要KeepAlive缓存"></v-switch>
    <v-switch v-model="editedItem.isIgnoreAuth" label="该页面不需要权限验证"></v-switch>
    <v-switch
      v-if="!editedItem.isDetailContent"
      v-model="editedItem.isHaveChild"
      label="该页面下包含子页面"
    ></v-switch>
    <v-switch
      v-if="editedItem.isHaveChild"
      v-model="editedItem.isHideAllChild"
      label="在菜单中隐藏该节点下所有子节点"
    ></v-switch>
    <v-switch
      v-if="!editedItem.isHaveChild"
      v-model="editedItem.isDetailContent"
      label="该页面是三级路由页面"
    ></v-switch>
  </h-center-layout-container>
</template>

<script setup lang="ts">
import type { SysElementEntity, SysElementConditions } from '@herodotus/api';

import { useTableItem, useTreeItem } from '@/composables/hooks';
import { API } from '@/configurations';

import HTreeField from './HTreeField.vue';

defineOptions({ name: 'SysElementContent', components: { HTreeField } });

const { editedItem, operation, title, saveOrUpdate } = useTableItem<SysElementEntity>(
  API.core.sysElement(),
);
const { treeItems } = useTreeItem<SysElementEntity, SysElementConditions>(API.core.sysElement());

watch(
  () => editedItem.value.redirect,
  (newValue) => {
    if (newValue) {
      editedItem.value.isHaveChild = true;
    } else {
      editedItem.value.isHaveChild = false;
    }
  },
  { deep: true },
);

const onSave = () => {
  saveOrUpdate();
};
</script>
