<template>
  <div>
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
      <template #control>
        <v-btn @click="toCreate">新建证书</v-btn>
      </template>

      <template #item.issuerDn="{ value }">
        <h-action-button color="orange" icon="mdi-invoice-text-check" :tooltip="value"></h-action-button>
      </template>

      <template #item.subjectDn="{ value }">
        <h-action-button color="teal" icon="mdi-invoice-text-edit" :tooltip="value"></h-action-button>
      </template>

      <template #item.startTime="{ value }">
        {{ defaultFormat(value) }}
      </template>

      <template #item.endTime="{ value }">
        {{ defaultFormat(value) }}
      </template>

      <template #item.certificateCategory="{ value }">
        <v-chip density="compact" rounded="lg" color="purple" label>
          {{ getDictionaryItemDisplay('CertificateCategory', value) }}
        </v-chip>
      </template>

      <template #item.revocationReason="{ value }">
        <v-chip v-if="value" density="compact" rounded="lg" color="red" label>
          {{ getDictionaryItemDisplay('RevocationReason', value) }}
        </v-chip>
      </template>

      <template #item.ocsp="{ item }">
        <h-column-boolean :value="item.ocsp"></h-column-boolean>
      </template>

      <template #item.actions="{ item }">
        <h-action-download-button @click="onShowDownloadDialog(item)"></h-action-download-button>
        <h-action-delete-button @click="deleteItemById(item[rowKey])"></h-action-delete-button>
      </template>
    </h-data-table>
    <h-download-certificate-dialog v-model="openDialog" :cert-id="currentCertId"></h-download-certificate-dialog>
  </div>
</template>

<script setup lang="ts">
import type {
  MgtCertificateRequest,
  MgtCertificateResponse,
  MgtCertificateConditions,
  MgtCertificateProps,
} from '@herodotus/api';
import type { VDataTableHeaders } from '@/composables/declarations';

import { useTable, useDateTime, useDictionary } from '@/composables/hooks';
import { API, PAGE_NAME } from '@/configurations';

import { HDownloadCertificateDialog } from './components';

defineOptions({ name: PAGE_NAME.MGT_CERTIFICATE });

const headers = ref([
  { key: 'certificateCategory', align: 'center', title: '证书类别' },
  { key: 'alias', align: 'center', title: '证书名称' },
  { key: 'commonName', align: 'center', title: '证书公共名称' },
  { key: 'serialNumber', align: 'center', title: '证书序列号' },
  { key: 'issuerDn', align: 'center', title: '颁发者 DN' },
  { key: 'subjectDn', align: 'center', title: '主题 DN' },
  { key: 'startTime', align: 'center', title: '开始时间' },
  { key: 'endTime', align: 'center', title: '结束时间' },
  { key: 'password', align: 'center', title: '密码' },
  { key: 'ocsp', align: 'center', title: 'OCSP 证书' },
  { key: 'revocationReason', align: 'center', title: '证书吊销理由' },
  { key: 'status', align: 'center', title: '状态' },
  { key: 'actions', align: 'center', title: '操作' },
]) as Ref<Array<VDataTableHeaders>>;

const rowKey: MgtCertificateProps = 'certId';

const { loading, pageNumber, pageSize, tableRows, totalPages, totalItems, toCreate, deleteItemById, findItems } =
  useTable<MgtCertificateConditions, MgtCertificateRequest, MgtCertificateResponse>(
    API.core.mgtCertificate(),
    PAGE_NAME.MGT_CERTIFICATE,
  );

const { defaultFormat } = useDateTime();
const { getDictionaryItemDisplay } = useDictionary('CertificateCategory', 'RevocationReason');

const openDialog = shallowRef(false);
const currentCertId = shallowRef();

const onShowDownloadDialog = (item: MgtCertificateResponse) => {
  currentCertId.value = item.certId;
  if (currentCertId.value) {
    openDialog.value = true;
  }
};

watch(openDialog, (newValue) => {
  if (!newValue) {
    currentCertId.value = '';
  }
});
</script>
