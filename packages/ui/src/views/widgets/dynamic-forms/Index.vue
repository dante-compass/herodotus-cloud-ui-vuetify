<template>
  <h-dynamic-forms container title="Dynamic Forms" :instance="instance" :item="editedItem" @close="onFinish" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { Constants } from '/@/lib/definitions';
import { FormDesignerInstance } from '/@/lib/utils';

import { useEditFinish, useBaseTableItem } from '/@/hooks';

export default defineComponent({
  name: Constants.ComponentName.WIDGETS_DYNAMIC_FORM,

  setup(props) {
    const instance = FormDesignerInstance;
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
