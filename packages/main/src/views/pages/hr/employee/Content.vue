<template>
  <h-center-layout-container
    :entity="editedItem"
    :title="title"
    :overlay="overlay"
    :operation="operation"
    @save="onSave()"
  >
    <v-form ref="employeeForm" validate-on="blur lazy">
      <v-text-field
        v-model.lazy="editedItem.employeeName"
        label="人员姓名 * "
        placeholder="请输入人员姓名"
        clearable
        :rules="[(v: string) => !!v || '人员姓名不能为空', (v: string) => isUniqueRule(v)]"
      ></v-text-field>
      <v-text-field
        v-model="editedItem.employeeNo"
        label="人员编号"
        placeholder="请输入人员编号"
      ></v-text-field>
      <h-dictionary-select
        v-model="editedItem.gender"
        dictionary="Gender"
        label="性别"
      ></h-dictionary-select>
      <h-dictionary-select
        v-model="editedItem.identity"
        dictionary="Identity"
        label="身份"
      ></h-dictionary-select>
      <v-text-field
        v-model="editedItem.email"
        label="电子邮件"
        placeholder="请输入电子邮件"
      ></v-text-field>
      <v-text-field
        v-model="editedItem.mobilePhoneNumber"
        label="手机号码"
        placeholder="请输入手机号码"
      ></v-text-field>
      <v-text-field
        v-model="editedItem.officePhoneNumber"
        label="办公电话"
        placeholder="请输入办公电话"
      ></v-text-field>
    </v-form>
  </h-center-layout-container>
</template>

<script setup lang="ts">
import type { SysEmployeeEntity } from '@herodotus/api';

import { useEntityTableItem } from '@/composables/hooks';
import { API } from '@/configurations';

defineOptions({ name: 'SysUserContent' });

const employeeForm = ref();

const { editedItem, operation, title, overlay, saveOrUpdate } =
  useEntityTableItem<SysEmployeeEntity>(API.core.sysEmployee());

const validateEmployeeName = async (employeeName: string) => {
  return await new Promise((resolve, reject) => {
    if (employeeName) {
      API.core
        .sysEmployee()
        .fetchByEmployeeName(employeeName)
        .then((result) => {
          let employee = result.data as SysEmployeeEntity;
          // 如果能够查询到 employeeName
          // 如果该 employeeName 对应的 employeeId 与当前 editedItem中的 employeeId 相同
          // 则认为是编辑状态，而且 employeeName 没有变化，那么就校验通过。
          // 目前能想到的解决新建空值、编辑是原值等校验问题的最优解
          resolve(!(employee && employee.employeeId !== editedItem.value.employeeId));
        });
    } else {
      reject(false);
    }
  });
};

const isUniqueRule = (username: string) => {
  return validateEmployeeName(username)
    .then((validate) => {
      if (validate) {
        return true;
      } else {
        return '人员姓名已存在用，请改用其它姓名用以区分';
      }
    })
    .catch(() => {
      return '后端服务暂时不可用';
    });
};

const onSave = async () => {
  const { valid } = await employeeForm.value.validate();
  if (valid) {
    saveOrUpdate();
  }
};
</script>
