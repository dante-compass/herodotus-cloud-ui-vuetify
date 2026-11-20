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

    <template #item.taskType="{ value }">
      <v-chip v-if="value" density="compact" rounded="lg" :color="getTaskTypeColor(value)" label>
        {{ getDictionaryItemDisplay('TaskType', value) }}
      </v-chip>
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

import { useTable, useDateTime, useDictionary } from '@/composables/hooks';
import { API, PAGE_NAME, TASK_TYPE_STYLE_GROUP } from '@/configurations';

import Search from './Search.vue';

defineOptions({ name: PAGE_NAME.TASK_EXECUTION_HISTORY, components: { Search } });

const headers = ref([
  { key: 'serviceId', align: 'center', title: '服务' },
  { key: 'taskId', align: 'center', title: '任务ID' },
  { key: 'taskName', align: 'center', title: '任务名称' },
  { key: 'taskType', align: 'center', title: '任务类型' },
  { key: 'startTime', align: 'center', title: '开始时间', value: (item) => defaultFormat(item.startTime) },
  { key: 'endTime', align: 'center', title: '结束时间', value: (item) => defaultFormat(item.endTime) },
  { key: 'duration', align: 'center', title: '执行耗时', value: (item) => humanize(item.duration) },
  { key: 'succeeded', align: 'center', title: '是否成功' },
  { key: 'errorMessage', align: 'center', title: '错误信息' },
  { key: 'actions', align: 'center', title: '操作' },
]) as Ref<Array<VDataTableHeaders>>;

const rowKey: TaskExecutionHistoryProps = 'executionId';

const { defaultFormat, humanize } = useDateTime();
const { getDictionaryItemDisplay } = useDictionary('TaskType');
const { loading, pageNumber, pageSize, tableRows, totalPages, totalItems, conditions, deleteItemById, findItems } =
  useTable<TaskExecutionHistoryConditions, TaskExecutionHistoryEntity>(
    API.core.taskExecutionHistory(),
    PAGE_NAME.TASK_EXECUTION_HISTORY,
  );

const getTaskTypeColor = (type: string) => {
  return TASK_TYPE_STYLE_GROUP[type].color;
};
</script>
