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
    disable-sort
    @update:options="findItems"
  >
    <template #control>
      <v-btn @click="toCreate">新建角色</v-btn>
    </template>

    <template #item.actions="{ item }">
      <h-action-authorize-button
        tooltip="配置权限"
        @click="toAuthorize(item)"
      ></h-action-authorize-button>
      <h-action-edit-button @click="toEdit(item)"></h-action-edit-button>
      <h-action-delete-button
        v-if="!item.reserved"
        @click="deleteItemById(item[rowKey])"
      ></h-action-delete-button>
    </template>
  </h-data-table>
</template>

<script setup lang="ts">
import type { SysRoleEntity, SysRoleConditions, SysRoleProps } from '@herodotus/api';
import type { VDataTableHeaders } from '@/composables/declarations';

import { useTable } from '@/composables/hooks';
import { API, PAGE_NAME } from '@/configurations';

defineOptions({ name: PAGE_NAME.SYS_ROLE });

const headers = ref([
  { key: 'roleName', align: 'center', title: '角色名称' },
  { key: 'roleCode', align: 'center', title: '角色代码' },
  { key: 'description', align: 'center', title: '备注' },
  { key: 'reserved', align: 'center', title: '保留数据' },
  { key: 'status', align: 'center', title: '状态' },
  { key: 'actions', align: 'center', title: '操作' },
]) as Ref<Array<VDataTableHeaders>>;

const rowKey: SysRoleProps = 'roleId';

const {
  loading,
  pageNumber,
  pageSize,
  tableRows,
  totalPages,
  totalItems,
  toEdit,
  toCreate,
  toAuthorize,
  deleteItemById,
  findItems,
} = useTable<SysRoleEntity, SysRoleConditions>(API.core.sysRole(), PAGE_NAME.SYS_ROLE);
</script>
