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

    <template #item.succeeded="{ value }">
      <h-column-boolean :value="value"></h-column-boolean>
    </template>

    <template #item.actions="{ item }">
      <h-action-delete-button v-if="!item.reserved" @click="deleteItemById(item[rowKey])"></h-action-delete-button>
    </template>
  </h-data-table>
</template>

<script setup lang="ts">
import type {
  TaskExecutionHistoryEntity,
  TaskExecutionHistoryConditions,
  TaskExecutionHistoryProps,
} from '@herodotus/api';
import type { VDataTableHeaders } from '@/composables/declarations';

import { useTable, useDateTime } from '@/composables/hooks';
import { API, PAGE_NAME } from '@/configurations';

import Search from './Search.vue';

defineOptions({ name: PAGE_NAME.TASK_EXECUTION_HISTORY });

const headers = ref([
  { key: 'serviceId', align: 'start', title: '服务' },
  { key: 'taskId', align: 'start', title: '任务ID' },
  { key: 'taskName', align: 'start', title: '任务名称' },
  { key: 'taskType', align: 'center', title: '任务类型' },
  { key: 'startTime', align: 'center', title: '开始时间', value: (item) => defaultFormat(item.startTime) },
  { key: 'endTime', align: 'center', title: '结束时间', value: (item) => defaultFormat(item.endTime) },
  { key: 'duration', align: 'center', title: '执行耗时', value: (item) => humanize(item.initialDelay) },
  { key: 'succeeded', align: 'center', title: '是否成功' },
  { key: 'errorMessage', align: 'center', title: '错误信息' },
  { key: 'updateTime', align: 'center', title: '修改时间', value: (item) => defaultFormat(item.updateTime) },
  { key: 'reserved', align: 'center', title: '保留数据' },
  { key: 'status', align: 'center', title: '状态' },
  { key: 'actions', align: 'center', title: '操作' },
]) as Ref<Array<VDataTableHeaders>>;

const rowKey: TaskExecutionHistoryProps = 'executionId';

const { defaultFormat, humanize } = useDateTime();
const { loading, pageNumber, pageSize, tableRows, totalPages, totalItems, conditions, deleteItemById, findItems } =
  useTable<TaskExecutionHistoryConditions, TaskExecutionHistoryEntity>(
    API.core.taskExecutionHistory(),
    PAGE_NAME.TASK_EXECUTION_HISTORY,
  );
</script>
