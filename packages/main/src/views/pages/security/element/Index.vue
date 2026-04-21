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
      <v-btn @click="toCreate">新建菜单</v-btn>
    </template>

    <template #item.applicationType="{ value }">
      <v-chip v-if="value" density="compact" rounded="lg" color="teal" label>
        {{ getDictionaryItemDisplay('ApplicationType', value) }}
      </v-chip>
    </template>

    <!-- <template #item.elementCategory="{ item }">
      {{ getDictionaryItemDisplay('ElementCategory', item.elementCategory) }}
    </template> -->

    <template #item.menuScenario="{ value }">
      <v-chip v-if="value" density="compact" rounded="lg" color="cyan" label>
        {{ getDictionaryItemDisplay('MenuScenario', value) }}
      </v-chip>
    </template>

    <template #item.icon="{ item }">
      <h-action-button :icon="item.icon" :tooltip="item.icon"></h-action-button>
    </template>

    <template #item.isHaveChild="{ item }">
      <h-column-boolean :value="item.isHaveChild"></h-column-boolean>
    </template>

    <template #item.isNotKeepAlive="{ item }">
      <h-column-boolean :value="item.isNotKeepAlive"></h-column-boolean>
    </template>

    <template #item.isHideAllChild="{ item }">
      <h-column-boolean :value="item.isHideAllChild"></h-column-boolean>
    </template>

    <template #item.isDetailContent="{ item }">
      <h-column-boolean :value="item.isDetailContent"></h-column-boolean>
    </template>

    <template #item.isIgnoreAuth="{ item }">
      <h-column-boolean :value="item.isIgnoreAuth"></h-column-boolean>
    </template>

    <template #item.actions="{ item }">
      <h-action-authorize-button tooltip="配置角色" @click="toAuthorize(item)"></h-action-authorize-button>
      <h-action-edit-button @click="toEdit(item)"></h-action-edit-button>
      <h-action-delete-button v-if="!item.reserved" @click="deleteItemById(item[rowKey])"></h-action-delete-button>
    </template>
  </h-data-table>
</template>

<script setup lang="ts">
import type { SysElementEntity, SysElementConditions, SysElementProps } from '@herodotus/api';
import type { VDataTableHeaders } from '@/composables/declarations';

import { useTable, useDictionary } from '@/composables/hooks';
import { API, PAGE_NAME } from '@/configurations';

import Search from './Search.vue';

defineOptions({ name: PAGE_NAME.SYS_ELEMENT, components: { Search } });

const headers = ref([
  { key: 'title', align: 'center', title: '标题' },
  { key: 'name', align: 'center', title: '组件名称' },
  { key: 'path', align: 'center', title: '请求路径' },
  { key: 'applicationType', align: 'center', title: '应用类型' },
  { key: 'menuScenario', align: 'center', title: '菜单场景' },
  { key: 'path', align: 'center', title: '请求路径' },
  { key: 'icon', align: 'center', title: '图标' },
  { key: 'isHaveChild', align: 'center', title: '有子节点' },
  { key: 'isHideAllChild', align: 'center', title: '隐藏下级节点' },
  { key: 'isDetailContent', align: 'center', title: '三级路由' },
  { key: 'isNotKeepAlive', align: 'center', title: '不缓存' },
  { key: 'isIgnoreAuth', align: 'center', title: '忽略认证' },
  { key: 'reserved', align: 'center', title: '保留数据' },
  { key: 'status', align: 'center', title: '状态' },
  { key: 'actions', align: 'center', title: '操作' },
]) as Ref<Array<VDataTableHeaders>>;

const rowKey: SysElementProps = 'elementId';

const { getDictionaryItemDisplay } = useDictionary('ApplicationType', 'ElementCategory', 'MenuScenario');

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
  toAuthorize,
  deleteItemById,
  findItems,
} = useTable<SysElementConditions, SysElementEntity>(
  API.core.sysElement(),
  PAGE_NAME.SYS_ELEMENT,
  false,
  ['path'],
  'ASC',
);
</script>
