<template>
  <h-center-form-layout :entity="editedItem" :title="title" :overlay="overlay" @save="onSave()" @cancel="onReturn">
    <v-form ref="resourceIndicatorForm" validate-on="blur lazy">
      <v-text-field
        v-model.lazy="editedItem.indicatorName"
        label="资源标识名称 *"
        placeholder="请输入资源标识"
        :rules="[
          (v: string) => !!v || '资源标识不能为空',
          (v: string) => (v && v.length >= 5) || '资源标识至少5个字符',
        ]"
      ></v-text-field>
      <v-text-field
        v-model.lazy="editedItem.indicatorValue"
        label="资源标识值 * "
        placeholder="请输入资源标识值"
        :rules="[
          (v: string) => !!v || '资源标识值不能为空',
          (v: string) => (v && v.length >= 5) || '资源标识值至少5个字符',
          (v: string) => isUniqueRule(v),
        ]"
      ></v-text-field>
    </v-form>
  </h-center-form-layout>
</template>

<script setup lang="ts">
import type { OAuth2ResourceIndicatorEntity } from '@herodotus/api';

import { useTableItem } from '@/composables/hooks';
import { API, PAGE_NAME } from '@/configurations';

defineOptions({ name: PAGE_NAME.OAUTH2_RESOURCE_INDICATORE_CONTENT });

const resourceIndicatorForm = ref();

const { editedItem, title, overlay, saveOrUpdate, onReturn } = useTableItem<OAuth2ResourceIndicatorEntity>(
  API.core.oauth2ResourceIndicator(),
  PAGE_NAME.OAUTH2_RESOURCE_INDICATORE_CONTENT,
);

const validateIndicatorValue = async (indicatorValue: string) => {
  return await new Promise((resolve, reject) => {
    if (indicatorValue) {
      API.core
        .oauth2ResourceIndicator()
        .fetchByIndicatorValue(indicatorValue)
        .then((result) => {
          let indicator = result.data as OAuth2ResourceIndicatorEntity;
          // 如果能够查询到username
          // 如果该username 对应的 userId 与当前 editedItem中的userId相同
          // 则认为是编辑状态，而且username 没有变化，那么就校验通过。
          // 目前能想到的解决新建空值、编辑是原值等校验问题的最优解
          resolve(!(indicator && indicator.indicatorId !== editedItem.value.indicatorId));
        });
    } else {
      reject(false);
    }
  });
};

const isUniqueRule = (indicatorValue: string) => {
  return validateIndicatorValue(indicatorValue)
    .then((validate) => {
      if (validate) {
        return true;
      } else {
        return '资源标识值已被占用，请改用其它资源标识值';
      }
    })
    .catch(() => {
      return '后端服务暂时不可用';
    });
};

const onSave = async () => {
  const { valid } = await resourceIndicatorForm.value.validate();
  if (valid) {
    saveOrUpdate();
  }
};
</script>
