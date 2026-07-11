<template>
  <h-center-form-layout :entity="editedItem" :title="title" :overlay="overlay" @save="onSave()" @cancel="onReturn">
    <v-form ref="roleForm" validate-on="blur lazy">
      <v-text-field
        v-model.lazy="editedItem.roleName"
        label="角色名称 *"
        placeholder="请输入角色名称"
        :rules="[(v: string) => !!v || '角色名称不能为空', (v: string) => (v && v.length >= 5) || '角色至少5个字符']"
      ></v-text-field>
      <v-text-field
        v-model.lazy="editedItem.roleCode"
        label="角色代码 * "
        placeholder="请输入角色代码"
        :rules="[
          (v: string) => !!v || '角色代码不能为空',
          (v: string) => (v && v.length >= 5) || '角色代码至少5个字符',
          (v: string) => isUniqueRule(v),
        ]"
      ></v-text-field>
    </v-form>
  </h-center-form-layout>
</template>

<script setup lang="ts">
import type { SysRoleEntity } from "@herodotus/api";

import { useTableItem } from "@/composables/hooks";
import { API, PAGE_NAME } from "@/configurations";

defineOptions({ name: PAGE_NAME.SYS_ROLE_CONTENT });

const roleForm = ref();

const { editedItem, title, overlay, saveOrUpdate, onReturn } = useTableItem<SysRoleEntity>(
  API.core.sysRole(),
  PAGE_NAME.SYS_ROLE_CONTENT,
);

const validateRoleCode = async (roleCode: string) => {
  return await new Promise((resolve, reject) => {
    if (roleCode) {
      API.core
        .sysRole()
        .fetchByRoleCode(roleCode)
        .then((result) => {
          let role = result.data as SysRoleEntity;
          // 如果能够查询到username
          // 如果该username 对应的 userId 与当前 editedItem中的userId相同
          // 则认为是编辑状态，而且username 没有变化，那么就校验通过。
          // 目前能想到的解决新建空值、编辑是原值等校验问题的最优解
          resolve(!(role && role.roleId !== editedItem.value.roleId));
        });
    } else {
      reject(false);
    }
  });
};

const isUniqueRule = (roleCode: string) => {
  return validateRoleCode(roleCode)
    .then((validate) => {
      if (validate) {
        return true;
      } else {
        return "角色代码已被占用，请改用其它角色代码";
      }
    })
    .catch(() => {
      return "后端服务暂时不可用";
    });
};

const onSave = async () => {
  const { valid } = await roleForm.value.validate();
  if (valid) {
    saveOrUpdate();
  }
};
</script>
