<template>
  <h-data-table
    v-model:page-size="pageSize"
    v-model:page-number="pageNumber"
    v-model:total-pages="totalPages"
    v-model:total-items="totalItems"
    :headers="headers"
    :items="tableRows"
    :item-value="rowKey"
    :loading="loading"
    select-strategy="single"
    disable-sort
    @update:options="findItems"
  >
    <template #control>
      <v-btn prepend-icon="mdi-plus" text="新建权限" @click="toCreate"></v-btn>
    </template>

    <template #item.actions="{ item }">
      <h-action-edit-button @click="toEdit(item)"></h-action-edit-button>
      <h-action-delete-button v-if="!item.reserved" @click="deleteItemById(item[rowKey])"></h-action-delete-button>
    </template>
  </h-data-table>
</template>

<script setup lang="ts">
import type { SysPermissionEntity, SysPermissionConditions, SysPermissionProps } from "@herodotus/api";
import type { VDataTableHeaders } from "@/composables/declarations";

import { useTable } from "@/composables/hooks";
import { API, PAGE_NAME } from "@/configurations";

defineOptions({ name: PAGE_NAME.SYS_PERMISSION });

const headers = ref([
  { key: "permissionName", align: "center", title: "权限名称" },
  { key: "permissionCode", align: "center", title: "权限代码" },
  { key: "description", align: "center", title: "备注" },
  { key: "reserved", align: "center", title: "保留数据" },
  { key: "status", align: "center", title: "状态" },
  { key: "actions", align: "center", title: "操作" },
]) as Ref<Array<VDataTableHeaders>>;

const rowKey: SysPermissionProps = "permissionId";

const {
  loading,
  pageNumber,
  pageSize,
  tableRows,
  totalPages,
  totalItems,
  toEdit,
  toCreate,
  deleteItemById,
  findItems,
} = useTable<SysPermissionConditions, SysPermissionEntity>(API.core.sysPermission(), PAGE_NAME.SYS_PERMISSION);
</script>
