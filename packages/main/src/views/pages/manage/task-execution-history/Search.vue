<template>
  <v-row>
    <v-col cols="2">
      <v-text-field
        v-model="conditions.serviceId"
        label="服务ID"
        density="compact"
        hide-details
        clearable
      ></v-text-field>
    </v-col>
    <v-col cols="2">
      <v-text-field
        v-model="conditions.executionId"
        label="执行历史ID"
        density="compact"
        hide-details
        clearable
      ></v-text-field>
    </v-col>
    <v-col cols="2">
      <v-text-field v-model="conditions.taskId" label="任务ID" density="compact" hide-details clearable></v-text-field>
    </v-col>
    <v-col cols="2">
      <v-text-field
        v-model="conditions.taskName"
        label="任务名称"
        density="compact"
        hide-details
        clearable
      ></v-text-field>
    </v-col>
    <v-col cols="2">
      <h-dictionary-select
        v-model="conditions.taskType"
        dictionary="TaskType"
        label="任务类型"
        density="compact"
        hide-details
      ></h-dictionary-select>
    </v-col>
    <v-col></v-col>
    <v-col cols="1" class="text-end pr-0">
      <h-icon-button color="red" icon="mdi-broom" tooltip="清空" variant="text" @click.stop="onClear()"></h-icon-button>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import type { TaskExecutionHistoryConditions } from '@herodotus/api';

defineOptions({ name: 'TaskExecutionHistoryCondition' });

const conditions = defineModel<TaskExecutionHistoryConditions>({
  default: () => ({}) as TaskExecutionHistoryConditions,
  required: true,
});

const onClear = () => {
  conditions.value = {} as TaskExecutionHistoryConditions;
};
</script>
