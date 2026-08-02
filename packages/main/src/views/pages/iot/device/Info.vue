<template>
  <h-information-form-layout :title="title" :overlay="overlay" @cancel="onReturn">
    <template #header>
      <v-container>
        <v-row>
          <v-col cols="3">
            <h-label-item label="产品：" justify="start">
              {{ editedItem.product.productName }}
              <template #append>
                <h-icon-button icon="mdi-feature-search" tooltip="查看" variant="text"></h-icon-button>
              </template>
            </h-label-item>
          </v-col>
          <v-col cols="3">
            <h-label-item label="ProductKey：" justify="start">
              {{ editedItem.product.productKey }}
              <template #append>
                <h-icon-button
                  :disable="!isSupported"
                  :icon="copied ? 'mdi-checkbox-marked-circle-auto-outline' : 'mdi-content-copy'"
                  tooltip="复制"
                  variant="text"
                  @click="onCopy"
                ></h-icon-button>
              </template>
            </h-label-item>
          </v-col>
          <v-col cols="3">
            <h-label-item label="Device Secret：" justify="start">
              {{ visible ? editedItem.deviceSecret : '************' }}
              <template #append>
                <h-icon-button
                  :icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                  tooltip="显示"
                  variant="text"
                  @click="visible = !visible"
                ></h-icon-button>
              </template>
            </h-label-item>
          </v-col>

          <v-col></v-col>
        </v-row>
      </v-container>
    </template>
    <v-card flat>
      <v-card-item>
        <v-tabs v-model="tab" class="font-weight-bold">
          <v-tab text="设备信息" value="details"></v-tab>
          <v-tab text="物模型数据" value="specification"></v-tab>
          <v-tab text="设备影子" value="shadow"></v-tab>
        </v-tabs>

        <v-divider></v-divider>

        <v-tabs-window v-model="tab">
          <v-tabs-window-item value="details">
            <h-device-information-tab v-model="editedItem"></h-device-information-tab>
          </v-tabs-window-item>
          <v-tabs-window-item value="specification">
            <h-device-specification-tab v-model="editedItem"></h-device-specification-tab>
          </v-tabs-window-item>
          <v-tabs-window-item value="shadow">
            <h-device-shadow-tab v-model="editedItem"></h-device-shadow-tab>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card-item>
    </v-card>
  </h-information-form-layout>
</template>

<script setup lang="ts">
import type { DeviceEntity } from '@herodotus/api';

import { useClipboard } from '@vueuse/core';

import { API, PAGE_NAME } from '@/configurations';
import { useTableItem } from '@/composables/hooks';

import { HDeviceInformationTab, HDeviceSpecificationTab, HDeviceShadowTab } from './components';

defineOptions({
  name: PAGE_NAME.IOT_DEVICE_INFO,
  components: { HDeviceInformationTab, HDeviceSpecificationTab, HDeviceShadowTab },
});

const { copy, copied, isSupported } = useClipboard({ legacy: true });
const { editedItem, overlay, title, onReturn } = useTableItem<DeviceEntity>(
  API.core.iotDevice(),
  PAGE_NAME.IOT_DEVICE_INFO,
);

const visible = shallowRef(false);
const tab = shallowRef('details');
const isShowTable = shallowRef(false);

const onCopy = () => {
  const info = {
    productKey: editedItem.value.product.productKey,
    deviceName: editedItem.value.deviceName,
    deviceSecret: editedItem.value.deviceSecret,
  };

  copy(JSON.stringify(info));
};

onMounted(() => {});
</script>
