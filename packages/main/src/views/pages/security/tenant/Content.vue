<template>
  <h-center-layout-container
    :entity="editedItem"
    :title="title"
    :overlay="overlay"
    :operation="operation"
    @save="onSave()"
  >
    <v-form ref="tenantForm" validate-on="blur lazy">
      <v-text-field
        v-model="editedItem.tenantId"
        label="租户标识ID * "
        placeholder="请输入租户标识ID"
        :rules="[
          (v: string) => !!v || '租户标识ID不能为空',
          (v: string) => (v && v.length >= 5) || '租户标识ID至少5个字符',
          (v: string) => isUniqueRule(v),
        ]"
      ></v-text-field>
      <v-text-field
        v-model="editedItem.username"
        label="数据库用户名 *"
        placeholder="请输入数据库用户名"
        :rules="[(v: string) => !!v || '数据库用户名不能为空']"
      ></v-text-field>
      <v-text-field
        v-model="editedItem.password"
        label="数据库密码 *"
        placeholder="请输入数据库密码"
        :rules="[(v: string) => !!v || '数据库密码不能为空']"
      ></v-text-field>
      <v-text-field
        v-model="editedItem.driverClassName"
        label="数据库驱动 *"
        placeholder="请输入数据库驱动"
        :rules="[(v: string) => !!v || '数据库驱动不能为空']"
      ></v-text-field>
      <v-text-field
        v-model="editedItem.url"
        label="数据库url *"
        placeholder="请输入数据库url"
        :rules="[(v: string) => !!v || '数据库url不能为空']"
      ></v-text-field>
    </v-form>
  </h-center-layout-container>
</template>

<script setup lang="ts">
import type { SysTenantDataSourceEntity } from '@herodotus/api';

import { useTableItem } from '@/composables/hooks';
import { API } from '@/configurations';

defineOptions({ name: 'SysTenantDataSourceContent' });

const tenantForm = ref();

const { editedItem, operation, title, overlay, saveOrUpdate } =
  useTableItem<SysTenantDataSourceEntity>(API.core.sysTenantDataSource());

const validateTenantId = async (tenantId: string) => {
  return await new Promise((resolve, reject) => {
    if (tenantId) {
      API.core
        .sysTenantDataSource()
        .fetchByTenantId(tenantId)
        .then((result) => {
          let tenant = result.data as SysTenantDataSourceEntity;
          // 如果能够查询到roleCode
          // 如果该roleCode 对应的 roleId 与当前 editedItem中的roleId相同
          // 则认为是编辑状态，而且employeeName 没有变化，那么就校验通过。
          // 目前能想到的解决新建空值、编辑是原值等校验问题的最优解
          resolve(!(tenant && tenant.tenantId !== editedItem.value.tenantId));
        });
    } else {
      reject(false);
    }
  });
};

const isUniqueRule = (tenantId: string) => {
  return validateTenantId(tenantId)
    .then((validate) => {
      if (validate) {
        return true;
      } else {
        return '租户ID已被占用，请改用其它租户ID';
      }
    })
    .catch(() => {
      return '后端服务暂时不可用';
    });
};

const onSave = async () => {
  const { valid } = await tenantForm.value.validate();
  if (valid) {
    saveOrUpdate();
  }
};
</script>
