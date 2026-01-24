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
    reserved
    @update:options="findItems"
  >
    <template #control>
      <v-btn>新建</v-btn>
    </template>

    <template #item.requestMethod="{ item }">
      <h-column-swagger
        :method="item.requestMethod"
        :url="item.url"
        :description="item.description"
      ></h-column-swagger>
    </template>
    <template #item.actions="{ item }">
      <h-action-button
        color="amber"
        icon="mdi-shield-key"
        tooltip="配置归属权限"
        @click="toAuthorize(item)"
      ></h-action-button>
      <h-action-edit-button @click="toEdit(item)"></h-action-edit-button>
    </template>
  </h-data-table>
</template>

<script setup lang="ts">
import type { SysAttributeEntity, SysAttributeProps, SysAttributeConditions } from '@herodotus/api';
import type { VDataTableHeaders } from '@/composables/declarations';

import { useTable } from '@/composables/hooks';
import { API, PAGE_NAME } from '@/configurations';

defineOptions({ name: PAGE_NAME.SYS_ATTRIBUTE });

const headers = ref([
  { key: 'requestMethod', align: 'center', title: '权限接口' },
  { key: 'attributeCode', align: 'center', title: '默认权限代码' },
  { key: 'webExpression', align: 'center', title: '特定表达式' },
  { key: 'status', align: 'center', title: '状态' },
  { key: 'actions', align: 'center', title: '操作' },
]) as Ref<Array<VDataTableHeaders>>;

const rowKey: SysAttributeProps = 'attributeId';

const {
  loading,
  pageNumber,
  pageSize,
  tableRows,
  totalPages,
  totalItems,
  toEdit,
  toAuthorize,
  findItems,
} = useTable<SysAttributeConditions, SysAttributeEntity>(
  API.core.sysAttribute(),
  PAGE_NAME.SYS_ATTRIBUTE,
  false,
  ['url'],
  'ASC',
);
</script>
