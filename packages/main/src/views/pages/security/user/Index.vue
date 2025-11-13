<template>
  <h-data-table
    v-model:page-size="pageSize"
    v-model:page-number="pageNumber"
    v-model:total-pages="totalPages"
    v-model:total-items="totalItems"
    :headers="headers"
    :items="tableRows"
    :item-value="rowKey"
    :loading="loading"
    disable-sort
    @update:options="findItems"
  >
    <template #control>
      <v-btn>新建用户</v-btn>
    </template>

    <template #item.actions="{ item }">
      <h-action-button
        color="amber"
        icon="mdi-shield-edit"
        tooltip="配置角色"
        @click="toAuthorize(item)"
      ></h-action-button>
      <h-action-edit-button @click="toEdit(item)"></h-action-edit-button>
      <h-action-delete-button
        v-if="!item.reserved"
        @click="deleteItemById(item[rowKey])"
      ></h-action-delete-button>
    </template>
  </h-data-table>
</template>

<script setup lang="ts">
import type { SysUserEntity, SysUserProps, SysUserConditions } from '@herodotus/api';
import type { VDataTableHeaders } from '@/composables/declarations';

import { useTable } from '@/composables/hooks';
import { API, PAGE_NAME } from '@/configurations';

defineOptions({ name: PAGE_NAME.SYS_USER });

const headers = ref([
  { key: 'username', align: 'center', title: '用户名' },
  { key: 'nickname', align: 'center', title: '昵称' },
  { key: 'description', align: 'center', title: '备注' },
  { key: 'reserved', align: 'center', title: '保留数据' },
  { key: 'status', align: 'center', title: '状态' },
  { key: 'actions', align: 'center', title: '操作' },
]) as Ref<Array<VDataTableHeaders>>;

const rowKey: SysUserProps = 'userId';

const {
  loading,
  pageNumber,
  pageSize,
  tableRows,
  totalPages,
  totalItems,
  toEdit,
  toAuthorize,
  deleteItemById,
  findItems,
} = useTable<SysUserEntity, SysUserConditions>(API.core.sysUser(), PAGE_NAME.SYS_USER);

// const onChangePassword = (item: SysUserEntity) => {
//   showChangePasswordDialog.value = true;
//   currentUserId.value = item.userId;
// };

// const onSendMessageToUser = (item: SysUserEntity) => {
//   showSendMessageToUserDialog.value = true;
//   currentUserId.value = item.userId;
//   currentUsername.value = item.username;
//   currentUserAvatar.value = item.avatar as string;
// };

// const showMessageAction = (item: SysUserEntity) => {
//   return item.userId !== store.userId;
// };
</script>
