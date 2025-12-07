<template>
  <v-container fluid>
    <v-row>
      <v-col xl="3" lg="3" md="3" sm="6" xs="12"></v-col>
      <v-col xl="3" lg="3" md="3" sm="6" xs="12"></v-col>
      <v-col xl="6" lg="6" md="6" sm="6" xs="12">
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
          select-strategy="single"
          reserved
          @update:options="findItems"
        >
          <template #control>
            <v-btn v-if="isShowOperation" @click="toAllocatable">配置人员归属</v-btn>
          </template>

          <template #item.identity="{ item }">
            <v-chip density="compact" rounded="lg" color="orange" label>
              {{ getDictionaryItemDisplay('Identity', item.identity) }}
            </v-chip>
          </template>

          <template #item.actions="{ item }">
            <h-action-delete-button @click="deleteAllocatable(item)"></h-action-delete-button>
          </template>
        </h-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import type { SysEmployeeProps } from '@herodotus/api';
import type { VDataTableHeaders } from '@/composables/declarations';

import { useDictionary } from '@/composables/hooks';
import { PAGE_NAME } from '@/configurations';
import useOwnershipTable from './useOwnershipTable';

defineOptions({ name: PAGE_NAME.SYS_OWNERSHIP });

const headers = ref([
  { key: 'employeeName', align: 'center', title: '姓名' },
  { key: 'identity', align: 'center', title: '身份' },
  { key: 'actions', align: 'center', title: '操作' },
]) as Ref<Array<VDataTableHeaders>>;

const rowKey: SysEmployeeProps = 'employeeId';

const { getDictionaryItemDisplay } = useDictionary('Identity');

const {
  loading,
  pageNumber,
  pageSize,
  tableRows,
  totalPages,
  totalItems,
  deleteAllocatable,
  findItems,
  toAllocatable,
  isShowOperation,
} = useOwnershipTable(PAGE_NAME.SYS_OWNERSHIP);
</script>
