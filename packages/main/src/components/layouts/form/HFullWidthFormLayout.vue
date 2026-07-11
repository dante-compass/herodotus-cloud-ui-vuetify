<template>
  <h-detail-container v-bind="$attrs" @cancel="onCancel">
    <slot></slot>

    <div>
      <v-btn color="red" @click="onCancel()" class="mr-2">取消</v-btn>
      <slot name="button"></slot>
    </div>
  </h-detail-container>
</template>

<script setup lang="ts">
import HDetailContainer from "./HDetailContainer.vue";

defineOptions({ name: "HFullWidthFormLayout" });

const emit = defineEmits<{
  cancel: [];
}>();

const onCancel = async () => {
  emit("cancel");
};
</script>
