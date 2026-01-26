<template>
  <v-container fluid class="pa-0">
    <v-row>
      <v-col xl="2" lg="2" md="3" sm="6" xs="12">
        <organization-tree v-model="currentOrganization"></organization-tree>
      </v-col>
      <v-col xl="2" lg="2" md="3" sm="6" xs="12">
        <department-tree
          v-model="currentDepartment"
          :organization-id="organizationId"
        ></department-tree>
      </v-col>
      <v-col xl="8" lg="8" md="6" sm="6" xs="12">
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
          @update:options="findItemsWithCondition"
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
import type { Tree, Page } from '@herodotus/core';
import type { SysEmployeeEntity, SysElementConditions, SysEmployeeProps } from '@herodotus/api';
import type { VDataTableHeaders, SortItem } from '@/composables/declarations';

import { useDictionary } from '@/composables/hooks';
import { PAGE_NAME } from '@/configurations';

import { isEmpty } from 'lodash-es';
import { notify, toast, OperationEnum } from '@herodotus/core';
import { useBaseTable } from '@/composables/hooks';
import { API } from '@/configurations';

import { OrganizationTree, DepartmentTree } from '../components';

defineOptions({ name: PAGE_NAME.SYS_OWNERSHIP, components: { OrganizationTree, DepartmentTree } });

const headers = ref([
  { key: 'employeeName', align: 'center', title: '姓名' },
  { key: 'identity', align: 'center', title: '身份' },
  { key: 'actions', align: 'center', title: '操作' },
]) as Ref<Array<VDataTableHeaders>>;

const rowKey: SysEmployeeProps = 'employeeId';

const currentOrganization = ref({}) as Ref<Tree>;
const currentDepartment = ref({}) as Ref<Tree>;
const pageNumber = shallowRef(1);
const pageSize = shallowRef(10);
const sortBy = ref([]) as Ref<Array<SortItem>>;

const { getDictionaryItemDisplay } = useDictionary('Identity');

const {
  loading,
  tableRows,
  totalPages,
  totalItems,
  showLoading,
  hideLoading,
  setPageData,
  resetPageData,
  createSort,
  routePushParam,
} = useBaseTable<SysElementConditions, SysEmployeeEntity>(PAGE_NAME.SYS_EMPLOYEE);

const isDepartmentAvailable = computed(() => {
  return !isEmpty(currentDepartment) && !isEmpty(currentDepartment.value.id);
});

const findItemsWithCondition = () => {
  if (isDepartmentAvailable.value) {
    fetchAssignedByPage(pageNumber.value, pageSize.value, currentDepartment.value.id);
  }
};

const organizationId = computed(() => {
  if (!isEmpty(currentOrganization.value)) {
    return currentOrganization.value.id;
  } else {
    return '';
  }
});

const fetchAssignedByPage = (pageNumber = 1, pageSize = 10, departmentId: string) => {
  showLoading();
  API.core
    .sysEmployee()
    .fetchAssignedByPage(
      {
        pageNumber: pageNumber - 1,
        pageSize: pageSize,
        ...createSort(sortBy.value),
      },
      { departmentId },
    )
    .then((result) => {
      const data = result.data as Page<SysEmployeeEntity>;
      // 用户文档列表中无结果时也要更新列表数据
      if (!isEmpty(data)) {
        setPageData(data);
        hideLoading();
      } else {
        resetPageData();
        hideLoading();
      }
    })
    .catch((error) => {
      hideLoading();
    });
};

const deleteAllocatable = (item: SysEmployeeEntity) => {
  notify.standardDeleteNotify(() => {
    API.core
      .sysEmployee()
      .deleteAllocatable({
        organizationId: currentOrganization.value.id,
        departmentId: currentDepartment.value.id,
        employeeId: item.employeeId,
      })
      .then((response) => {
        fetchAssignedByPage(pageNumber.value, pageSize.value, currentDepartment.value.id);
      })
      .catch((error) => {
        if (error.message) {
          toast.error(error.message);
        } else {
          toast.error('删除失败');
        }
      });
  });
};

const isShowOperation = computed(() => {
  return currentOrganization.value.id && currentDepartment.value.id;
});

const toAllocatable = () => {
  const routeName = 'SysOwnershipContent';
  routePushParam(routeName, OperationEnum.AUTHORIZE, {
    organizationId: currentOrganization.value.id,
    departmentId: currentDepartment.value.id,
  });
};

watch(
  currentDepartment,
  (newValue) => {
    if (!isEmpty(newValue) && newValue.id) {
      fetchAssignedByPage(pageNumber.value, pageSize.value, newValue.id);
    } else {
      tableRows.value = [];
    }
  },
  { deep: true },
);

watch(pageNumber, (newValue) => {
  fetchAssignedByPage(newValue, pageSize.value, currentDepartment.value.id);
});
</script>
