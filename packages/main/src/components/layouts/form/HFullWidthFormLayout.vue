<template>
  <h-detail-container v-bind="$attrs">
    <slot></slot>

    <div>
      <h-button color="red" @click="onFinish()" class="mr-2">取消</h-button>
      <slot name="button"></slot>
    </div>
  </h-detail-container>
</template>

<script setup lang="ts">
import { useEditFinish } from '@herodotus/framework';

import HDetailContainer from './HDetailContainer.vue';

defineOptions({ name: 'HFullWidthFormLayout' });

const { onFinish } = useEditFinish();
</script>
