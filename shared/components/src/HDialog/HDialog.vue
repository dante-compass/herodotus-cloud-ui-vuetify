<template>
  <v-dialog v-model="open" :max-width="maxWidth" persistent>
    <v-card :disabled="loading" :loading="loading" v-bind="$attrs">
      <template #loader="{ isActive }">
        <v-progress-linear :active="isActive" height="4" indeterminate></v-progress-linear>
      </template>

      <template v-if="closed" #append>
        <h-button icon="mdi-close" tooltip="关闭" @click="onClose" size="x-small" variant="text"></h-button>
      </template>
      <v-divider></v-divider>
      <v-card-text class="pb-2">
        <slot></slot>
      </v-card-text>
      <v-card-actions v-if="!hideActions">
        <v-btn text="取消" color="red" @click="onCancel" />
        <v-btn :text="confirmLabel" @click="onConfirm" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { VBtn, VCard, VCardText, VCardActions, VDialog, VDivider, VProgressLinear } from 'vuetify/components';

import { HButton } from '../HButton';

defineOptions({ name: 'HDialog', components: { VDialog, HButton } });

interface Props {
  loading?: boolean;
  closed?: boolean;
  hideActions?: boolean;
  maxWidth?: string | number;
  confirmLabel?: string;
}

const emit = defineEmits<{
  close: [];
  cancel: [];
  confirm: [];
}>();

withDefaults(defineProps<Props>(), {
  loading: false,
  closed: false,
  hideActions: false,
  maxWidth: 500,
  confirmLabel: '确认',
});

const open = defineModel({
  type: Boolean,
  default: false,
  required: true,
});

const onClose = () => {
  open.value = false;
  emit('close');
};

const onCancel = () => {
  open.value = false;
  emit('cancel');
};

const onConfirm = () => {
  emit('confirm');
};
</script>
