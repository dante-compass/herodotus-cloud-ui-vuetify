<template>
  <v-text-field
    ref="vTextFieldRef"
    v-model="nodeName"
    v-model:focused="isFocused"
    :class="[
      'v-combobox',
      {
        'v-combobox--active-menu': menu,
      },
    ]"
    @mousedown:control="onMousedownControl"
    @after-leave="onAfterLeave"
    v-bind="$attrs"
  >
    <v-menu
      v-model="menu"
      activator="parent"
      content-class="v-combobox__content"
      :open-on-click="false"
      :close-on-content-click="false"
      max-height="310"
    >
      <v-treeview
        v-model:selected="selectedNodes"
        v-model:activated="selectedNodes"
        :items="items"
        item-value="id"
        item-title="name"
        activatable
        selectable
        select-strategy="single-independent"
        separate-roots
        @mousedown="(e: MouseEvent) => e.preventDefault()"
      ></v-treeview>
    </v-menu>

    <template #append-inner>
      <v-icon
        icon="mdi-menu-down"
        @mousedown="onMousedownMenuIcon"
        @click="noop"
        class="v-combobox__menu-icon"
        tabindex="-1"
      ></v-icon>
    </template>
  </v-text-field>
</template>

<script setup lang="ts">
import type { Tree } from '@herodotus/core';

import { ref, shallowRef, watch } from 'vue';
import { isEmpty, find } from 'lodash-es';
import { VMenu, VIcon, VTreeview, VTextField } from 'vuetify/components';

defineOptions({ name: 'HTreeSelect', components: { VMenu, VIcon, VTreeview, VTextField } });

interface Props {
  items: Tree[];
}

const props = defineProps<Props>();

const selectedId = defineModel<string>({
  required: true,
});

const vTextFieldRef = ref();

const menu = shallowRef(false);
const isFocused = shallowRef(false);
const treeNodes = ref<Tree[]>([]);
const selectedNodes = ref<string[]>([]);
const nodeName = shallowRef('');

const onMousedownControl = () => {
  menu.value = true;
};
const onMousedownMenuIcon = (e: MouseEvent) => {
  menu.value = !menu.value;
};

const onAfterLeave = () => {
  if (isFocused.value) {
    vTextFieldRef.value?.focus();
  }
};
/**
 * 什么都不做，增加 @click 可以让鼠标变成手指
 */
const noop = () => {};

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

const findNode = (id: string): void => {
  const node = find(treeNodes.value, (i) => i.id == id);
  if (node) {
    nodeName.value = node.name;
  }
};

const init = (tree: Array<Tree>) => {
  if (!isEmpty(tree) && isEmpty(treeNodes.value)) {
    treeNodes.value = treeToArray(tree);
  }
};

watch(
  () => props.items,
  (newValue) => {
    if (!isEmpty(newValue)) {
      init(newValue);
    }
  },
  {
    immediate: true,
  },
);

watch(
  selectedId,
  (newValue) => {
    if (newValue) {
      findNode(newValue);
      selectedNodes.value = [newValue];
    }
  },
  {
    immediate: true,
  },
);

watch(isFocused, (newValue, oldValue) => {
  if (newValue || newValue === oldValue) return;

  menu.value = false;
});
</script>
