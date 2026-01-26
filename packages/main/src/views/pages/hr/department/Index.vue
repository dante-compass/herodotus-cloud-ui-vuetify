<template>
  <v-container class="pa-0">
    <v-row>
      <v-col xl="2" lg="2" md="4" sm="6" xs="12">
        <organization-tree v-model="currentOrganization"></organization-tree>
      </v-col>
      <v-col xl="10" lg="10" md="8" sm="6" xs="12">
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
          @update:options="findItemsWithCondition"
        >
          <template #control>
            <v-btn @click="toCreate(additionalData)" :disabled="!isContentAvailable">
              新建部门
            </v-btn>
          </template>

          <template #item.actions="{ item }">
            <h-action-edit-button @click="toEdit(item)"></h-action-edit-button>
            <h-action-delete-button
              v-if="!item.reserved"
              @click="deleteItemById(item[rowKey])"
            ></h-action-delete-button>
          </template>
        </h-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import type { Tree } from '@herodotus/core';
import type {
  SysDepartmentEntity,
  SysDepartmentConditions,
  SysDepartmentProps,
} from '@herodotus/api';
import type { VDataTableHeaders } from '@/composables/declarations';

import { useTable } from '@/composables/hooks';
import { API, PAGE_NAME } from '@/configurations';

import { OrganizationTree } from '../components';
import { isEmpty } from 'lodash-es';

defineOptions({ name: PAGE_NAME.SYS_DEPARTMENT, components: { OrganizationTree } });

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

const currentOrganization = ref({}) as Ref<Tree>;

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
  conditions,
} = useTable<SysDepartmentConditions, SysDepartmentEntity>(
  API.core.sysDepartment(),
  PAGE_NAME.SYS_DEPARTMENT,
  false,
  ['updateTime'],
  'DESC',
  false,
);

const isContentAvailable = computed(() => {
  return !isEmpty(currentOrganization) && !isEmpty(currentOrganization.value.id);
});

const findItemsWithCondition = () => {
  if (isContentAvailable.value) {
    findItems();
  }
};

const additionalData = computed(() => {
  return {
    organizationId: currentOrganization.value.id,
    organizationName: currentOrganization.value.name,
  };
});

watch(
  currentOrganization,
  (newValue) => {
    conditions.value.organizationId = newValue.id;
  },
  { deep: true },
);
</script>
