<template>
  <h-center-form-layout
    :entity="editedItem"
    :title="title"
    :overlay="overlay"
    hide-detail
    @save="onSave()"
    @cancel="onReturn"
  >
    <v-form ref="taskDefinitionForm">
      <v-text-field v-model="editedItem.taskName" label="任务名称" placeholder="请输入任务名称" disabled></v-text-field>
      <h-dictionary-toggle
        v-model="editedItem.taskType"
        dictionary="TaskType"
        default-value="CRON"
      ></h-dictionary-toggle>
      <component :is="currentPanel" v-model="editedItem"></component>
    </v-form>
  </h-center-form-layout>
</template>

<script setup lang="ts">
import type { TaskDefinitionEntity } from '@herodotus/api';

import { toUpper } from 'lodash-es';
import { useTableItem } from '@/composables/hooks';
import { API, PAGE_NAME } from '@/configurations';

import HCronTaskPanel from './components/HCronTaskPanel.vue';
import HFixTaskPanel from './components/HFixTaskPanel.vue';
import HOneTimeTaskPanel from './components/HOneTimeTaskPanel.vue';

defineOptions({
  name: PAGE_NAME.TASK_DEFINITION_CONTENT,
  components: {
    CRON_PANEL: HCronTaskPanel,
    FIXED_DELAY_PANEL: HFixTaskPanel,
    FIXED_RATE_PANEL: HFixTaskPanel,
    ONE_TIME_PANEL: HOneTimeTaskPanel,
  },
});

const { editedItem, title, overlay, saveOrUpdate, onReturn } = useTableItem<TaskDefinitionEntity>(
  API.core.taskDefinition(),
  PAGE_NAME.TASK_DEFINITION_CONTENT,
);

const taskDefinitionForm = ref();

const currentPanel = computed(() => {
  if (editedItem.value.taskType) {
    return toUpper(editedItem.value.taskType) + '_PANEL';
  } else {
    return 'PROPERTIES_PANEL';
  }
});

const onSave = async () => {
  const { valid } = await taskDefinitionForm.value.validate();
  if (valid) {
    saveOrUpdate();
  }
};
</script>
