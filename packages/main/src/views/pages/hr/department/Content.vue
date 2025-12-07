<template>
  <h-center-layout-container
    :entity="editedItem"
    :title="title"
    :overlay="overlay"
    :operation="operation"
    @save="onSave()"
  >
    <v-form ref="departmentForm" validate-on="blur lazy">
      <v-text-field
        v-model.lazy="editedItem.departmentName"
        label="部门名称 * "
        placeholder="请输入部门名称"
        clearable
        :rules="[
          (v: string) => !!v || '部门名称不能为空',
          (v: string) => (v && v.length >= 5) || '部门名称至少5个字符',
        ]"
      ></v-text-field>
      <v-text-field
        v-model="editedItem.partitionCode"
        label="部门分区码"
        placeholder="请输入部门分区码名称"
      ></v-text-field>
      <v-text-field
        v-model="editedItem.shortName"
        label="部门简称"
        placeholder="请输入部门简称"
      ></v-text-field>
      <organization-select
        v-model="editedItem.organizationId"
        label="所属单位"
        placeholder="请设置所属单位"
      ></organization-select>
      <department-select
        v-model="editedItem.parentId"
        :organizationId="editedItem.organizationId"
        label="上级部门"
        placeholder="请选择上级部门"
      ></department-select>
    </v-form>
  </h-center-layout-container>
</template>

<script setup lang="ts">
import type { SysDepartmentEntity } from '@herodotus/api';

import { useTableItem } from '@/composables/hooks';
import { API } from '@/configurations';

import { DepartmentSelect, OrganizationSelect } from '../components';

defineOptions({
  name: 'SysDepartmentContent',
  components: { DepartmentSelect, OrganizationSelect },
});

const departmentForm = ref();

const { editedItem, operation, title, overlay, saveOrUpdate } = useTableItem<SysDepartmentEntity>(
  API.core.sysDepartment(),
);

const onSave = async () => {
  const { valid } = await departmentForm.value.validate();
  if (valid) {
    saveOrUpdate();
  }
};
</script>
