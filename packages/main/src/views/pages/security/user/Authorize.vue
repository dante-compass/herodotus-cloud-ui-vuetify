<template>
  <h-authorize-layout :title="title">
    <v-data-table-server
      v-model="selectedItems"
      v-model:items-per-page="pageSize"
      v-model:page="pageNumber"
      :items-length="totalItems"
      :headers="headers"
      :items="tableRows"
      :item-value="rowKey"
      :item-selectable="rowKey"
      :loading="loading"
      show-select
      select-strategy="page"
      striped="even"
      hover
      hide-default-footer
      disable-sort
      return-object
      @update:options="findItems"
    ></v-data-table-server>
  </h-authorize-layout>
</template>

<script setup lang="ts">
import type { SysUserEntity, SysRoleEntity, SysRoleProps, SysRoleConditions } from '@herodotus/api';
import type { VDataTableHeaders } from '@/composables/declarations';

import { useTableItem, useTable } from '@/composables/hooks';
import { API, PAGE_NAME } from '@/configurations';

defineOptions({ name: 'SysUserContent' });

const { editedItem, title, assign, overlay } = useTableItem<SysUserEntity>(API.core.sysUser());
const {
  loading,
  pageNumber,
  pageSize,
  tableRows,
  totalPages,
  totalItems,
  toEdit,
  toAuthorize,
  deleteItemById,
  findItems,
} = useTable<SysRoleEntity, SysRoleConditions>(API.core.sysRole(), PAGE_NAME.SYS_ROLE);

const selectedItems = ref([]) as Ref<Array<SysRoleEntity>>;
const rowKey: SysRoleProps = 'roleId';

const headers = ref([
  { key: 'roleName', align: 'center', title: '角色名称' },
  { key: 'roleCode', align: 'center', title: '角色代码' },
]) as Ref<Array<VDataTableHeaders>>;

onMounted(() => {
  selectedItems.value = editedItem.value.roles;
});
</script>
