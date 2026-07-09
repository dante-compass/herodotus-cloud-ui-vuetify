<template>
  <v-card class="mx-auto" :title="title">
    <template #prepend>
      <h-button icon="mdi-arrow-left-box" tooltip="返回" variant="text" @click="onFinish()"></h-button>
    </template>

    <v-card-text>
      <slot></slot>
    </v-card-text>
    <v-overlay :model-value="overlay" class="align-center justify-center" contained>
      <v-progress-circular color="primary" size="64" indeterminate></v-progress-circular>
    </v-overlay>
  </v-card>
</template>

<script setup lang="ts">
import { useEditFinish } from "@herodotus/framework";

defineOptions({ name: "HDetailContainer" });

const { onFinish } = useEditFinish();

interface Props {
  title?: string;
  overlay?: boolean;
}

withDefaults(defineProps<Props>(), {
  overlay: false,
});
</script>
