<template>
  <div>
    <v-card :flat="flat" :title="title" class="mb-4">
      <template #prepend>
        <h-icon-button icon="mdi-arrow-left-box" variant="text" @click="onCancel()"></h-icon-button>
      </template>

      <v-card-text v-if="$slots.header">
        <slot name="header"></slot>
      </v-card-text>
      <v-overlay :model-value="overlay" class="align-center justify-center" contained>
        <v-progress-circular color="primary" size="64" indeterminate></v-progress-circular>
      </v-overlay>
    </v-card>

    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'HInformationFormLayout' });

interface Props {
  title?: string;
  overlay?: boolean;
  flat?: boolean;
}

withDefaults(defineProps<Props>(), {
  overlay: false,
  flat: false,
});

const emit = defineEmits<{
  cancel: [];
}>();

const onCancel = async () => {
  emit('cancel');
};
</script>
