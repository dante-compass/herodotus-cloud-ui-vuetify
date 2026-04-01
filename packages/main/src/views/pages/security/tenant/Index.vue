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
      <v-btn @click="toCreate">新建数据源</v-btn>
    </template>

    <template #item.actions="{ item }">
      <h-action-edit-button @click="toEdit(item)"></h-action-edit-button>
      <h-action-delete-button v-if="!item.reserved" @click="deleteItemById(item[rowKey])"></h-action-delete-button>
    </template>
  </h-data-table>
</template>

<script setup lang="ts">
import type {
  SysTenantDataSourceEntity,
  SysTenantDataSourceConditions,
  SysTenantDataSourceProps,
} from '@herodotus/api';
import type { VDataTableHeaders } from '@/composables/declarations';

import { useTable } from '@/composables/hooks';
import { API, PAGE_NAME } from '@/configurations';

defineOptions({ name: PAGE_NAME.SYS_TENANT_DATA_SOURCE });

const headers = ref([
  { key: 'tenantId', align: 'center', title: '租户标识ID' },
  { key: 'username', align: 'center', title: '数据库用户名' },
  { key: 'password', align: 'center', title: '数据库密码' },
  { key: 'driverClassName', align: 'center', title: '驱动' },
  { key: 'url', align: 'center', title: 'url' },
  { key: 'description', align: 'center', title: '备注' },
  { key: 'reserved', align: 'center', title: '保留数据' },
  { key: 'status', align: 'center', title: '状态' },
  { key: 'actions', align: 'center', title: '操作' },
]) as Ref<Array<VDataTableHeaders>>;

const rowKey: SysTenantDataSourceProps = 'datasourceId';

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
} = useTable<SysTenantDataSourceConditions, SysTenantDataSourceEntity>(
  API.core.sysTenantDataSource(),
  PAGE_NAME.SYS_TENANT_DATA_SOURCE,
);
</script>
