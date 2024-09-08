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
            v-model:selected="selectedValue"></q-tree>
        </q-card-section>
      </q-card>
    </q-popup-proxy>
  </q-input>
</template>

<script lang="ts">
import { defineComponent, ref, watch, Ref, PropType, onMounted } from 'vue';

import type { QTree, Tree } from '/@/lib/declarations';

import { lodash } from '/@/lib/utils';

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

    const treeToArray = (tree: Array<Tree>) => {
      let result: Array<Tree> = [];
      for (const item of tree) {
        const { children, ...i } = item;
        if (children && children.length) {
          result = result.concat(treeToArray(children));
        }
        result.push(i);
      }
      return result;
    };

    watch(
      () => props.items,
      newValue => {
        if (newValue) {
          if (!lodash.isEmpty(newValue)) {
            const result = treeToArray(props.items);
            const item = lodash.find(result, i => i.id == props.selected);
            nodeName.value = item?.name as string;
          }
        }
      },
      {
        immediate: true,
      },
    );

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

    return {
      selectedValue,
      nodeName,
      treeRef,
      isPopup,
    };
  },
});
</script>
