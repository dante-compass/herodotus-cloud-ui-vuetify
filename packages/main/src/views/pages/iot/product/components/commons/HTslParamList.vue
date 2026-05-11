<template>
  <v-list :border="showBorder" density="compact" :lines="false" rounded class="py-0">
    <v-list-item v-for="(item, i) in model" :key="i">
      <v-list-item-subtitle v-text="'参数名称：' + item.name"></v-list-item-subtitle>
      <template #append>
        <h-tsl-button text="删除" @click="onDelete(item)"></h-tsl-button>
      </template>
    </v-list-item>
  </v-list>
</template>

<script setup lang="ts" generic="T extends Characteristic">
import type { Characteristic } from "@herodotus/api";

import { remove, isEmpty } from "lodash-es";

import { HTslButton } from "../commons";

defineOptions({ name: "HTslParamList", components: { HTslButton } });

const model = defineModel<Array<T>>({
  default: () => [],
});

const showBorder = computed(() => {
  return !isEmpty(model.value);
});

const onDelete = (item: T) => {
  remove(model.value, (i) => {
    return i.identifier === item.identifier;
  });
};
</script>
