<template>
  <h-center-layout-container
    :entity="editedItem"
    :title="title"
    :operation="operation"
    @save="onSave()"
  >
    <v-form ref="loginForm" validate-on="submit lazy">
      <v-text-field
        v-model.lazy="editedItem.username"
        label="用户名 * "
        placeholder="请输入用户名"
        clearable
        :rules="[
          (v: string) => !!v || '用户名不能为空',
          (v: string) => (v && v.length >= 5) || '用户名至少5个字符',
          (v: string) => isUniqueRule(v),
        ]"
      ></v-text-field>
      <v-text-field
        v-model="editedItem.nickname"
        label="昵称"
        placeholder="请输入用户昵称"
      ></v-text-field>
    </v-form>
  </h-center-layout-container>
</template>

<script setup lang="ts">
import type { SysUserEntity } from '@herodotus/api';

import { useTableItem } from '@/composables/hooks';
import { API } from '@/configurations';

defineOptions({ name: 'SysUserContent' });

const loginForm = ref();

const { editedItem, operation, title, saveOrUpdate } = useTableItem<SysUserEntity>(
  API.core.sysUser(),
);

const validateUsername = async (username: string) => {
  return await new Promise((resolve, reject) => {
    if (username) {
      API.core
        .sysUser()
        .fetchByUsername(username)
        .then((result) => {
          let user = result.data as SysUserEntity;
          // 如果能够查询到username
          // 如果该username 对应的 userId 与当前 editedItem中的userId相同
          // 则认为是编辑状态，而且username 没有变化，那么就校验通过。
          // 目前能想到的解决新建空值、编辑是原值等校验问题的最优解
          resolve(!(user && user.userId !== editedItem.value.userId));
        });
    } else {
      reject(false);
    }
  });
};

const isUniqueRule = (username: string) => {
  return validateUsername(username)
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
  const { valid } = await loginForm.value.validate();
  if (valid) {
    saveOrUpdate();
  }
};
</script>
