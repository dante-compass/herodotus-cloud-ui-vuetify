<template>
  <v-card>
    <v-card-text>
      <v-data-iterator
        v-model:items-per-page="pageSize"
        v-model:page="pageNumber"
        :items="tableRows"
        :loading="loading"
      >
        <template #default="{ items }">
          <v-list selectable>
            <template v-for="(item, i) in items" :key="i">
              <v-list-item @click="toEdit(item.raw)">
                <template #prepend>
                  <h-user-avatar :id="item.raw.senderId" :avatar="item.raw.senderAvatar"></h-user-avatar>
                </template>

                <v-list-item-title class="text-h6">
                  {{ item.raw.senderName }}
                </v-list-item-title>
                <v-list-item-subtitle class="text-high-emphasis opacity-100">
                  {{ item.raw.dialogue.latestNews }}
                </v-list-item-subtitle>
                <template #append>
                  <small class="mb-4 text-high-emphasis opacity-60">
                    {{ humanUpdateTimte(item.raw.dialogue.updateTime) }}
                  </small>
                </template>
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
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { DialogueContactEntity, DialogueContactConditions } from '@herodotus/api';

import { useAuthenticationStore } from '@herodotus/framework';
import { moment } from '@herodotus/core';
import { useTable } from '@/composables/hooks';
import { API } from '@/configurations';

import HUserAvatar from './HUserAvatar.vue';

defineOptions({ name: 'HMessageTable' });

const store = useAuthenticationStore();

const { loading, pageNumber, pageSize, tableRows, totalPages, toEdit, findItems, conditions } = useTable<
  DialogueContactConditions,
  DialogueContactEntity
>(API.core.dialogueContact(), 'MessageInformation', false, ['createTime'], 'ASC', false);

const humanUpdateTimte = (updateTime: Date | undefined) => {
  return moment(updateTime).fromNow();
};

onMounted(() => {
  conditions.value.receiverId = store.userId;
});
</script>
