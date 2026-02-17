<template>
  <v-dialog v-model="open" max-width="500" persistent>
    <v-card
      :disabled="loading"
      :loading="loading"
      prepend-icon="mdi-calendar-today"
      title="设置文件保留策略"
      rounded="xl"
    >
      <template v-slot:loader="{ isActive }">
        <v-progress-linear :active="isActive" height="4" indeterminate></v-progress-linear>
      </template>
      <v-card-text class="pb-2">
        <v-form ref="setRetentionForm">
          <h-label title="类型:"></h-label>
          <h-dictionary-toggle
            v-model="editedItem.retentionMode"
            dictionary="ObjectRetentionMode"
            default-value="COMPLIANCE"
          ></h-dictionary-toggle>
          <h-label title="时间:"></h-label>
          <h-date
            v-model="editedItem.retainUntilDate"
            :rules="[(v: string) => !!v || '到期时间不能为空，请输入到期时间！']"
          ></h-date>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn text="取消" color="red" @click="open = !open" />
        <v-btn text="确认" @click="onSave()" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import type { HttpResult } from '@herodotus/core';
import type { GetObjectAttributesResult, PutObjectRetentionArgument, PutBucketPolicyResult } from '@herodotus/api';

import { isEmpty } from 'lodash-es';
import { toast } from '@herodotus/core';

import { API } from '@/configurations';

defineOptions({ name: 'HOssSetRetentionDialog' });

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
const setRetentionForm = ref();
const editedItem = ref({}) as Ref<PutObjectRetentionArgument>;

const onSave = async () => {
  const { valid } = await setRetentionForm.value.validate();
  if (valid) {
    loading.value = true;
    API.core
      .ossObject()
      .setObjectRetention(editedItem.value)
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
  }
};

watch(
  () => props.attributes,
  (newValue) => {
    if (!isEmpty(newValue)) {
      editedItem.value.bucketName = newValue.bucketName;
      editedItem.value.objectName = newValue.objectName;
      editedItem.value.versionId = newValue.versionId;
      editedItem.value.retainUntilDate = newValue.retainUntilDate;
      editedItem.value.retentionMode = newValue.retentionMode;
    }
  },
  { immediate: true },
);
</script>
