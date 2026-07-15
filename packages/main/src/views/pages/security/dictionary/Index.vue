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
    @update:options="findItems"
  >
    <template #search>
      <search v-model="conditions"></search>
    </template>

    <template #control>
      <v-btn prepend-icon="mdi-plus" text="新建字典" @click="toCreate">新建字典</v-btn>
    </template>

    <template #item.name="{ item }">
      <v-chip
        :border="`${getColor(item)} thin opacity-25`"
        :color="getColor(item)"
        :text="item.label"
        size="small"
      ></v-chip>
    </template>

    <template #item.actions="{ item }">
      <h-action-edit-button @click="toEdit(item)"></h-action-edit-button>
      <h-action-delete-button v-if="!item.reserved" @click="deleteItemById(item[rowKey])"></h-action-delete-button>
    </template>
  </h-data-table>
</template>

<script setup lang="ts">
import type { SysDictionaryEntity, SysDictionaryConditions, SysDictionaryProps } from '@herodotus/api';
import type { VDataTableHeaders } from '@/composables/declarations';

import { useTable, useDateTime } from '@/composables/hooks';
import { API, PAGE_NAME, COLOR_LIST } from '@/configurations';

import Search from './Search.vue';

defineOptions({ name: PAGE_NAME.SYS_DICTIONARY, components: { Search } });

const headers = ref([
  { key: 'category', align: 'center', title: '分类' },
  { key: 'ordinal', align: 'center', title: '索引值' },
  { key: 'name', align: 'center', title: '字面量' },
  { key: 'label', align: 'center', title: '显示值' },
  { key: 'value', align: 'center', title: '实际值' },
  { key: 'ranking', align: 'center', title: '排序值' },
  { key: 'valueType', align: 'center', title: '数据类型' },
  { key: 'updateBy', align: 'center', title: '最后修改人' },
  { key: 'updateTime', align: 'center', title: '修改时间', value: (item) => defaultFormat(item.updateTime) },
  { key: 'reserved', align: 'center', title: '保留数据' },
  { key: 'status', align: 'center', title: '状态' },
  { key: 'actions', align: 'center', title: '操作' },
]) as Ref<Array<VDataTableHeaders>>;

const rowKey: SysDictionaryProps = 'dictionaryId';

const { defaultFormat } = useDateTime();
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
} = useTable<SysDictionaryConditions, SysDictionaryEntity>(API.core.sysDictionary(), PAGE_NAME.SYS_DICTIONARY);

const getColor = (item: SysDictionaryEntity) => {
  return COLOR_LIST[item.ordinal];
};
</script>
