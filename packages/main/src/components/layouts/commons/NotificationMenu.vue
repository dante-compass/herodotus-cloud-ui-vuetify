<template>
  <v-menu eager location="bottom end">
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props">
        <v-badge v-if="totalCount !== 0" location="top right" color="error" :content="totalCount">
          <v-icon icon="mdi-bel"></v-icon>
        </v-badge>
        <v-icon else icon="mdi-bel"></v-icon>
      </v-btn>
    </template>

    <v-card border rounded="lg" width="450">
      <v-tabs v-model="tab">
        <v-tab prepend-icon="mdi-lock" text="私信" value="dialogue">
          <v-badge
            v-if="dialogueCount !== 0"
            location="top right"
            color="error"
            :content="dialogueCount"
          ></v-badge>
        </v-tab>
        <v-tab prepend-icon="mdi-access-point" text="公告" value="announcement">
          <v-badge
            v-if="announcementCount !== 0"
            location="top right"
            color="error"
            :content="announcementCount"
          ></v-badge>
        </v-tab>
      </v-tabs>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="dialogue">
          <v-card>
            <notification-dialogue></notification-dialogue>
          </v-card>
        </v-tabs-window-item>
        <v-tabs-window-item value="announcement">
          <v-card>
            <notification-announcement></notification-announcement>
          </v-card>
        </v-tabs-window-item>
      </v-tabs-window>

      <v-card-actions>
        <v-btn text="全部已读" @click="onSetAllRead()"></v-btn>
        <v-btn text="查看全部" to="/message"></v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
import NotificationAnnouncement from './NotificationAnnouncement.vue';
import NotificationDialogue from './NotificationDialogue.vue';

import { useNotificationStore } from '@/composables/stores';
import { useWebSocketMessage } from '@/composables/hooks';

defineOptions({
  name: 'NotificationMenu',
  components: { NotificationAnnouncement, NotificationDialogue },
});

const tab = shallowRef('dialogue');

const notificationStore = useNotificationStore();
const { totalCount, dialogueCount, announcementCount } = storeToRefs(notificationStore);
const { connect, disconnect } = useWebSocketMessage();

onMounted(() => {
  connect();
});

onUnmounted(() => {
  disconnect();
});

const onSetAllRead = () => {
  notificationStore.setAllRead();
};
</script>
