<template>
  <h-data-table
    v-model:page-size="pageSize"
    v-model:page-number="pageNumber"
    :headers="headers"
    :items="tableRows"
    :item-value="rowKey"
    :loading="loading"
    disable-sort
    select-strategy="single"
    @update:options="fetchAllBuckets"
  >
    <template #control>
      <v-btn>新建</v-btn>
    </template>

    <template #item.actions="{ item }">
      <!-- <h-action-button
        color="amber"
        icon="mdi-shield-edit"
        tooltip="配置角色"
        @click="toAuthorize(item)"
      ></h-action-button>
      <h-action-edit-button @click="toEdit(item)"></h-action-edit-button> -->
      <h-action-delete-button v-if="!item.reserved" @click="remove(item[rowKey])"></h-action-delete-button>
    </template>
  </h-data-table>
</template>

<script setup lang="ts">
import type { HttpResult } from '@herodotus/core';
import type { BucketDomain, BucketDomainProps, BucketDomainConditions, DeleteBucketResult } from '@herodotus/api';
import type { VDataTableHeaders } from '@/composables/declarations';

import { notify, toast } from '@herodotus/core';
import { useBaseTable, useOssBucket } from '@/composables/hooks';
import { API, PAGE_NAME } from '@/configurations';

defineOptions({ name: PAGE_NAME.OSS_BUCKET });

const headers = ref([
  { key: 'bucketName', align: 'center', title: '存储桶名称' },
  { key: 'creationDate', align: 'center', title: '创建时间' },
  { key: 'actions', align: 'center', title: '操作' },
]) as Ref<Array<VDataTableHeaders>>;

const rowKey: BucketDomainProps = 'bucketName';

const { totalPages, totalItems, toEdit, toAuthorize, hideLoading } = useBaseTable<BucketDomainConditions, BucketDomain>(
  PAGE_NAME.OSS_BUCKET,
);

const { loading, tableRows, fetchAllBuckets } = useOssBucket();

const pageNumber = shallowRef(1);
const pageSize = shallowRef(10);

const remove = (bucketName: string) => {
  notify.standardDeleteNotify(() => {
    API.core
      .ossBucket()
      .deleteBucket({ bucketName: bucketName })
      .then((response) => {
        const result = response.data as HttpResult<DeleteBucketResult>;
        if (result.message) {
          toast.success(result.message);
        } else {
          toast.success('删除成功');
        }

        fetchAllBuckets();
      })
      .catch(() => {
        toast.error('删除失败');
      });
  });
};
</script>
