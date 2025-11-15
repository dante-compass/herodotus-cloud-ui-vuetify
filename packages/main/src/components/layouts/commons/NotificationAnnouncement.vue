<template>
  <v-list v-if="hasAnnouncement" lines="two" density="compact" selectable>
    <v-list-item
      v-for="(item, index) in items"
      :key="index"
      rounded="lg"
      :title="item.senderName"
      :subtitle="item.content"
    >
      <template #append>
        <v-list-item-action class="flex-column align-end">
          <small class="mb-4 text-high-emphasis opacity-60">
            {{ convertDate(item.createTime as Date) }}
          </small>
        </v-list-item-action>
      </template>
    </v-list-item>
  </v-list>
  <v-empty-state v-else icon="mdi-file-image-outline" title="暂没有新消息"></v-empty-state>
</template>

<script setup lang="ts">
import { NotificationCategoryEnum } from '@herodotus/api';
import { useNotifications } from '@/composables/hooks';

defineOptions({ name: 'NotificationAnnouncement' });

const { items, hasAnnouncement, convertDate } = useNotifications(
  NotificationCategoryEnum.ANNOUNCEMENT,
);
</script>
