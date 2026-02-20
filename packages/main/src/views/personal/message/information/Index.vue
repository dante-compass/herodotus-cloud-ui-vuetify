<template>
  <div>
    <v-card class="mb-4">
      <v-card-item>
        <v-tabs v-model="tab" class="font-weight-bold">
          <v-tab prepend-icon="mdi-message-bulleted" text="私信" value="private"></v-tab>
          <v-tab prepend-icon="mdi-message-badge" text="@我" value="notice"></v-tab>
          <v-tab prepend-icon="mdi-bullhorn-variant" text="公告" value="public"></v-tab>
        </v-tabs>
      </v-card-item>
    </v-card>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item value="private" class="py-2">
        <h-message-table></h-message-table>
      </v-tabs-window-item>
      <v-tabs-window-item value="notice">
        <v-card flat>
          <v-card-text>Lorem ipsum dolor sit amet consectetur adipisicing elit.</v-card-text>
        </v-card>
      </v-tabs-window-item>
      <v-tabs-window-item value="public">
        <v-card flat>
          <v-card-text>Lorem ipsum dolor sit amet consectetur adipisicing elit.</v-card-text>
        </v-card>
      </v-tabs-window-item>
    </v-tabs-window>
  </div>
</template>

<script setup lang="ts">
import { PAGE_NAME } from '@/configurations';

import { HMessageTable } from './components';

defineOptions({ name: PAGE_NAME.MESSAGE_INFORMATION, components: { HMessageTable } });

const tab = shallowRef('private');
</script>
