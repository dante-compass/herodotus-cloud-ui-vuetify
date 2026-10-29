<template>
  <div>
    <h-divider label="重试策略"></h-divider>
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
  </div>
</template>

<script setup lang="ts">
import type { TaskDefinitionEntity } from '@herodotus/api';

defineOptions({ name: 'HRetryPolicyPanel' });

const editedItem = defineModel<TaskDefinitionEntity>({
  default: () => ({}) as TaskDefinitionEntity,
});

const isExponential = computed(() => {
  return editedItem.value.backoff === 'EXPONENTIAL';
});
</script>
