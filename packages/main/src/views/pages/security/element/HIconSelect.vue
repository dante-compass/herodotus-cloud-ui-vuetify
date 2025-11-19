<template>
  <v-autocomplete
    v-model="selection"
    v-model:search="search"
    :items="icons"
    :loading="loading"
    clearable
    single-line
  >
    <template #prepend-inner>
      <v-expand-x-transition>
        <v-icon v-if="selection" :icon="selection" start color="primary" />
      </v-expand-x-transition>
    </template>
    <template #item="{ props, item }">
      <v-list-item v-bind="props" :prepend-icon="item.value" :title="item.value"></v-list-item>
    </template>
  </v-autocomplete>
</template>

<script setup lang="ts">
import { isEmpty } from 'lodash-es';
import { useMdiIconStore } from './mdiicon';
import { debounce } from 'lodash-es';

const loading = shallowRef(false);
const selection = shallowRef();
const search = shallowRef('');

const icons = shallowRef<string[]>([]);

const store = useMdiIconStore();

// 防抖搜索，适合实时搜索
const debouncedSearch = debounce((query: string, callback: (results: string[]) => void) => {
  loading.value = true;
  const results = store.search(query);
  callback(results);
  loading.value = false;
}, 500);

onMounted(() => {
  loading.value = true;
  store.initialize();
  icons.value = store.getAllIcons;
  loading.value = false;
});

watch(search, (query) => {
  if (isEmpty(query)) {
    icons.value = store.getAllIcons;
  } else {
    debouncedSearch(query, (result) => {
      icons.value = result;
    });
  }
});
</script>
