<template>
  <div>
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
        <v-btn @click="openDialog = !openDialog">新建存储桶</v-btn>
      </template>

      <template #item.doesPublic="{ item }">
        <div class="d-flex justify-center">
          <v-switch
            :model-value="item.doesPublic"
            :label="item.doesPublic ? '公开' : '私有'"
            density="comfortable"
            hide-details
            inset
            @update:model-value="onChangePolicy(item, $event)"
          ></v-switch>
        </div>
      </template>

      <template #item.versioning="{ value }">
        <v-chip v-if="value" density="compact" rounded="lg" color="purple" label>
          {{ getDictionaryItemDisplay('BucketVersioning', value) }}
        </v-chip>
      </template>

      <template #item.objectLockEnabled="{ item }">
        <h-column-boolean
          :value="item.objectLockEnabled"
          true-color="error"
          false-color="success"
          true-icon="mdi-lock"
          false-icon="mdi-lock-open"
          true-tooltip="已开启对象锁定"
          false-tooltip="未开启对象锁定"
        ></h-column-boolean>
      </template>

      <template #item.actions="{ item }">
        <h-action-delete-button v-if="!item.reserved" @click="onDeleteBucket(item[rowKey])"></h-action-delete-button>
      </template>
    </h-data-table>
    <h-create-bucket-dialog v-model="openDialog" @success="onRefresh"></h-create-bucket-dialog>
  </div>
</template>

<script setup lang="ts">
import type { HttpResult } from '@herodotus/core';
import type {
  BucketDetailsDomain,
  BucketDomain,
  BucketDetailsDomainProps,
  PutBucketPolicyResult,
  DeleteBucketResult,
} from '@herodotus/api';
import type { VDataTableHeaders } from '@/composables/declarations';

import { notify, toast } from '@herodotus/core';
import { useDictionary, useDateTime } from '@/composables/hooks';
import { API, PAGE_NAME } from '@/configurations';

import { HCreateBucketDialog } from './components';

defineOptions({ name: PAGE_NAME.OSS_BUCKET, components: { HCreateBucketDialog } });

const headers = ref([
  { key: 'bucketName', align: 'center', title: '存储桶名称' },
  { key: 'creationDate', align: 'center', title: '创建时间', value: (item) => defaultFormat(item.creationDate) },
  { key: 'doesPublic', align: 'center', title: '访问权限' },
  { key: 'versioning', align: 'center', title: '版本控制状态' },
  { key: 'objectLockEnabled', align: 'center', title: '对象锁定状态' },
  { key: 'actions', align: 'center', title: '操作' },
]) as Ref<Array<VDataTableHeaders>>;

const rowKey: BucketDetailsDomainProps = 'bucketName';

const { defaultFormat } = useDateTime();
const { getDictionaryItemDisplay } = useDictionary('BucketVersioning');

const pageNumber = shallowRef(1);
const pageSize = shallowRef(10);
const openDialog = shallowRef(false);

const loading = shallowRef(false);
const tableRows = ref([]) as Ref<Array<BucketDomain>>;

const fetchAllBuckets = () => {
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

const onRefresh = () => {
  fetchAllBuckets();
};

const onDeleteBucket = (bucketName: string) => {
  notify.standardDeleteNotify(() => {
    API.core
      .ossBucket()
      .deleteBucket({ bucketName: bucketName })
      .then((response) => {
        const result = response.data as HttpResult<DeleteBucketResult>;
        if (result.successful) {
          if (result.message) {
            toast.success(result.message);
          } else {
            toast.success('操作成功！');
          }

          fetchAllBuckets();
        } else {
          toast.warning('服务端异常！');
        }
      });
  });
};

const onChangePolicy = (item: BucketDetailsDomain, event: boolean) => {
  API.core
    .ossBucket()
    .setBucketPolicy({ bucketName: item.bucketName, doesPublic: event })
    .then((response) => {
      const result = response.data as HttpResult<PutBucketPolicyResult>;
      if (result.successful) {
        if (result.message) {
          toast.success(result.message);
        } else {
          toast.success('操作成功！');
        }
        fetchAllBuckets();
      } else {
        toast.warning('服务端异常！');
      }
    });
};
</script>
