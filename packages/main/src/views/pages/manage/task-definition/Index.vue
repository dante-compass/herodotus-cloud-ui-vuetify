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
    <template #item.taskType="{ value }">
      <v-chip v-if="value" density="compact" rounded="lg" color="teal" label>
        {{ getDictionaryItemDisplay('TaskType', value) }}
      </v-chip>
    </template>

    <template #item.backoff="{ value }">
      <v-chip v-if="value" density="compact" rounded="lg" color="cyan" label>
        {{ getDictionaryItemDisplay('Backoff', value) }}
      </v-chip>
    </template>

    <template #item.paused="{ value }">
      <v-chip v-if="value" density="compact" rounded="lg" color="error" label>已暂停</v-chip>
      <v-chip v-else density="compact" rounded="lg" color="success" label>运行中</v-chip>
    </template>

    <template #item.actions="{ item }">
      <h-action-button
        :color="item.paused ? 'mdi-play' : 'mdi-pause'"
        :icon="item.paused ? 'success' : 'error'"
        :tooltip="item.paused ? '恢复' : '暂停'"
        @click="toggle(item)"
      ></h-action-button>
      <h-action-edit-button @click="toEdit(item)"></h-action-edit-button>
      <h-action-delete-button v-if="!item.reserved" @click="deleteItemById(item[rowKey])"></h-action-delete-button>
    </template>
  </h-data-table>
</template>

<script setup lang="ts">
import type { HttpResult } from '@herodotus/core';
import type { TaskDefinitionEntity, TaskDefinitionConditions, TaskDefinitionProps } from '@herodotus/api';
import type { VDataTableHeaders } from '@/composables/declarations';

import { toast } from '@herodotus/core';
import { useTable, useDateTime, useDictionary } from '@/composables/hooks';
import { API, PAGE_NAME } from '@/configurations';

defineOptions({ name: PAGE_NAME.TASK_DEFINITION });

const headers = ref([
  { key: 'taskId', align: 'start', title: '任务ID' },
  { key: 'taskName', align: 'start', title: '任务名称' },
  { key: 'taskType', align: 'center', title: '任务类型' },
  { key: 'timezone', align: 'center', title: '指定时区' },
  { key: 'interval', align: 'center', title: '执行间隔', value: (item) => humanize(item.interval) },
  { key: 'initialDelay', align: 'center', title: '初始延迟', value: (item) => humanize(item.initialDelay) },
  { key: 'timeout', align: 'center', title: '超时时间', value: (item) => humanize(item.timeout) },
  { key: 'methodName', align: 'center', title: '方法名称' },
  { key: 'retryInterval', align: 'center', title: '重试间隔', value: (item) => humanize(item.retryInterval) },
  { key: 'backoff', align: 'center', title: '退避策略' },
  { key: 'maxInterval', align: 'center', title: '重试间隔', value: (item) => humanize(item.maxInterval) },
  { key: 'paused', align: 'center', title: '是否暂停' },
  { key: 'updateBy', align: 'center', title: '最后修改人' },
  { key: 'updateTime', align: 'center', title: '修改时间', value: (item) => defaultFormat(item.updateTime) },
  { key: 'reserved', align: 'center', title: '保留数据' },
  { key: 'status', align: 'center', title: '状态' },
  { key: 'actions', align: 'center', title: '操作' },
]) as Ref<Array<VDataTableHeaders>>;

const rowKey: TaskDefinitionProps = 'taskId';

const { getDictionaryItemDisplay } = useDictionary('TaskType', 'Backoff');
const { defaultFormat, humanize } = useDateTime();
const { loading, pageNumber, pageSize, tableRows, totalPages, totalItems, toEdit, deleteItemById, findItems } =
  useTable<TaskDefinitionConditions, TaskDefinitionEntity>(API.core.taskDefinition(), PAGE_NAME.TASK_DEFINITION);

const toggle = (item: TaskDefinitionEntity) => {
  API.core
    .taskDefinition()
    .toggle(item)
    .then((response) => {
      const result = response as HttpResult<TaskDefinitionEntity>;
      if (result.message) {
        toast.success(result.message);
      } else {
        toast.success('操作成功');
      }
    })
    .catch((error) => {
      toast.error('操作失败');
    });
};
</script>
