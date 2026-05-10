<template>
  <h-dialog
    v-model="openDialog"
    prepend-icon="mdi-memory-arrow-down"
    title="设置下载证书格式"
    :loading="loading"
    @confirm="onSave"
  >
    <h-label text="证书类别:"></h-label>
    <h-dictionary-toggle
      v-model="editedItem.certificateFileCategory"
      dictionary="CertificateFileCategory"
      default-value="KEY_STORE"
    ></h-dictionary-toggle>
    <v-divider class="mb-4"></v-divider>
    <template v-if="showKeyStore">
      <h-label text="KeyStore 文件格式:"></h-label>
      <h-dictionary-toggle
        v-model="editedItem.keyStoreFormat"
        dictionary="KeyStoreFormat"
        default-value="JKS"
      ></h-dictionary-toggle>
      <h-label text="KeyStore 类别:"></h-label>
      <h-dictionary-select
        v-model="editedItem.keyStoreCategory"
        dictionary="KeyStoreCategory"
        density="compact"
      ></h-dictionary-select>
    </template>
    <template v-if="showPrivateKey">
      <h-label text="私钥文件格式:"></h-label>
      <h-dictionary-toggle
        v-model="editedItem.pemPrivateKeyFormat"
        dictionary="PEMPrivateKeyFormat"
        default-value="KEY"
      ></h-dictionary-toggle>

      <v-switch v-model="editedItem.encryptPrivateKey" label="是否加密 PEM 中存储的私钥"></v-switch>
    </template>
    <template v-if="showCertificate">
      <h-label text="证书文件格式:"></h-label>
      <h-dictionary-toggle
        class="mb-md"
        v-model="editedItem.pemCertificateFormat"
        dictionary="PEMCertificateFormat"
        default-value="CRT"
      ></h-dictionary-toggle>
    </template>
  </h-dialog>
  <h-download-progress v-model="showProgress" :progress="loadProgress"></h-download-progress>
</template>

<script setup lang="ts">
import type { MgtCertificateFileRequest, MgtCertificateFileResponse } from "@herodotus/api";

import { toast } from "@herodotus/core";

import { API } from "@/configurations";
import { useCertificateDownload } from "@/composables/hooks";

defineOptions({ name: "HDownloadCertificateDialog" });

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
const editedItem = ref({}) as Ref<MgtCertificateFileRequest>;

const { download, loadProgress, showProgress } = useCertificateDownload();

const showKeyStore = computed(() => {
  return editedItem.value.certificateFileCategory === "KEY_STORE";
});

const showPrivateKey = computed(() => {
  return editedItem.value.certificateFileCategory === "PRIVATE_KEY";
});

const showCertificate = computed(() => {
  return editedItem.value.certificateFileCategory === "CERTIFICATE";
});

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
        download(data.fileName, data.fileSize);
      }
    })
    .catch(() => {
      toast.error("下载失败");
    });
};

watch(openDialog, (newValue) => {
  if (newValue) {
    loading.value = false;
    editedItem.value = {} as MgtCertificateFileRequest;
  }
});
</script>
