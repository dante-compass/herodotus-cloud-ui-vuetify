<template>
  <h-detail-container v-bind="$attrs">
    <div>
      <slot></slot>
      <h-button color="red" @click="onFinish()" class="mr-2">取消</h-button>
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
