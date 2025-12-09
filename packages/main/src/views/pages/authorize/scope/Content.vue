<template>
  <h-center-layout-container
    :entity="editedItem"
    :title="title"
    :overlay="overlay"
    :operation="operation"
    @save="onSave()"
  >
    <v-form ref="scopeForm" validate-on="blur lazy">
      <v-text-field
        v-model.lazy="editedItem.scopeCode"
        label="范围代码 * "
        placeholder="请使用小写英文单词编写的范围代码，例如：all、read_user等"
        clearable
        :rules="[
          (v: string) => !!v || '范围代码不能为空',
          (v: string) => (v && v.length >= 3) || '范围代码至少3个字符',
          (v: string) => isUniqueRule(v),
        ]"
      ></v-text-field>
      <v-text-field
        v-model="editedItem.scopeName"
        label="范围名称"
        placeholder="请输入范围名称"
      ></v-text-field>
    </v-form>
  </h-center-layout-container>
</template>

<script setup lang="ts">
import type { OAuth2ScopeEntity } from '@herodotus/api';

import { useTableItem } from '@/composables/hooks';
import { API } from '@/configurations';

defineOptions({ name: 'OAuth2ScopeContent' });

const scopeForm = ref();

const { editedItem, operation, title, overlay, saveOrUpdate } = useTableItem<OAuth2ScopeEntity>(
  API.core.oauth2Scope(),
);

const validateScopeCode = async (scopeCode: string) => {
  return await new Promise((resolve, reject) => {
    if (scopeCode) {
      API.core
        .oauth2Scope()
        .fetchByScopeCode(scopeCode)
        .then((result) => {
          let scope = result.data as OAuth2ScopeEntity;
          // 如果能够查询到scopeCode

          // 如果该scopeCode 对应的 scopeId 与当前 editedItem中的scopeId相同
          // 则认为是编辑状态，而且scopeCode 没有变化，那么就校验通过。
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
        return '用户名已被占用，请改用其它用户名';
      }
    })
    .catch(() => {
      return '后端服务暂时不可用';
    });
};

const onSave = async () => {
  const { valid } = await scopeForm.value.validate();
  if (valid) {
    saveOrUpdate();
  }
};
</script>
