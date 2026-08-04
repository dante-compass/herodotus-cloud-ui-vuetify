<template>
  <h-dialog v-model="openDialog" title="调用设备服务" @confirm="onSave">
    <v-form ref="deviceServiceForm">
      <h-service-control v-model="entity" :arguments="arguments"></h-service-control>
    </v-form>
  </h-dialog>
</template>

<script setup lang="ts">
import type { TslArgumentEntity } from '@herodotus/api';

import { HServiceControl } from './tsl';

defineOptions({ name: 'HDeviceServiceDialog', components: { HServiceControl } });

interface Props {
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
  }
};
</script>
