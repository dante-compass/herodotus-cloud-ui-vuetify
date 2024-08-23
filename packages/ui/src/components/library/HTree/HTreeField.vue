<template>
  <q-input v-model="nodeName" :label="label" outlined clearable v-bind="$attrs">
    <q-popup-proxy v-model="isPopup">
      <q-card>
        <q-card-section>
          <q-tree
            ref="treeRef"
            :nodes="items"
            node-key="id"
            label-key="name"
            selected-color="primary"
            v-model:selected="selectedValue" />
        </q-card-section>
      </q-card>
    </q-popup-proxy>
  </q-input>
</template>

<script lang="ts">
import { defineComponent, ref, watch, Ref } from 'vue';

import type { QTree, Tree } from '/@/lib/declarations';

export default defineComponent({
  name: 'HTreeField',

  props: {
    items: { type: Array as PropType<Array<Tree>>, required: true },
    selected: { type: String },
    label: { type: String },
    value: { type: String },
  },

  emits: ['update:selected'],

  setup(props, { emit }) {
    const selectedValue = ref('');
    const treeRef = ref(null) as Ref<QTree | null>;
    const nodeName = ref('');
    const isPopup = ref(false);

    watch(
      () => props.selected,
      newValue => {
        if (newValue) {
          selectedValue.value = newValue;
        }
      },
      {
        immediate: true,
      },
    );

    watch(
      () => props.value,
      newValue => {
        if (newValue) {
          nodeName.value = props.value as string;
        }
      },
      {
        immediate: true,
      },
    );

    watch(
      () => selectedValue.value,
      (newValue: string) => {
        emit('update:selected', newValue);
        if (newValue) {
          const node = treeRef.value?.getNodeByKey(newValue);
          if (node) {
            nodeName.value = node.name;
            isPopup.value = false;
          }
        }
      },
      {
        immediate: true,
      },
    );

    const onClear = () => {
      nodeName.value = '';
      selectedValue.value = '';
    };

    return {
      selectedValue,
      nodeName,
      treeRef,
      isPopup,
    };
  },
});
</script>
