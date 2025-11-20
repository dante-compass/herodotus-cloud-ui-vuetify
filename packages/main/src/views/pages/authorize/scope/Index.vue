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
      <v-btn @click="toCreate">新建范围</v-btn>
    </template>

    <template #item.actions="{ item }">
      <h-action-authorize-button
        tooltip="配置权限"
        @click="toAuthorize(item)"
      ></h-action-authorize-button>
      <h-action-edit-button @click="toEdit(item)"></h-action-edit-button>
      <h-action-delete-button
        v-if="!item.reserved"
        @click="deleteItemById(item[rowKey])"
      ></h-action-delete-button>
    </template>
  </h-data-table>
</template>

<script setup lang="ts">
import type { OAuth2ScopeEntity, OAuth2ScopeConditions, OAuth2ScopeProps } from '@herodotus/api';
import type { VDataTableHeaders } from '@/composables/declarations';

import { useTable } from '@/composables/hooks';
import { API, PAGE_NAME } from '@/configurations';

defineOptions({ name: PAGE_NAME.OAUTH2_SCOPE });

const headers = ref([
  { key: 'scopeCode', align: 'center', title: '范围代码' },
  { key: 'scopeName', align: 'center', title: '范围名称' },
  { key: 'description', align: 'center', title: '说明' },
  { key: 'reserved', align: 'center', title: '保留数据' },
  { key: 'status', align: 'center', title: '状态' },
  { key: 'actions', align: 'center', title: '操作' },
]) as Ref<Array<VDataTableHeaders>>;

const rowKey: OAuth2ScopeProps = 'scopeId';

const {
  loading,
  pageNumber,
  pageSize,
  tableRows,
  totalPages,
  totalItems,
  toEdit,
  toCreate,
  toAuthorize,
  deleteItemById,
  findItems,
} = useTable<OAuth2ScopeEntity, OAuth2ScopeConditions>(
  API.core.oauth2Scope(),
  PAGE_NAME.OAUTH2_SCOPE,
);
</script>
