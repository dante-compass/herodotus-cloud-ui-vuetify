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
    reserved
    @update:options="findItems"
  >
    <template #control>
      <v-btn @click="toCreate">新建人员</v-btn>
    </template>

    <template #search>
      <employee-search v-model="conditions"></employee-search>
    </template>

    <template #item.gender="{ item }">
      <v-chip density="compact" rounded="lg" color="blue" label>
        {{ getDictionaryItemDisplay('Gender', item.gender) }}
      </v-chip>
    </template>

    <template #item.identity="{ item }">
      <v-chip density="compact" rounded="lg" color="orange" label>
        {{ getDictionaryItemDisplay('Identity', item.identity) }}
      </v-chip>
    </template>

    <template #item.actions="{ item }">
      <h-action-edit-button @click="toEdit(item)"></h-action-edit-button>
      <h-action-delete-button v-if="!item.reserved" @click="deleteItemById(item[rowKey])"></h-action-delete-button>
    </template>
  </h-data-table>
</template>

<script setup lang="ts">
import type { SysEmployeeEntity, SysEmployeeConditions, SysEmployeeProps } from '@herodotus/api';
import type { VDataTableHeaders } from '@/composables/declarations';

import { useTable, useDictionary } from '@/composables/hooks';
import { API, PAGE_NAME } from '@/configurations';

import { EmployeeSearch } from '../components';

defineOptions({ name: PAGE_NAME.SYS_EMPLOYEE, components: { EmployeeSearch } });

const headers = ref([
  { key: 'employeeName', align: 'center', title: '人员姓名' },
  { key: 'identity', align: 'center', title: '身份' },
  { key: 'gender', align: 'center', title: '性别' },
  { key: 'description', align: 'center', title: '备注' },
  { key: 'reserved', align: 'center', title: '保留数据' },
  { key: 'status', align: 'center', title: '状态' },
  { key: 'actions', align: 'center', title: '操作' },
]) as Ref<Array<VDataTableHeaders>>;

const rowKey: SysEmployeeProps = 'employeeId';

const { getDictionaryItemDisplay } = useDictionary('Gender', 'Identity');

const {
  loading,
  pageNumber,
  pageSize,
  tableRows,
  totalPages,
  totalItems,
  conditions,
  toEdit,
  toCreate,
  deleteItemById,
  findItems,
} = useTable<SysEmployeeConditions, SysEmployeeEntity>(API.core.sysEmployee(), PAGE_NAME.SYS_EMPLOYEE);
</script>
