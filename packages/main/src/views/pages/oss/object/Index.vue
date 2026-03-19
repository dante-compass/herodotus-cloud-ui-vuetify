<template>
  <v-container fluid class="pa-0">
    <v-row>
      <v-col xl="2" lg="2" md="4" sm="6" xs="12">
        <h-oss-bucket-list v-model="currentBucketName" v-model:version="version"></h-oss-bucket-list>
      </v-col>
      <v-col xl="10" lg="10" md="8" sm="6" xs="12">
        <h-oss-object-list v-model="currentBucketName" :version="version"></h-oss-object-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { PAGE_NAME } from '@/configurations';

import { HOssBucketList, HOssObjectList } from './components';

defineOptions({ name: PAGE_NAME.OSS_BUCKET, components: { HOssBucketList, HOssObjectList } });

const currentBucketName = shallowRef('');
const version = shallowRef(0);
</script>
