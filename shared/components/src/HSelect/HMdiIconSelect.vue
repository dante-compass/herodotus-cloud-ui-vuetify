<template>
  <v-autocomplete
    v-model="selection"
    v-model:search="search"
    :items="icons"
    :loading="loading"
    clearable
    single-line
    v-bind="$attrs"
  >
    <template #prepend-inner>
      <v-expand-x-transition>
        <v-icon v-if="selection" :icon="selection" start />
      </v-expand-x-transition>
    </template>
    <template #item="{ props, item }">
      <v-list-item v-bind="props" :prepend-icon="item.value" :title="item.value"></v-list-item>
    </template>
  </v-autocomplete>
</template>

<script setup lang="ts">
import { shallowRef, onMounted, watch } from 'vue';
import { isEmpty, debounce } from 'lodash-es';
import { useMdiIconStore } from '@/lib/stores';

import { VAutocomplete, VExpandXTransition, VListItem, VIcon } from 'vuetify/components';

defineOptions({
  name: 'HMdiIconSelect',
  components: { VAutocomplete, VExpandXTransition, VListItem, VIcon },
});

const selection = defineModel<string | null | undefined>({
  required: true,
});

const icons = shallowRef<string[]>([]);
const loading = shallowRef(false);
const search = shallowRef('');

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
