<template>
  <v-card rounded="xl">
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
      <v-list-item v-for="(item, i) in tableRows" :key="i" rounded="xl" @click="onSelected(item)">
        <template #prepend>
          <v-icon icon="mdi-bucket-outline"></v-icon>
        </template>

        <v-list-item-title v-text="item.bucketName"></v-list-item-title>
        <template #append>
          <v-icon color="grey" icon="mdi-chevron-right"></v-icon>
        </template>
      </v-list-item>
    </v-list>
    <v-overlay v-model="loading" class="align-center justify-center" contained>
      <v-progress-circular color="primary" indeterminate></v-progress-circular>
    </v-overlay>
  </v-card>
</template>

<script setup lang="ts">
import type { BucketDomain } from '@herodotus/api';

import { useOssBucket } from '@/composables/hooks';

defineOptions({ name: 'HOssBucketList' });

const { loading, tableRows, fetchAllBuckets } = useOssBucket();

const selected = defineModel<string>();

const onSelected = (item: BucketDomain) => {
  if (item) {
    selected.value = item.bucketName;
  }
};

onMounted(() => {
  fetchAllBuckets();
});
</script>
