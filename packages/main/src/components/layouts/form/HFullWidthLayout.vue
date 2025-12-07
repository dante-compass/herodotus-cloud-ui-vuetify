<template>
  <h-detail-container v-bind="$attrs">
    <div>
      <slot></slot>
      <v-divider></v-divider>
      <h-button color="red" @click="onFinish()">取消</h-button>
      <slot name="button"></slot>
    </div>
  </h-detail-container>
</template>

<script setup lang="ts">
import { useEditFinish } from '@herodotus/framework';

import HDetailContainer from './HDetailContainer.vue';

defineOptions({ name: 'HFullWidthLayout' });

const { onFinish } = useEditFinish();
</script>
