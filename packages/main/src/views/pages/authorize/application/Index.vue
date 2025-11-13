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
      <v-btn>新建应用</v-btn>
    </template>

    <template #item.accessTokenTimeToLive="{ value }">
      {{ formatDuration(value) }}
    </template>

    <template #item.refreshTokenTimeToLive="{ value }">
      {{ formatDuration(value) }}
    </template>

    <template #item.authorizationCodeTimeToLive="{ value }">
      {{ formatDuration(value) }}
    </template>

    <template #item.deviceCodeTimeToLive="{ value }">
      {{ formatDuration(value) }}
    </template>

    <template #item.authorizationGrantTypes="{ item }">
      <h-column-grant-type :items="item.authorizationGrantTypes"></h-column-grant-type>
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
  OAuth2ApplicationEntity,
  OAuth2ApplicationConditions,
  OAuth2ApplicationProps,
} from '@herodotus/api';
import type { VDataTableHeaders } from '@/composables/declarations';

import { moment } from '@herodotus/core';
import { useTable } from '@/composables/hooks';
import { API, PAGE_NAME } from '@/configurations';

defineOptions({ name: PAGE_NAME.OAUTH2_APPLICATION });

const headers = ref([
  { key: 'applicationName', align: 'center', title: '应用名称' },
  { key: 'abbreviation', align: 'center', title: '应用简称' },
  { key: 'authorizationGrantTypes', align: 'center', title: '认证模式' },
  { key: 'accessTokenTimeToLive', align: 'center', title: '令牌有效期' },
  { key: 'refreshTokenTimeToLive', align: 'center', title: '刷新令牌有效期' },
  { key: 'authorizationCodeTimeToLive', align: 'center', title: '授权码有效期' },
  { key: 'deviceCodeTimeToLive', align: 'center', title: '激活码有效期' },
  { key: 'reserved', align: 'center', title: '保留数据' },
  { key: 'status', align: 'center', title: '状态' },
  { key: 'actions', align: 'center', title: '操作' },
]) as Ref<Array<VDataTableHeaders>>;

const rowKey: OAuth2ApplicationProps = 'applicationId';

const {
  loading,
  pageNumber,
  pageSize,
  tableRows,
  totalPages,
  totalItems,
  toEdit,
  deleteItemById,
  findItems,
} = useTable<OAuth2ApplicationEntity, OAuth2ApplicationConditions>(
  API.core.oauth2Application(),
  PAGE_NAME.OAUTH2_APPLICATION,
);

const formatDuration = (date: string): string => {
  return moment.duration(date, 'seconds').humanize();
};
</script>
