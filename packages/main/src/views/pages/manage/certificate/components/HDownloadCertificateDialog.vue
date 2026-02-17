<template>
  <v-dialog v-model="openDialog" max-width="500" persistent @after-leave="clean">
    <v-card
      :disabled="loading"
      :loading="loading"
      prepend-icon="mdi-memory-arrow-down"
      title="设置下载证书格式"
      rounded="xl"
    >
      <template v-slot:loader="{ isActive }">
        <v-progress-linear :active="isActive" height="4" indeterminate></v-progress-linear>
      </template>
      <v-card-text class="pb-2">
        <h-label title="证书类别:"></h-label>
        <h-dictionary-toggle
          v-model="editedItem.certificateFileCategory"
          dictionary="CertificateFileCategory"
          default-value="KEY_STORE"
        ></h-dictionary-toggle>
        <v-divider class="mb-4"></v-divider>
        <template v-if="showKeyStore">
          <h-label title="KeyStore 文件格式:"></h-label>
          <h-dictionary-toggle
            v-model="editedItem.keyStoreFormat"
            dictionary="KeyStoreFormat"
            default-value="JKS"
          ></h-dictionary-toggle>
          <h-label title="KeyStore 类别:"></h-label>
          <h-dictionary-select
            v-model="editedItem.keyStoreCategory"
            dictionary="KeyStoreCategory"
            density="compact"
          ></h-dictionary-select>
        </template>
        <template v-if="showPrivateKey">
          <h-label title="私钥文件格式:"></h-label>
          <h-dictionary-toggle
            v-model="editedItem.pemPrivateKeyFormat"
            dictionary="PEMPrivateKeyFormat"
            default-value="KEY"
          ></h-dictionary-toggle>

          <v-switch v-model="editedItem.encryptPrivateKey" label="是否加密 PEM 中存储的私钥"></v-switch>
        </template>
        <template v-if="showCertificate">
          <h-label title="证书文件格式:"></h-label>
          <h-dictionary-toggle
            class="mb-md"
            v-model="editedItem.pemCertificateFormat"
            dictionary="PEMCertificateFormat"
            default-value="CRT"
          ></h-dictionary-toggle>
        </template>
      </v-card-text>
      <v-card-actions>
        <v-btn text="取消" color="red" @click="openDialog = !openDialog" />
        <v-btn text="确认" @click="onSave()" />
      </v-card-actions>
    </v-card>
  </v-dialog>
  <h-oss-download-progress v-model="showProgress" :progress="loadProgress"></h-oss-download-progress>
</template>

<script setup lang="ts">
import type { MgtCertificateFileRequest, MgtCertificateFileResponse } from '@herodotus/api';

import { toast } from '@herodotus/core';

import { API } from '@/configurations';
import { useOss } from '@/composables/hooks';

defineOptions({ name: 'HDownloadCertificateDialog' });

interface Props {
  certId: string | undefined;
}

const props = defineProps<Props>();

const openDialog = defineModel({
  type: Boolean,
  default: false,
  required: true,
});

const loading = shallowRef(false);

const { download, loadProgress, showProgress } = useOss();

const editedItem = ref({}) as Ref<MgtCertificateFileRequest>;

const showKeyStore = computed(() => {
  return editedItem.value.certificateFileCategory === 'KEY_STORE';
});

const showPrivateKey = computed(() => {
  return editedItem.value.certificateFileCategory === 'PRIVATE_KEY';
});

const showCertificate = computed(() => {
  return editedItem.value.certificateFileCategory === 'CERTIFICATE';
});

const clean = () => {
  editedItem.value = {} as MgtCertificateFileRequest;
};

const onSave = () => {
  loading.value = true;
  editedItem.value.certId = props.certId as string;
  API.core
    .mgtCertificateFile()
    .saveOrUpdate(editedItem.value)
    .then((response) => {
      const data = response.data as MgtCertificateFileResponse;
      loading.value = false;
      openDialog.value = false;
      if (data) {
        download(data.bucketName, data.fileName, data.fileSize);
      }
    })
    .catch(() => {
      toast.error('下载失败');
    });
};
</script>
