<template>
  <v-list border density="compact" :lines="false" rounded class="py-0">
    <v-list-item v-for="(item, i) in entity" :key="i">
      <v-list-item-subtitle v-text="' 参数名称：' + item.name"></v-list-item-subtitle>
      <template #append>
        <v-btn variant="text" text="删除" @click="onDelete(item)" />
      </template>
    </v-list-item>
  </v-list>
</template>

<script setup lang="ts">
import type { Specification, Specs } from "@herodotus/api";

import { remove } from "lodash-es";

defineOptions({ name: "HStructParamList" });

const entity = defineModel<Array<Specification<Specs>>>({
  default: () => [],
});

const onDelete = (item: Specification<Specs>) => {
  remove(entity.value, (i) => {
    return i.identifier === item.identifier;
  });
};
</script>
