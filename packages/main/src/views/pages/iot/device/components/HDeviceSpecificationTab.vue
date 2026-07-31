<template>
  <v-card flat>
    <v-card-item>
      <v-tabs v-model="tab" class="font-weight-bold">
        <v-tab text="运行状态" value="properties"></v-tab>
        <v-tab text="事件管理" value="events"></v-tab>
        <v-tab text="服务调用" value="services"></v-tab>
      </v-tabs>

      <v-divider></v-divider>

      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="properties">
          <h-specification-property-tab
            :product-id="entity.product.id"
            :device-id="entity.id"
          ></h-specification-property-tab>
        </v-tabs-window-item>
        <v-tabs-window-item value="events">
          <h-specification-event-tab :product-id="entity.product.id" :device-id="entity.id"></h-specification-event-tab>
        </v-tabs-window-item>
        <v-tabs-window-item value="services">
          <h-specification-service-tab
            :product-id="entity.product.id"
            :device-id="entity.id"
          ></h-specification-service-tab>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card-item>
  </v-card>
</template>

<script setup lang="ts">
import type { DeviceEntity } from '@herodotus/api';

import HSpecificationPropertyTab from './HSpecificationPropertyTab.vue';
import HSpecificationEventTab from './HSpecificationEventTab.vue';
import HSpecificationServiceTab from './HSpecificationServiceTab.vue';

defineOptions({
  name: 'HDeviceSpecificationTab',
  components: { HSpecificationPropertyTab, HSpecificationEventTab, HSpecificationServiceTab },
});

const entity = defineModel<DeviceEntity>({
  default: () => ({}) as DeviceEntity,
  required: true,
});

const tab = shallowRef('properties');
</script>
