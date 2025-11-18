<template>
  <v-dialog v-model="openDialog" max-width="500" persistent>
    <v-card prepend-icon="mdi-email-edit" :title="`向【${name}】发送消息`" rounded="xl">
      <template #append>
        <h-button
          icon="mdi-close"
          tooltip="关闭"
          @click="onCloseDialog"
          size="x-small"
          variant="text"
        ></h-button>
      </template>
      <v-card-text>
        <h-send-message-textarea
          :receiver-id="id"
          :receiver-name="name"
          :dialogue-id="dialogueId"
          :receiver-avatar="avatar"
          @send="onCloseDialog"
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

const onCloseDialog = () => {
  openDialog.value = false;
};
</script>
