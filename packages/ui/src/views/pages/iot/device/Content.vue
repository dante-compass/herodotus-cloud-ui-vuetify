<template>
  <h-center-form-layout :entity="editedItem" :title="title" :operation="operation" @save="onSave()">
    <h-product-select v-model="editedItem.product" label="所属产品" placeholder="请设置所属产品"></h-product-select>
    <h-text-field v-model="editedItem.deviceName" label="设备名称" placeholder="请输入设备名称"></h-text-field>
  </h-center-form-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import type { IotDeviceEntity } from '/@/lib/declarations';
import { api } from '/@/lib/utils';

import { useTableItem } from '/@/hooks';
import { HCenterFormLayout } from '/@/components';
import { HProductSelect } from '/@/composables/iot';

export default defineComponent({
  name: 'IotDeviceContent',

  components: {
    HCenterFormLayout,
    HProductSelect,
  },

  setup() {
    const { editedItem, operation, title, saveOrUpdate } = useTableItem<IotDeviceEntity>(api.iotDevice());

    const onSave = () => {
      saveOrUpdate();
    };

    return {
      editedItem,
      operation,
      title,
      onSave,
    };
  },
});
</script>
