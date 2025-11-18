<template>
  <v-dialog v-model="openDialog" max-width="500" persistent>
    <v-card
      :disabled="loading"
      :loading="loading"
      prepend-icon="mdi-email-edit"
      :title="`向【${name}】发送消息`"
    >
      <template v-slot:loader="{ isActive }">
        <v-progress-linear :active="isActive" height="4" indeterminate></v-progress-linear>
      </template>
      <v-card-text>
        <h-send-message-textarea
          :receiver-id="id"
          :receiver-name="name"
          :dialogue-id="dialogueId"
          :receiver-avatar="avatar"
          @send="onCloseDialog()"
        ></h-send-message-textarea>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
defineOptions({ name: 'SendMessageDialog' });

interface Props {
  id: string;
  name: string;
  avatar: string;
  dialogueId?: string;
}

defineProps<Props>();

const openDialog = defineModel({
  type: Boolean,
  default: false,
  required: true,
});

const loading = shallowRef(false);

const onCloseDialog = () => {
  loading.value = true;
  openDialog.value = false;
};
</script>
