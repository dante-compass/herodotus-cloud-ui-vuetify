<template>
  <h-dialog
    v-model="open"
    prepend-icon="mdi-hammer-screwdriver"
    title="设置对象留存策略"
    :loading="loading"
    @confirm="onSave"
  >
    <v-switch v-model="editedItem.legalHoldEnabled" label="是否开启对象锁定"></v-switch>
  </h-dialog>
</template>

<script setup lang="ts">
import type { HttpResult } from '@herodotus/core';
import type { GetObjectAttributesResult, PutObjectLegalHoldArgument, PutBucketPolicyResult } from '@herodotus/api';

import { isEmpty } from 'lodash-es';
import { toast } from '@herodotus/core';

import { API } from '@/configurations';

defineOptions({ name: 'HOssSetLegalHoldDialog' });

interface Props {
  attributes: GetObjectAttributesResult;
}

const props = defineProps<Props>();

const open = defineModel({
  type: Boolean,
  default: false,
  required: true,
});

const loading = shallowRef(false);
const editedItem = ref({}) as Ref<PutObjectLegalHoldArgument>;

const onSave = async () => {
  loading.value = true;
  API.core
    .ossObject()
    .setObjectLegalHold(editedItem.value)
    .then((response) => {
      const result = response.data as HttpResult<PutBucketPolicyResult>;
      loading.value = false;
      open.value = false;
      if (result.successful) {
        if (result.message) {
          toast.success(result.message);
        } else {
          toast.success('操作成功！');
        }
      } else {
        toast.warning('服务端异常！');
      }
    })
    .catch(() => {
      loading.value = false;
      open.value = false;
    });
};

watch(
  () => props.attributes,
  (newValue) => {
    if (!isEmpty(newValue)) {
      editedItem.value.bucketName = newValue.bucketName;
      editedItem.value.objectName = newValue.objectName;
      editedItem.value.versionId = newValue.versionId;
      editedItem.value.legalHoldEnabled = newValue.lockLegalHold;
    }
  },
  { immediate: true },
);
</script>
