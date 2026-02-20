<template>
  <h-detail-container :title="receiverName">
    <v-data-iterator v-model:items-per-page="pageSize" v-model:page="pageNumber" :items="tableRows" :loading="loading">
      <template #default="{ items }">
        <v-list>
          <template v-for="(item, i) in items" :key="item.raw.detailId">
            <v-list-item>
              <template #prepend>
                <h-user-avatar :id="item.raw.senderId" :avatar="item.raw.senderAvatar"></h-user-avatar>
              </template>

              <v-list-item-title class="text-h6">
                {{ item.raw.content }}
              </v-list-item-title>
              <v-list-item-subtitle class="mb-2 text-high-emphasis opacity-100">
                {{ humanUpdateTimte(item.raw.createTime) }}
              </v-list-item-subtitle>
            </v-list-item>

            <v-divider></v-divider>
          </template>
        </v-list>
      </template>

      <template #footer>
        <v-pagination
          v-model="pageNumber"
          :length="totalPages"
          size="small"
          rounded
          color="primary"
          show-first-last-page
          total-visible="5"
        ></v-pagination>
      </template>
    </v-data-iterator>
  </h-detail-container>
</template>

<script setup lang="ts">
import type { DialogueDetailEntity, DialogueDetailConditions } from '@herodotus/api';

import { useEditFinish } from '@herodotus/framework';
import { moment } from '@herodotus/core';
import { useTable, useTableItem } from '@/composables/hooks';
import { API } from '@/configurations';

import { HUserAvatar } from './components';

defineOptions({ name: 'MessageInformationContent', components: { HUserAvatar } });

const { onFinish } = useEditFinish();
const { editedItem } = useTableItem(API.core.dialogueContact());
const { loading, pageNumber, pageSize, tableRows, totalPages, toEdit, findItems, conditions } = useTable<
  DialogueDetailConditions,
  DialogueDetailEntity
>(API.core.dialogueDetail(), 'MessageDialogueDetail', false, ['createTime'], 'ASC', false);

const receiverId = shallowRef('');
const receiverName = shallowRef('');
const receiverAvatar = shallowRef('');
const dialogueId = shallowRef('');

const humanUpdateTimte = (updateTime: Date | undefined) => {
  return moment(updateTime).fromNow();
};

const onSendMessage = () => {
  onFinish();
};

onMounted(() => {
  dialogueId.value = editedItem.value.dialogue.dialogueId;
  receiverId.value = editedItem.value.senderId;
  receiverName.value = editedItem.value.senderName;
  receiverAvatar.value = editedItem.value.senderAvatar;
  conditions.value.dialogueId = dialogueId.value;
});
</script>
