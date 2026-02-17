<template>
  <v-dialog v-model="openDialog" max-width="500" persistent @after-leave="clean">
    <v-card :disabled="loading" :loading="loading" prepend-icon="mdi-memory-arrow-down" title="新建存储桶" rounded="xl">
      <template v-slot:loader="{ isActive }">
        <v-progress-linear :active="isActive" height="4" indeterminate></v-progress-linear>
      </template>
      <v-card-text class="pb-2">
        <v-form ref="createBucketForm">
          <v-text-field
            v-model="editedItem.bucketName"
            label="存储桶名称"
            placeholder="请输入存储桶名称"
            clearable
            density="compact"
            class="mt-2"
            :rules="[
              (v) => !!v || '存储桶不能为空，请输入新密码！',
              (v) => regxRule(v) || '存储桶名称只能为小字母、数字、点或横线，最多60个字符',
            ]"
          ></v-text-field>
          <h-label title="功能:"></h-label>
          <v-divider></v-divider>
          <v-switch v-model="editedItem.objectLockEnabled" label="是否开启对象锁定"></v-switch>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn text="取消" color="red" @click="openDialog = !openDialog" />
        <v-btn text="确认" @click="onSave()" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import type { HttpResult } from '@herodotus/core';
import type { CreateBucketArgument, CreateBucketResult } from '@herodotus/api';

import { toast } from '@herodotus/core';

import { API } from '@/configurations';

defineOptions({ name: 'HCreateBucketDialog' });

const emit = defineEmits<{
  success: [];
}>();

const openDialog = defineModel({
  type: Boolean,
  default: false,
  required: true,
});

const loading = shallowRef(false);
const createBucketForm = ref();
const editedItem = ref({}) as Ref<CreateBucketArgument>;

const regxRule = (content: string) => {
  const regx = /^[a-z0-9][a-z0-9\.\-]{1,61}[a-z0-9]$/;
  return regx.test(content);
};

const clean = () => {
  editedItem.value = {} as CreateBucketArgument;
};

const onSave = async () => {
  const { valid } = await createBucketForm.value.validate();

  if (valid) {
    loading.value = true;
    API.core
      .ossBucket()
      .createBucket(editedItem.value)
      .then((response) => {
        const result = response.data as HttpResult<CreateBucketResult>;
        loading.value = false;
        openDialog.value = false;
        if (result.successful) {
          if (result.message) {
            toast.success(result.message);
          } else {
            toast.success('操作成功！');
          }
          emit('success');
        } else {
          toast.warning('服务端异常！');
        }
      })
      .catch(() => {
        loading.value = false;
        openDialog.value = false;
      });
  }
};
</script>
