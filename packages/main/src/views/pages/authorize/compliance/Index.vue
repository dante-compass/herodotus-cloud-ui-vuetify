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
      <v-btn @click="onExportExcel">导出Excel</v-btn>
    </template>

    <template #item.createTime="{ value }">
      {{ dateFormat(value) }}
    </template>

    <template #item.mobile="{ item }">
      <h-column-boolean :value="item.mobile"></h-column-boolean>
    </template>

    <template #item.mobileBrowser="{ item }">
      <h-column-boolean :value="item.mobileBrowser"></h-column-boolean>
    </template>
  </h-data-table>
</template>

<script setup lang="ts">
import type { EntityTitle } from '@herodotus/core';
import type {
  OAuth2UserLoggingEntity,
  OAuth2UserLoggingConditions,
  OAuth2UserLoggingProps,
} from '@herodotus/api';
import type { VDataTableHeaders } from '@/composables/declarations';

import { moment } from '@herodotus/core';
import { useTable, useXlsx } from '@/composables/hooks';
import { API, PAGE_NAME } from '@/configurations';

defineOptions({ name: PAGE_NAME.OAUTH2_COMPLIANCE });

const headers = ref([
  { key: 'principalName', align: 'center', title: '用户名' },
  { key: 'clientId', field: 'clientId', align: 'center', title: '客户端ID' },
  { key: 'ip', field: 'ip', align: 'center', title: 'IP地址' },
  { key: 'location', align: 'center', title: '位置' },
  { key: 'mobile', align: 'center', title: '移动端？' },
  { key: 'mobileBrowser', align: 'center', title: '是移动端浏览器' },
  { key: 'platformName', align: 'center', title: '平台' },
  { key: 'osName', align: 'center', title: '操作系统' },
  { key: 'browserName', align: 'center', title: '浏览器' },
  { key: 'browserEngineName', align: 'center', title: '浏览器引擎' },
  { key: 'operation', align: 'center', title: '操作' },
  { key: 'createTime', align: 'center', title: '时间' },
]) as Ref<Array<VDataTableHeaders>>;

const rowKey: OAuth2UserLoggingProps = 'loggingId';

const { loading, pageNumber, pageSize, tableRows, totalPages, totalItems, findItems } = useTable<
  OAuth2UserLoggingEntity,
  OAuth2UserLoggingConditions
>(API.core.oauth2UserLogging(), PAGE_NAME.OAUTH2_COMPLIANCE, false, ['createTime'], 'DESC');
const { postExport } = useXlsx<OAuth2UserLoggingEntity>();

const dateFormat = (date: string) => {
  if (date) {
    return moment(date).format('YYYY-MM-DD HH:mm:ss');
  } else {
    return '';
  }
};

const title: EntityTitle<OAuth2UserLoggingEntity> = {
  createTime: '创建时间',
  updateTime: '更新时间',
  loggingId: 'ID',
  principalName: '用户名',
  clientId: 'OAuth2 客户端ID',
  ip: 'IP地址',
  mobile: '是移动端 ?',
  browserName: '浏览器',
  mobileBrowser: '是移动端浏览器 ?',
  browserVersion: '浏览器版本',
  platformName: '平台',
  osName: '操作系统',
  osVersion: '操作系统版本',
  browserEngineName: '浏览器引擎',
  browserEngineVersion: '浏览器引擎版本',
  operation: '执行操作',
  location: '登录位置',
};

const onExportExcel = () => {
  postExport(tableRows.value, title, '日志审计');
};
</script>
