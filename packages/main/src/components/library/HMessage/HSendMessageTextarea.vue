<template>
  <v-form ref="sendMessageForm">
    <v-textarea
      v-model="text"
      label="消息内容"
      placeholder="文明发言，真诚提问，请输入要发送的内容"
      clearable
      class="mt-2"
      :rules="[(value: string) => !!value || '发送内容不能为空']"
    ></v-textarea>

    <v-btn :disabled="isDisabled" @click="onSend">发送</v-btn>
  </v-form>
</template>

<script setup lang="ts">
import type { DialogueDetailEntity } from '@herodotus/api';

import { isEmpty } from 'lodash-es';

import { useAuthenticationStore } from '@herodotus/framework';
import { useWebSocketMessage } from '@/composables/hooks';

defineOptions({ name: 'HSendMessageTextarea' });

interface Props {
  receiverId: string;
  receiverName: string;
  receiverAvatar: string;
  dialogueId?: string;
}

const props = withDefaults(defineProps<Props>(), {
  dialogueId: '',
});

const emit = defineEmits<{
  send: [];
}>();

const sendMessageForm = ref();
const text = shallowRef('');

const { sendToUser } = useWebSocketMessage();
const authentication = useAuthenticationStore();

const sendMessage = () => {
  const data = {
    receiverId: props.receiverId,
    receiverName: props.receiverName,
    receiverAvatar: props.receiverAvatar,
    content: text.value,
    dialogueId: props.dialogueId,
    senderId: authentication.userId,
    senderName: authentication.username,
  } as DialogueDetailEntity;

  sendToUser(data);
};

const isDisabled = computed(() => {
  return isEmpty(text.value);
});

const onSend = async () => {
  const { valid } = await sendMessageForm.value.validate();
  if (valid) {
    sendMessage();
    emit('send');
  }
};
</script>
