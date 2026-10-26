<template>
  <h-center-form-layout :entity="editedItem" :title="title" :overlay="overlay" @save="onSave()" @cancel="onReturn">
    <h-divider label="基础设置"></h-divider>
    <v-text-field v-model="editedItem.taskName" label="任务名称" placeholder="请输入任务名称" disabled></v-text-field>
    <h-dictionary-toggle v-model="editedItem.taskType" dictionary="TaskType" default-value="CRON"></h-dictionary-toggle>
    <v-text-field v-model="editedItem.taskName" label="任务名称" placeholder="请输入任务名称" disabled></v-text-field>
    <v-number-input
      v-model="editedItem.maxAttempts"
      label="最大重试次数"
      placeholder="请输入最大重试次数"
      control-variant="split"
      inset
    ></v-number-input>
    <h-label text="重试间隔"></h-label>
    <h-duration v-model="editedItem.retryInterval"></h-duration>
    <h-dictionary-toggle v-model="editedItem.backoff" dictionary="Backoff" default-value="FIXED"></h-dictionary-toggle>
    <template v-if="isExponential">
      <h-label text="最大重试间隔"></h-label>
      <h-duration v-model="editedItem.maxInterval"></h-duration>
    </template>
  </h-center-form-layout>
</template>

<script setup lang="ts">
import type { TaskDefinitionEntity, TaskDefinitionConditions } from '@herodotus/api';

import { isEmpty } from 'lodash-es';
import { useTableItem, useTreeItem } from '@/composables/hooks';
import { API, PAGE_NAME } from '@/configurations';

defineOptions({ name: PAGE_NAME.TASK_DEFINITION_CONTENT });

const { editedItem, title, overlay, saveOrUpdate, onReturn } = useTableItem<TaskDefinitionEntity>(
  API.core.taskDefinition(),
  PAGE_NAME.TASK_DEFINITION_CONTENT,
);

const isExponential = computed(() => {
  return editedItem.value.backoff === 'EXPONENTIAL';
});

const onSave = () => {
  saveOrUpdate();
};
</script>
