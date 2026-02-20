<template>
  <h-dialog v-model="openDialog" prepend-icon="mdi-email-edit" :title="`向【${name}】发送消息`" closed hide-actions>
    <h-send-message-textarea
      :receiver-id="id"
      :receiver-name="name"
      :dialogue-id="dialogueId"
      :receiver-avatar="avatar"
      @send="onCloseDialog"
    ></h-send-message-textarea>
  </h-dialog>
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
