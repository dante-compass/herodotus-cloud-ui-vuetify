<template>
  <h-information-form-layout :title="title" :overlay="overlay" @cancel="onReturn">
    <v-card flat>
      <v-card-item>
        <v-tabs v-model="tab" class="font-weight-bold">
          <v-tab text="设备信息" value="details"></v-tab>
          <v-tab text="设备功能" value="function"></v-tab>
        </v-tabs>
      </v-card-item>

      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="details">设备信息：</v-tabs-window-item>
        <v-tabs-window-item value="function">设备功能：</v-tabs-window-item>
      </v-tabs-window>
    </v-card>
  </h-information-form-layout>
</template>

<script setup lang="ts">
import type { DeviceEntity } from '@herodotus/api';

import { API, PAGE_NAME } from '@/configurations';
import { useTableItem } from '@/composables/hooks';

defineOptions({ name: PAGE_NAME.IOT_DEVICE_INFO });

const tab = shallowRef('details');

const { editedItem, overlay, title, onReturn } = useTableItem<DeviceEntity>(
  API.core.iotDevice(),
  PAGE_NAME.IOT_DEVICE_INFO,
);

const visible = shallowRef(false);
const isShowTable = shallowRef(false);

onMounted(() => {});
</script>
