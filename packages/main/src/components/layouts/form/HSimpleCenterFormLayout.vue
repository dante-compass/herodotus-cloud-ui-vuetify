<template>
  <h-detail-container v-bind="$attrs" @cancel="onCancel()">
    <h-container :offset="4">
      <slot></slot>
      <div class="q-mt-sm">
        <q-btn color="red" @click="onCancel()">取消</q-btn>
        <q-btn v-if="!hideSave" color="primary" class="q-ml-sm" @click="onSave()">保存</q-btn>
        <slot name="button"></slot>
      </div>
    </h-container>
  </h-detail-container>
</template>

<script setup lang="ts">
import HDetailContainer from "./HDetailContainer.vue";

defineOptions({ name: "HSimpleCenterFormLayout", components: { HDetailContainer } });

interface Props {
  hideSave?: boolean;
}

withDefaults(defineProps<Props>(), {
  hideSave: false,
});

const emit = defineEmits<{
  save: [];
  cancel: [];
}>();

const onSave = async () => {
  emit("save");
};

const onCancel = async () => {
  emit("cancel");
};
</script>
