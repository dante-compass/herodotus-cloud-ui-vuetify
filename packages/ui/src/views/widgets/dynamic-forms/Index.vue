<template>
  <h-dynamic-forms
    container
    title="Dynamic Forms"
    :instance="instance"
    :item="editedItem"
    @close="onFinish"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { CONSTANTS } from '@/configurations';
import { API } from '@/configurations';

import { useEditFinish, useBaseTableItem } from '@/hooks';

export default defineComponent({
  name: CONSTANTS.ComponentName.WIDGETS_DYNAMIC_FORM,

  setup(props) {
    const instance = API.bpmnStorage;
    const { onFinish } = useEditFinish();
    const { editedItem } = useBaseTableItem();

    return {
      editedItem,
      instance,
      onFinish,
    };
  },
});
</script>
