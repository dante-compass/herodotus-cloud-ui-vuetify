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
    reserved
    @update:options="findItems"
  >
    <template #control>
      <v-btn>新建</v-btn>
    </template>

    <template #item.actions="{ item }">
      <h-action-button
        color="amber"
        icon="mdi-shield-edit"
        tooltip="配置角色"
        @click="toAuthorize(item)"
      ></h-action-button>
      <h-action-edit-button @click="toEdit(item)"></h-action-edit-button>
      <h-action-delete-button
        v-if="!item.reserved"
        @click="deleteItemById(item[rowKey])"
      ></h-action-delete-button>
    </template>
  </h-data-table>
</template>

<script setup lang="ts">
import type { SysRoleEntity, SysRoleConditions, SysRoleProps } from '@herodotus/api';
import type { VDataTableHeaders } from '@/composables/declarations';

import {DayJs} from '@herodotus/core'
import { useTable } from '@/composables/hooks';
import { API, PAGE_NAME } from '@/configurations';

defineOptions({ name: PAGE_NAME.OAUTH2_APPLICATION });

const headers = ref([
  { key: 'applicationName', align: 'center', title: '应用名称' },
  { key: 'abbreviation', align: 'center', title: '应用简称' },
  {
    key: 'authorizationGrantTypes',
    align: 'center',
    title: '认证模式',
  },
  {
    key: 'accessTokenTimeToLive',
    align: 'center',
    title: '令牌有效期',
    format: (value) => formatDuration(value),
  },
  {
    key: 'refreshTokenTimeToLive',
    align: 'center',
    title: '刷新令牌有效期',
    format: (value) => formatDuration(value),
  },
  {
    key: 'authorizationCodeTimeToLive',
    align: 'center',
    title: '授权码有效期',
    format: (value) => formatDuration(value),
  },
  {
    key: 'deviceCodeTimeToLive',
    align: 'center',
    title: '激活码有效期',
    format: (value) => formatDuration(value),
  },
  { key: 'reserved', align: 'center', title: '保留数据' },
  { key: 'status', align: 'center', title: '状态' },
  { key: 'actions', align: 'center', title: '操作' },
]) as Ref<Array<VDataTableHeaders>>;

const rowKey: SysRoleProps = 'roleId';

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
} = useTable<SysRoleEntity, SysRoleConditions>(API.core.sysRole(), PAGE_NAME.OAUTH2_APPLICATION);

const formatDuration = (date: string): string => {
  return DayJs.duration(date, 'seconds').humanize();
};
</script>
