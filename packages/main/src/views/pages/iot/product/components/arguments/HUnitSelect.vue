<template>
  <v-autocomplete
    v-model="model"
    v-model:search="search"
    :items="items"
    :loading="loading"
    item-title="name"
    item-value="id"
    chips
    closable-chips
    placeholder="请选择单位"
    v-bind="$attrs"
  >
    <template #chip="{ props, item }">
      <v-chip v-bind="props" :text="displayContent(item)"></v-chip>
    </template>

    <template #item="{ props, item }">
      <v-list-item v-bind="props" :title="displayContent(item)"></v-list-item>
    </template>
  </v-autocomplete>
</template>

<script setup lang="ts">
import type { TslUnitEntity } from "@herodotus/api";

import { isEmpty, debounce } from "lodash-es";
import { useIotTslUnitStore } from "./unit";

defineOptions({ name: "HUnitSelect" });

const model = defineModel<TslUnitEntity | null | undefined>({
  required: true,
});

const items = shallowRef<TslUnitEntity[]>([]);
const loading = shallowRef(false);
const search = shallowRef("");

const store = useIotTslUnitStore();

const displayContent = (item: TslUnitEntity) => {
  return item.name + " - " + item.symbol;
};

// 防抖搜索，适合实时搜索
const debouncedSearch = debounce((query: string, callback: (results: TslUnitEntity[]) => void) => {
  loading.value = true;
  const results = store.search(query);
  console.log("----------", results);
  callback(results);
  loading.value = false;
}, 500);

onBeforeMount(async () => {
  loading.value = true;
  items.value = store.getAllItems;
  if (isEmpty(items.value)) {
    await store.fetchAllUnit();
  }

  loading.value = false;

  nextTick(() => {
    if (isEmpty(items.value)) {
      items.value = store.getAllItems;
    }
  });
});

watch(search, (query) => {
  if (isEmpty(query)) {
    items.value = store.getAllItems;
  } else {
    debouncedSearch(query, (result) => {
      items.value = result;
    });
  }
});
</script>
