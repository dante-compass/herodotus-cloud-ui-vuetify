<template>
  <div>
    <v-card class="mb-4">
      <v-card-item>
        <v-tabs v-model="tab" class="font-weight-bold">
          <v-tab text="基本信息" value="configuration"></v-tab>
        </v-tabs>
      </v-card-item>
    </v-card>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item value="configuration">
        <v-card flat title="基本信息">
          <v-card-text>Lorem ipsum dolor sit amet consectetur adipisicing elit.</v-card-text>
        </v-card>
      </v-tabs-window-item>
    </v-tabs-window>
  </div>
</template>

<script setup lang="ts">
import { PAGE_NAME } from '@/configurations';

defineOptions({ name: PAGE_NAME.MESSAGE_SETTING });

const tab = shallowRef('configuration');
</script>
