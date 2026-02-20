<template>
  <h-full-width-form-layout title="证书文件管理">
    <h-data-table
      v-model:page-size="pageSize"
      v-model:page-number="pageNumber"
      v-model:total-pages="totalPages"
      v-model:total-items="totalItems"
      :headers="headers"
      :items="tableRows"
      :item-value="rowKey"
      :loading="loading"
      select-strategy="single"
      disable-sort
      flat
      @update:options="findItems"
    >
      <template #item.certificateCategory="{ item }">
        <v-chip density="compact" rounded="lg" color="orange" label>
          {{ getDictionaryItemDisplay('CertificateCategory', item.certificateCategory) }}
        </v-chip>
      </template>

      <template #item.certificateFileCategory="{ item }">
        <v-chip density="compact" rounded="lg" color="cyan" label>
          {{ getDictionaryItemDisplay('CertificateFileCategory', item.certificateFileCategory) }}
        </v-chip>
      </template>

      <template #item.actions="{ item }">
        <h-action-download-button @click="onDownload(item)"></h-action-download-button>
        <h-action-delete-button @click="deleteItemById(item[rowKey])"></h-action-delete-button>
      </template>
    </h-data-table>
    <h-oss-download-progress v-model="showProgress" :progress="loadProgress"></h-oss-download-progress>
  </h-full-width-form-layout>
</template>

<script setup lang="ts">
import type {
  MgtCertificateFileRequest,
  MgtCertificateFileResponse,
  MgtCertificateFileConditions,
  MgtCertificateFileProps,
} from '@herodotus/api';
import type { VDataTableHeaders } from '@/composables/declarations';

import { isEmpty } from 'lodash-es';

import { useTable, useDictionary, useOss } from '@/composables/hooks';
import { API, PAGE_NAME } from '@/configurations';

defineOptions({ name: 'MgtCertificateFile' });

const headers = ref([
  { key: 'alias', align: 'center', label: '证书名称' },
  { key: 'certificateCategory', align: 'center', title: '证书类别' },
  { key: 'certificateFileCategory', align: 'center', title: '证书文件类别' },
  { key: 'fileName', align: 'center', title: '文件名' },
  { key: 'suffix', align: 'center', title: '文件后缀' },
  { key: 'bucketName', align: 'center', title: '存储桶' },
  { key: 'actions', align: 'center', title: '操作' },
]) as Ref<Array<VDataTableHeaders>>;

const rowKey: MgtCertificateFileProps = 'fileId';

const { loading, pageNumber, pageSize, tableRows, totalPages, totalItems, deleteItemById, findItems } = useTable<
  MgtCertificateFileConditions,
  MgtCertificateFileRequest,
  MgtCertificateFileResponse
>(API.core.mgtCertificateFile(), PAGE_NAME.MGT_CERTIFICATE);

const { getDictionaryItemDisplay } = useDictionary('CertificateCategory', 'CertificateFileCategory');
const { download, loadProgress, showProgress } = useOss();

const onDownload = (item: MgtCertificateFileResponse) => {
  if (!isEmpty(item)) {
    download(item.bucketName, item.fileName, item.fileSize);
  }
};
</script>
