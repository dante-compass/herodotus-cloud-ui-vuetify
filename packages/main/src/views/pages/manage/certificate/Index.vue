<template>
  <h-data-table
    v-model:page-size="pageSize"
    v-model:page-number="pageNumber"
    v-model:total-pages="totalPages"
    v-model:total-items="totalItems"
    :headers="headers"
    :items="tableRows"
    :item-value="rowKey"
    :loading="loading"
    disable-sort
    @update:options="findItems"
  >
    <template #control>
      <v-btn @click="toCreate">新建证书</v-btn>
    </template>

    <template #item.keystoreName="{ item }">
      <h-action-button
        color="blue-grey"
        icon="mdi-download-box"
        tooltip="点击下载"
        @click="onDownload(item.bucketName, item.keystoreName)"
      ></h-action-button>
    </template>

    <template #item.pemName="{ item }">
      <h-action-button
        v-if="item.pemName"
        color="blue-grey"
        icon="mdi-download-box"
        tooltip="点击下载"
        @click="onDownload(item.bucketName, item.pemName)"
      ></h-action-button>
    </template>

    <template #item.distinguishedName="{ item }">
      <h-action-button
        color="info"
        icon="mdi-information-variant-box"
        :tooltip="item.distinguishedName"
      ></h-action-button>
    </template>

    <template #item.actions="{ item }">
      <h-action-delete-button
        v-if="!item.reserved"
        @click="deleteItemById(item[rowKey])"
      ></h-action-delete-button>
    </template>
  </h-data-table>
</template>

<script setup lang="ts">
import type {
  MgtCertificateEntity,
  MgtCertificateConditions,
  MgtCertificateProps,
} from '@herodotus/api';
import type { VDataTableHeaders } from '@/composables/declarations';

import { useTable } from '@/composables/hooks';
import { API, PAGE_NAME } from '@/configurations';

defineOptions({ name: PAGE_NAME.MGT_CERTIFICATE });

const headers = ref([
  { key: 'alias', align: 'center', label: '证书名称' },
  { key: 'certificateCategory', align: 'center', title: '证书类别' },
  { key: 'commonName', align: 'center', title: '公共名称' },
  { key: 'distinguishedName', align: 'center', title: '区分名' },
  { key: 'startTime', align: 'center', title: '开始时间' },
  { key: 'endTime', align: 'center', title: '结束时间' },
  { key: 'password', align: 'center', title: '密码' },
  { key: 'bucketName', align: 'center', title: '存储桶名称' },
  { key: 'keystoreName', align: 'center', title: 'KeyStore' },
  { key: 'pemName', field: 'pemName', align: 'center', title: 'PEM' },
  { key: 'description', align: 'center', title: '备注' },
  { key: 'status', align: 'center', title: '状态' },
  { key: 'actions', align: 'center', title: '操作' },
]) as Ref<Array<VDataTableHeaders>>;

const rowKey: MgtCertificateProps = 'certId';

const {
  loading,
  pageNumber,
  pageSize,
  tableRows,
  totalPages,
  totalItems,
  toCreate,
  deleteItemById,
  findItems,
} = useTable<MgtCertificateEntity, MgtCertificateConditions>(
  API.core.mgtCertificate(),
  PAGE_NAME.MGT_CERTIFICATE,
);

const onDownload = (bucketName: string, objectName: string) => {
  // download(bucketName, objectName);
};
</script>
