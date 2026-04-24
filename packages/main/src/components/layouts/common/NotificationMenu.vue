<template>
  <v-menu eager location="bottom end" :close-on-content-click="false">
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props" color="medium-emphasis">
        <v-badge v-if="totalCount !== 0" location="top right" color="error" :content="totalCount">
          <v-icon icon="mdi-bell-outline"></v-icon>
        </v-badge>
        <v-icon v-else icon="mdi-bell-outline"></v-icon>
      </v-btn>
    </template>

    <v-card border rounded="lg" width="450">
      <v-tabs v-model="tab">
        <v-tab text="私信" value="dialogue">
          <template #prepend>
            <v-badge v-if="dialogueCount !== 0" location="top right" color="error" :content="dialogueCount">
              <v-icon icon="mdi-lock"></v-icon>
            </v-badge>
            <v-icon v-else icon="mdi-lock"></v-icon>
          </template>
        </v-tab>
        <v-tab prepend-icon="" text="公告" value="announcement">
          <template #prepend>
            <v-badge v-if="announcementCount !== 0" location="top right" color="error" :content="announcementCount">
              <v-icon icon="mdi-access-point"></v-icon>
            </v-badge>
            <v-icon v-else icon="mdi-access-point"></v-icon>
          </template>
        </v-tab>
      </v-tabs>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="dialogue">
          <notification-dialogue></notification-dialogue>
        </v-tabs-window-item>
        <v-tabs-window-item value="announcement">
          <notification-announcement></notification-announcement>
        </v-tabs-window-item>
      </v-tabs-window>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn variant="text" text="全部已读" @click="onSetAllRead()"></v-btn>
        <v-btn variant="text" text="查看全部" to="/message"></v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
import NotificationDialogue from './NotificationDialogue.vue';
import NotificationAnnouncement from './NotificationAnnouncement.vue';

import { useWebSocketMessage, useNotifications } from '@/composables/hooks';

defineOptions({
  name: 'NotificationMenu',
  components: { NotificationDialogue, NotificationAnnouncement },
});

const tab = shallowRef('dialogue');

const { totalCount, dialogueCount, announcementCount, setAllRead } = useNotifications();
const { connect, disconnect } = useWebSocketMessage();

onMounted(() => {
  connect();
});

onUnmounted(() => {
  disconnect();
});

const onSetAllRead = () => {
  setAllRead();
};
</script>
