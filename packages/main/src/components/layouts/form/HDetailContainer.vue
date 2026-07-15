<template>
  <v-card class="mx-auto" :title="title">
    <template #prepend>
      <h-icon-button icon="mdi-arrow-left-box" variant="text" @click="onCancel()"></h-icon-button>
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
defineOptions({ name: "HDetailContainer" });

interface Props {
  title?: string;
  overlay?: boolean;
}

withDefaults(defineProps<Props>(), {
  overlay: false,
});

const emit = defineEmits<{
  cancel: [];
}>();

const onCancel = async () => {
  emit("cancel");
};
</script>
