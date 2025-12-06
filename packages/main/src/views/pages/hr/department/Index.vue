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
      <v-btn @click="toCreate">新建部门</v-btn>
    </template>

    <template #item.actions="{ item }">
      <h-action-edit-button @click="toEdit(item)"></h-action-edit-button>
      <h-action-delete-button
        v-if="!item.reserved"
        @click="deleteItemById(item[rowKey])"
      ></h-action-delete-button>
    </template>
  </h-data-table>
</template>

<script setup lang="ts">
import type {
  SysDepartmentEntity,
  SysDepartmentConditions,
  SysDepartmentProps,
} from '@herodotus/api';
import type { VDataTableHeaders } from '@/composables/declarations';

import { useTable } from '@/composables/hooks';
import { API, PAGE_NAME } from '@/configurations';

defineOptions({ name: PAGE_NAME.SYS_DEPARTMENT });

const headers = ref([
  { key: 'departmentName', align: 'center', title: '部门名称' },
  { key: 'shortName', align: 'center', title: '部门简称' },
  { key: 'partitionCode', align: 'center', title: '分区代码' },
  { key: 'description', align: 'center', title: '备注' },
  { key: 'reserved', align: 'center', title: '保留数据' },
  { key: 'status', align: 'center', title: '状态' },
  { key: 'actions', align: 'center', title: '操作' },
]) as Ref<Array<VDataTableHeaders>>;

const rowKey: SysDepartmentProps = 'departmentId';

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
} = useTable<SysDepartmentEntity, SysDepartmentConditions>(
  API.core.sysDepartment(),
  PAGE_NAME.SYS_DEPARTMENT,
);
</script>
