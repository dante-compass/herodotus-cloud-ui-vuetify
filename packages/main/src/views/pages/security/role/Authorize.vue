<template>
  <h-authorize-layout :title="title">
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
        prepend-title="permissionCode"
        append-title="permissionName"
        :row-key="rowKey"
        @save="onSave()"
      ></h-authorize-list>
    </template>
  </h-authorize-layout>
</template>

<script setup lang="ts">
import type {
  SysRoleEntity,
  SysPermissionEntity,
  SysPermissionProps,
  SysPermissionConditions,
} from '@herodotus/api';
import type { VDataTableHeaders } from '@/composables/declarations';

import { useTableItem, useTable } from '@/composables/hooks';
import { API, PAGE_NAME } from '@/configurations';

defineOptions({ name: 'SysRoleAuthorize' });

const { editedItem, title, assign } = useTableItem<SysRoleEntity>(API.core.sysRole());
const { loading, pageNumber, pageSize, tableRows, totalItems, findItems } = useTable<
  SysPermissionConditions,
  SysPermissionEntity
>(API.core.sysPermission(), PAGE_NAME.SYS_PERMISSION, true);

const selectedItems = ref([]) as Ref<Array<SysPermissionEntity>>;
const rowKey: SysPermissionProps = 'permissionId';

const headers = ref([
  { key: 'permissionName', align: 'center', title: '权限名称' },
  { key: 'permissionCode', align: 'center', title: '权限代码' },
]) as Ref<Array<VDataTableHeaders>>;

onMounted(() => {
  selectedItems.value = editedItem.value.permissions;
});

const onSave = () => {
  let roleId = editedItem.value.roleId;
  let permissions = selectedItems.value.map((item) => item[rowKey]);
  assign({ roleId: roleId, permissions: permissions });
};
</script>
