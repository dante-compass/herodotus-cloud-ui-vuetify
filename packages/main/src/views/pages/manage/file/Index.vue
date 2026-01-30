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
    select-strategy="single"
    disable-sort
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
      <h-action-delete-button @click="deleteItemById(createId(item))"></h-action-delete-button>
    </template>
  </h-data-table>
</template>

<script setup lang="ts">
import type { MgtCertificateFileRequest, MgtCertificateFileResponse, MgtCertificateFileConditions, MgtCertificateFileProps, MgtCertificateFileDeleteRequest } from '@herodotus/api';
import type { VDataTableHeaders } from '@/composables/declarations';

import { useTable, useDictionary } from '@/composables/hooks';
import { API, PAGE_NAME } from '@/configurations';

defineOptions({ name: PAGE_NAME.MGT_CERTIFICATE_FILE });

const headers = ref([
  { key: 'alias', align: 'center', label: '证书名称' },
  { key: 'certificateCategory', align: 'center', title: '证书类别' },
  { key: 'certificateFileCategory', align: 'center', title: '证书文件类别' },
  { key: 'fileName', align: 'center', title: '文件名' },
  { key: 'suffix', align: 'center', title: '文件后缀' },
  { key: 'actions', align: 'center', title: '操作' },
]) as Ref<Array<VDataTableHeaders>>;

const rowKey: MgtCertificateFileProps = 'certId';

const { loading, pageNumber, pageSize, tableRows, totalPages, totalItems, toCreate, deleteItemById, findItems } = useTable<
  MgtCertificateFileConditions,
  MgtCertificateFileRequest,
  MgtCertificateFileResponse,
  MgtCertificateFileDeleteRequest
>(API.core.mgtCertificateFile(), PAGE_NAME.MGT_CERTIFICATE);

const createId = (item: MgtCertificateFileResponse): MgtCertificateFileDeleteRequest => {
  return {
    certId: item.certId,
    certificateFileCategory: item.certificateFileCategory,
    suffix: item.suffix,
  };
};

const { getDictionaryItemDisplay } = useDictionary('CertificateCategory', 'CertificateFileCategory');
</script>
