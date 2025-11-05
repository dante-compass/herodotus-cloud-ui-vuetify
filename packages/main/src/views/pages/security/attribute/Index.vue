<template>
  <h-data-table
    v-model:page-size="pageSize"
    v-model:page-number="pageNumber"
    v-model:total-pages="totalPages"
    v-model:total-items="totalItems"
    :headers="headers"
    :items="tableItems"
    :item-value="rowKey"
    density="comfortable"
    @update:options="loadItems"
  >
    <template v-slot:item.actions="{ item }">
      <h-action-edit-button></h-action-edit-button>
      <h-action-delete-button></h-action-delete-button>
    </template>
  </h-data-table>
</template>

<script setup lang="ts">
import type { Page, Sort } from '@herodotus/core';
import type { SysAttributeEntity, SysAttributeProps } from '@herodotus/api';
import type { VDataTableHeaders } from '@/composables/declarations';

import { pickBy } from 'lodash-es';

import { API } from '@/configurations';

defineOptions({ name: 'SysAttribute' });

const headers = ref([
  { key: 'requestMethod', align: 'center', title: '权限接口' },
  { key: 'attributeCode', align: 'center', title: '默认权限代码' },
  { key: 'webExpression', align: 'center', title: '特定表达式' },
  { key: 'reserved', align: 'center', title: '保留数据' },
  { key: 'status', align: 'center', title: '状态' },
  { key: 'actions', align: 'center', title: '操作' },
]) as Ref<Array<VDataTableHeaders>>;

const rowKey: SysAttributeProps = 'attributeId';

const loading = shallowRef(false);
const sort = {} as Sort;

const tableItems = shallowRef([]) as Ref<SysAttributeEntity[]>;
const pageNumber = shallowRef(1);
const pageSize = shallowRef(10);
const totalItems = shallowRef(0);
const totalPages = shallowRef(0);

/**
 * 显示 Loading 状态
 */
const showLoading = () => {
  loading.value = true;
};

/**
 * 隐藏 Loading 状态
 */
const hideLoading = () => {
  loading.value = false;
};

const findItemsByPage = (pageNumber = 1, pageSize = 10, others = {}) => {
  showLoading();
  const params = pickBy(others);
  API.core
    .sysAttribute()
    .fetchByPage(
      {
        pageNumber: pageNumber - 1,
        pageSize: pageSize,
        ...sort,
      },
      params,
    )
    .then((result) => {
      const data = result.data as Page<SysAttributeEntity>;
      // 用户文档列表中无结果时也要更新列表数据
      if (data) {
        tableItems.value = data.content;
        totalPages.value = data.totalPages;
        totalItems.value = parseInt(data.totalElements, 0);
      } else {
        tableItems.value = [];
        totalPages.value = 0;
        totalItems.value = 0;
      }
      hideLoading();
    })
    .catch(() => {
      hideLoading();
    });
};

const loadItems = () => {
  findItemsByPage(pageNumber.value, pageSize.value);
};
</script>
