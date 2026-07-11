<template>
  <h-detail-container v-bind="$attrs" @cancel="onCancel">
    <v-container>
      <v-row>
        <v-col cols="8">
          <slot></slot>
        </v-col>
        <v-col cols="4">
          <slot name="right"></slot>
        </v-col>
      </v-row>
    </v-container>
  </h-detail-container>
</template>

<script setup lang="ts">
import { HDetailContainer } from "../../layouts/form";

defineOptions({ name: "HAuthorizeFormLayout", components: { HDetailContainer } });

const emit = defineEmits<{
  cancel: [];
}>();

const onCancel = async () => {
  emit("cancel");
};
</script>
