<template>
  <h-authorize-form-layout :title="title" :overlay="overlay" @cancel="onReturn">
    <v-card rounded="lg">
      <v-data-table-server
        v-model="selectedItems"
        v-model:items-per-page="pageSize"
        v-model:page="pageNumber"
        :items-length="totalItems"
        :headers="headers"
        :items="tableRows"
        :item-value="rowKey"
        :item-selectable="rowKey"
        :loading="loading"
        show-select
        select-strategy="page"
        striped="even"
        hover
        hide-default-footer
        disable-sort
        return-object
        @update:options="findItems"
      ></v-data-table-server>
    </v-card>

    <template #right>
      <h-authorize-list
        v-model="selectedItems"
        prepend-title="roleCode"
        append-title="roleName"
        :row-key="rowKey"
        @save="onSave()"
      ></h-authorize-list>
    </template>
  </h-authorize-form-layout>
</template>

<script setup lang="ts">
import type { SysUserEntity, SysRoleEntity, SysRoleProps, SysRoleConditions } from "@herodotus/api";
import type { VDataTableHeaders } from "@/composables/declarations";

import { useTableItem, useTable } from "@/composables/hooks";
import { API, PAGE_NAME } from "@/configurations";

defineOptions({ name: PAGE_NAME.SYS_USER_AUTHORIZE });

const { editedItem, overlay, title, assign, onReturn } = useTableItem<SysUserEntity>(
  API.core.sysUser(),
  PAGE_NAME.SYS_USER_AUTHORIZE,
);
const { loading, pageNumber, pageSize, tableRows, totalItems, findItems } = useTable<SysRoleConditions, SysRoleEntity>(
  API.core.sysRole(),
  PAGE_NAME.SYS_ROLE,
  true,
);

const selectedItems = ref([]) as Ref<Array<SysRoleEntity>>;
const rowKey: SysRoleProps = "roleId";

const headers = ref([
  { key: "roleName", align: "center", title: "角色名称" },
  { key: "roleCode", align: "center", title: "角色代码" },
]) as Ref<Array<VDataTableHeaders>>;

onMounted(() => {
  selectedItems.value = editedItem.value.roles;
});

const onSave = () => {
  let userId = editedItem.value.userId;
  let roles = selectedItems.value.map((item) => item[rowKey]);
  assign({ userId: userId, roles: roles });
};
</script>
