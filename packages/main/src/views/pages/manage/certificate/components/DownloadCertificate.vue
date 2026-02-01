<template>
  <v-dialog v-model="openDialog" max-width="500" persistent>
    <v-card prepend-icon="mdi-memory-arrow-down" title="设置下载证书格式" rounded="xl">
      <v-card-text class="pb-2">
        <v-card-actions>
          <v-btn text="取消" color="red" @click="openDialog = !openDialog" />
          <v-btn text="确认" @click="onSave()" />
        </v-card-actions>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import type { MgtCertificateFileRequest } from '@herodotus/api';

import { API } from '@/configurations';

defineOptions({ name: 'DownloadCertificate' });

const openDialog = defineModel({
  type: Boolean,
  default: false,
  required: true,
});

const loadProgress = shallowRef<number>(0);
const item = ref({}) as Ref<MgtCertificateFileRequest>;

const process = (response: Blob, objectName: string) => {
  const data = response as Blob;
  const blob = new Blob([data], { type: 'application/x-download' });
  // 创建元素
  const link = document.createElement('a');
  link.style.display = 'none';
  // 创建下载的链接
  link.href = URL.createObjectURL(blob);
  // 给下载后的文件命名
  link.setAttribute('download', objectName);
  document.body.appendChild(link);
  // 点击下载
  link.click();
  // 下载完成移除元素
  document.body.removeChild(link);
  // 释放掉blob对象
  window.URL.revokeObjectURL(link.href);
};

const onDownload = () => {
  API.core
    .mgtCertificateFile()
    .download(item)
    .then((response) => {
      const data = response as Blob;
      process(data, objectName);
    })
    .catch(() => {
      toast.error('下载失败');
    });
};

const onSave = () => {

}
</script>
