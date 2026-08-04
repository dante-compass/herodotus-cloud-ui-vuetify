<template>
  <h-dialog v-model="openDialog" title="调用设备服务" max-width="40%" @confirm="onSave" @cancel="onCancel">
    <v-form ref="deviceServiceForm">
      <h-service-control v-model="entity" :arguments="arguments"></h-service-control>
    </v-form>
  </h-dialog>
</template>

<script setup lang="ts">
import type { TslArgumentEntity } from '@herodotus/api';

import { toast } from '@herodotus/core';
import { API } from '@/configurations';

import { HServiceControl } from './tsl';

defineOptions({ name: 'HDeviceServiceDialog', components: { HServiceControl } });

interface Props {
  productKey: string;
  deviceName: string;
  identifier?: string;
  arguments: TslArgumentEntity[];
}

const props = defineProps<Props>();

const openDialog = defineModel<boolean>({
  required: true,
});

const primaryAddingForm = ref();
const entity = ref({}) as Ref<Record<string, any>>;

const onSave = async () => {
  const { valid } = await primaryAddingForm.value.validate();
  if (valid) {
    if (props.productKey && props.deviceName) {
      if (props.identifier) {
        if (props.identifier === 'set') {
          API.core
            .iotTslFunction()
            .set({ productKey: props.productKey, deviceName: props.deviceName, params: entity.value })
            .then(() => {
              toast.success('发送请求成功！');
            })
            .catch(() => {
              toast.error('发送请求失败！');
            });
        } else {
          API.core
            .iotTslFunction()
            .invoke({
              productKey: props.productKey,
              deviceName: props.deviceName,
              identifier: props.identifier,
              params: entity.value,
            })
            .then(() => {
              toast.success('发送请求成功！');
            })
            .catch(() => {
              toast.error('发送请求失败！');
            });
        }
      }
    }
  }
};

const onCancel = () => {
  entity.value = {};
  openDialog.value = false;
};
</script>
