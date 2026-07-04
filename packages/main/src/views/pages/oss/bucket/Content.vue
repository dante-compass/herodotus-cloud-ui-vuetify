<template>
  <h-simple-center-form-layout :title="title" :overlay="overlay" @save="onSave()">
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
          (v) => regxRule(v) || '存储桶名称必须与DNS兼容，至少3个字符，最多63个字符',
        ]"
      ></v-text-field>
      <v-switch v-model="editedItem.objectLockEnabled" label="是否开启对象锁定"></v-switch>
    </v-form>
  </h-simple-center-form-layout>
</template>

<script setup lang="ts">
import type { HttpResult } from "@herodotus/core";
import type { CreateBucketArgument, CreateBucketResult } from "@herodotus/api";

import { toast } from "@herodotus/core";
import { useBaseTableItem } from "@/composables/hooks";
import { API } from "@/configurations";

defineOptions({ name: "OssBucketContent" });

const { title, overlay } = useBaseTableItem<CreateBucketArgument>();

const editedItem = ref({}) as Ref<CreateBucketArgument>;

const regxRule = (content: string) => {
  const regx = /^[a-z0-9][a-z0-9\.\-]+[a-z0-9]$.{3,63}/;
  return regx.test(content);
};

const onSave = () => {
  overlay.value = true;
  API.core
    .ossBucket()
    .createBucket(editedItem.value)
    .then((response) => {
      const result = response.data as HttpResult<CreateBucketResult>;
      overlay.value = false;
      if (result.successful) {
        if (result.message) {
          toast.success(result.message);
        } else {
          toast.success("操作成功！");
        }
      } else {
        toast.warning("服务端异常！");
      }
    })
    .catch(() => {
      overlay.value = false;
      toast.error("删除失败");
    });
};
</script>
