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
    <template #item.role="{ item }">
      {{ item.role.roleCode }}
    </template>

    <template #item.actions="{ item }">
      <h-action-authorize-button
        tooltip="配置角色"
        @click="toAuthorize(item)"
      ></h-action-authorize-button>
      <h-action-delete-button
        v-if="!item.reserved"
        @click="deleteItemById(item[rowKey])"
      ></h-action-delete-button>
    </template>
  </h-data-table>
</template>

<script setup lang="ts">
import type {
  SysDefaultRoleEntity,
  SysDefaultRoleConditions,
  SysDefaultRoleProps,
} from '@herodotus/api';
import type { VDataTableHeaders } from '@/composables/declarations';

import { useTable } from '@/composables/hooks';
import { API, PAGE_NAME } from '@/configurations';

defineOptions({ name: PAGE_NAME.SYS_DEFAULT_ROLE });

const headers = ref([
  { key: 'description', align: 'center', title: '名称' },
  { key: 'scene', align: 'center', title: '代码' },
  { key: 'role', align: 'center', title: '角色代码' },
  { key: 'reserved', align: 'center', title: '保留数据' },
  { key: 'status', align: 'center', title: '状态' },
  { key: 'actions', align: 'center', title: '操作' },
]) as Ref<Array<VDataTableHeaders>>;

const rowKey: SysDefaultRoleProps = 'defaultId';

const {
  loading,
  pageNumber,
  pageSize,
  tableRows,
  totalPages,
  totalItems,
  toAuthorize,
  deleteItemById,
  findItems,
} = useTable<SysDefaultRoleEntity, SysDefaultRoleConditions>(
  API.core.sysDefaultRole(),
  PAGE_NAME.SYS_DEFAULT_ROLE,
);
</script>
