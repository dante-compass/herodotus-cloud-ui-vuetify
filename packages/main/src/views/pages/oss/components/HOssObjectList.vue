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
  >
    <template #control>
      <v-btn>新建</v-btn>
    </template>

    <template #item.lastModified="{ value }">
      {{ defaultFormat(value) }}
    </template>

    <template #item.actions="{ item }">
      <!-- <h-action-button
        color="amber"
        icon="mdi-shield-edit"
        tooltip="配置角色"
        @click="toAuthorize(item)"
      ></h-action-button>
      <h-action-edit-button @click="toEdit(item)"></h-action-edit-button> -->
      <!-- <h-action-delete-button v-if="!item.reserved" @click="remove(item[rowKey])"></h-action-delete-button> -->
    </template>
  </h-data-table>
</template>

<script setup lang="ts">
import type { ObjectDomain, ObjectDomainProps, ObjectDomainConditions, DeleteBucketResult } from '@herodotus/api';
import type { VDataTableHeaders } from '@/composables/declarations';

import { notify, toast } from '@herodotus/core';
import { useBaseTable, useDateTime } from '@/composables/hooks';
import { API, PAGE_NAME } from '@/configurations';

defineOptions({ name: PAGE_NAME.OSS_BUCKET });

interface Props {
  folderName?: string;
}

const props = defineProps<Props>();

const bucketName = defineModel<string>({
  required: true,
});

const headers = ref([
  { key: 'objectName', align: 'center', title: '文件(Object)名' },
  { key: 'eTag', align: 'center', title: 'ETAG' },
  { key: 'size', align: 'center', title: '文件(Object)大小' },
  { key: 'lastModified', align: 'center', title: '最后更新时间' },
  { key: 'actions', align: 'center', title: '操作' },
]) as Ref<Array<VDataTableHeaders>>;

const rowKey: ObjectDomainProps = 'objectName';

const { loading, tableRows, totalPages, totalItems, toEdit, toAuthorize, showLoading, hideLoading } = useBaseTable<
  ObjectDomainConditions,
  ObjectDomain
>(PAGE_NAME.OSS_BUCKET);
const { defaultFormat } = useDateTime();

const pageNumber = shallowRef(1);
const pageSize = shallowRef(10);

const fetchObjects = (bucketName: string, folderName = '') => {
  showLoading();
  API.core
    .ossObject()
    .listObjectsV2({ bucketName: bucketName, prefix: folderName })
    .then((result) => {
      const data = result.data.contents;
      tableRows.value = data ? data : [];
      hideLoading();
    })
    .catch(() => {
      hideLoading();
    });
};

/**
 * 查询数据操作
 */
const onFetchObjects = () => {
  fetchObjects(bucketName.value, props.folderName);
};

watch(bucketName, (newValue) => {
  fetchObjects(newValue, props.folderName);
});

onMounted(() => {
  onFetchObjects();
});
</script>
