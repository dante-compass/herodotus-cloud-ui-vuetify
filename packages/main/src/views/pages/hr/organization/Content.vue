<template>
  <h-center-form-layout :entity="editedItem" :title="title" :overlay="overlay" @save="onSave()">
    <v-form ref="organizationForm" validate-on="blur lazy">
      <v-text-field
        v-model.lazy="editedItem.organizationName"
        label="单位名称 * "
        placeholder="请输入单位名称"
        clearable
        :rules="[
          (v: string) => !!v || '单位名称不能为空',
          (v: string) => (v && v.length >= 5) || '单位名称至少5个字符',
        ]"
      ></v-text-field>
      <v-text-field
        v-model="editedItem.partitionCode"
        label="单位分区码"
        placeholder="请输入单位分区码名称"
      ></v-text-field>
      <v-text-field v-model="editedItem.shortName" label="单位简称" placeholder="请输入单位简称"></v-text-field>
      <h-dictionary-select
        v-model="editedItem.category"
        dictionary="OrganizationCategory"
        label="组织类别"
      ></h-dictionary-select>
      <organization-select
        v-model="editedItem.parentId"
        :category="editedItem.category"
        label="上级单位"
        placeholder="请设置所属上级单位"
      ></organization-select>
    </v-form>
  </h-center-form-layout>
</template>

<script setup lang="ts">
import type { SysOrganizationEntity } from '@herodotus/api';

import { useTableItem } from '@/composables/hooks';
import { API } from '@/configurations';

import { OrganizationSelect } from '../components';

defineOptions({ name: 'SysOrganizationContent', components: { OrganizationSelect } });

const organizationForm = ref();

const { editedItem, title, overlay, saveOrUpdate } = useTableItem<SysOrganizationEntity>(API.core.sysOrganization());

const onSave = async () => {
  const { valid } = await organizationForm.value.validate();
  if (valid) {
    saveOrUpdate();
  }
};
</script>
