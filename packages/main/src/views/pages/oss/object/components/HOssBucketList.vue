<template>
  <v-card :disabled="loading" :loading="loading" rounded="xl">
    <template #loader="{ isActive }">
      <v-progress-linear :active="isActive" height="4" indeterminate></v-progress-linear>
    </template>
    <v-list
      density="compact"
      activatable
      active-strategy="single-leaf"
      selectable
      select-strategy="single-leaf"
      nav
      class="mx-2"
    >
      <v-list-subheader>存储桶列表：</v-list-subheader>
      <v-list-item v-for="(item, i) in tableRows" :key="i" rounded="xl" @click="onSelectItem(item)">
        <template #prepend>
          <v-icon icon="mdi-bucket-outline"></v-icon>
        </template>

        <v-list-item-title v-text="item.bucketName"></v-list-item-title>
        <template #append>
          <v-icon color="grey" icon="mdi-chevron-right"></v-icon>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup lang="ts">
import type { BucketDomain } from '@herodotus/api';

import { API } from '@/configurations';

defineOptions({ name: 'HOssBucketList' });

const selected = defineModel<string>();
const key = defineModel<number>('version', {
  default: 0,
});

const loading = shallowRef(false);
const tableRows = ref([]) as Ref<Array<BucketDomain>>;

const fetchAllBuckets = () => {
  loading.value = true;
  API.core
    .ossBucket()
    .listBuckets()
    .then((result) => {
      const data = result.data.buckets as Array<BucketDomain>;
      tableRows.value = data;
      loading.value = false;
    })
    .catch(() => {
      loading.value = false;
    });
};

const onSelectItem = (item: BucketDomain) => {
  if (item) {
    selected.value = item.bucketName;
  }
  key.value = +new Date();
};

onMounted(() => {
  fetchAllBuckets();
});
</script>
