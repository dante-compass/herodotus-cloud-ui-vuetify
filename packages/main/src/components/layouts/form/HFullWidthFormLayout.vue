<template>
  <h-detail-container v-bind="$attrs">
    <slot></slot>

    <div>
      <v-btn color="red" @click="onFinish()" class="mr-2">取消</v-btn>
      <slot name="button"></slot>
    </div>
  </h-detail-container>
</template>

<script setup lang="ts">
import { useEditFinish } from "@herodotus/framework";

import HDetailContainer from "./HDetailContainer.vue";

defineOptions({ name: "HFullWidthFormLayout" });

const { onFinish } = useEditFinish();
</script>
