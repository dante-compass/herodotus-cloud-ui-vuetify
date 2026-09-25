<template>
  <h-center-form-layout :entity="editedItem" :title="title" :overlay="overlay" @save="onSave()" @cancel="onReturn">
    <v-form ref="supportedScopeForm" validate-on="blur lazy">
      <v-text-field
        v-model.lazy="editedItem.scopeName"
        label="支持范围名称 *"
        placeholder="请输入支持范围名称"
        :rules="[
          (v: string) => !!v || '支持范围名称不能为空',
          (v: string) => (v && v.length >= 5) || '支持范围名称至少5个字符',
        ]"
      ></v-text-field>
      <v-text-field
        v-model.lazy="editedItem.scopeCode"
        label="支持范围代码 * "
        placeholder="请输入支持范围代码"
        :rules="[
          (v: string) => !!v || '支持范围代码不能为空',
          (v: string) => (v && v.length >= 5) || '支持范围代码至少5个字符',
          (v: string) => isUniqueRule(v),
        ]"
      ></v-text-field>
      <v-select
        v-model="editedItem.resource"
        :items="resources"
        item-title="indicatorValue"
        item-value="indicatorId"
        label="归属资源"
        :loading="resourcesLoading"
        return-object
      ></v-select>
    </v-form>
  </h-center-form-layout>
</template>

<script setup lang="ts">
import type { OAuth2ResourceEntity, OAuth2SupportedScopeEntity } from '@herodotus/api';

import { useTableItem } from '@/composables/hooks';
import { API, PAGE_NAME } from '@/configurations';

defineOptions({ name: PAGE_NAME.OAUTH2_SUPPORTED_SCOPE_CONTENT });

const { editedItem, title, overlay, saveOrUpdate, onReturn } = useTableItem<OAuth2SupportedScopeEntity>(
  API.core.oauth2SupportedScope(),
  PAGE_NAME.OAUTH2_SUPPORTED_SCOPE_CONTENT,
);

const supportedScopeForm = ref();
const resourcesLoading = shallowRef(false);
const resources = ref([]) as Ref<Array<OAuth2ResourceEntity>>;

const validateScopeCode = async (scopeCode: string) => {
  return await new Promise((resolve, reject) => {
    if (scopeCode) {
      API.core
        .oauth2SupportedScope()
        .fetchByScopeCode(scopeCode)
        .then((result) => {
          let scope = result.data as OAuth2SupportedScopeEntity;
          // 如果能够查询到username
          // 如果该username 对应的 userId 与当前 editedItem中的userId相同
          // 则认为是编辑状态，而且username 没有变化，那么就校验通过。
          // 目前能想到的解决新建空值、编辑是原值等校验问题的最优解
          resolve(!(scope && scope.scopeId !== editedItem.value.scopeId));
        });
    } else {
      reject(false);
    }
  });
};

const isUniqueRule = (scopeCode: string) => {
  return validateScopeCode(scopeCode)
    .then((validate) => {
      if (validate) {
        return true;
      } else {
        return '支持范围代码已被占用，请改用其它支持范围代码';
      }
    })
    .catch(() => {
      return '后端服务暂时不可用';
    });
};

const loadResources = () => {
  resourcesLoading.value = true;
  API.core
    .oauth2Resource()
    .fetchAll()
    .then((result) => {
      if (result.data) {
        resources.value = result.data;
      }
      resourcesLoading.value = false;
    })
    .catch((error) => {
      resourcesLoading.value = false;
    });
};

onMounted(() => {
  loadResources();
});

const onSave = async () => {
  const { valid } = await supportedScopeForm.value.validate();
  if (valid) {
    saveOrUpdate();
  }
};
</script>
