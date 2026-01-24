<template>
  <div>
    <h-data-table
      v-model:page-size="pageSize"
      v-model:page-number="pageNumber"
      v-model:total-pages="totalPages"
      v-model:total-items="totalItems"
      :headers="headers"
      :items="tableRows"
      :item-value="rowKey"
      :loading="loading"
      select-strategy="single"
      disable-sort
      @update:options="findItems"
    >
      <template #control>
        <v-btn @click="toCreate">新建用户</v-btn>
      </template>

      <template #item.actions="{ item }">
        <h-action-button
          v-if="showMessageAction(item)"
          color="light-blue"
          icon="mdi-email-edit"
          tooltip="发送消息"
          @click="onSendMessageToUser(item)"
        ></h-action-button>
        <h-action-button
          color="teal"
          icon="mdi-key-chain"
          tooltip="设置/修改密码"
          @click="onChangePassword(item)"
        ></h-action-button>
        <h-action-authorize-button
          tooltip="配置角色"
          @click="toAuthorize(item)"
        ></h-action-authorize-button>
        <h-action-edit-button @click="toEdit(item)"></h-action-edit-button>
        <h-action-delete-button
          v-if="!item.reserved"
          @click="deleteItemById(item[rowKey])"
        ></h-action-delete-button>
      </template>
    </h-data-table>
    <change-password-dialog
      v-model="showChangePasswordDialog"
      :user-id="currentUserId"
      :username="currentUsername"
    ></change-password-dialog>
    <send-message-dialog
      v-model="showSendMessageToUserDialog"
      :id="currentUserId"
      :name="currentUsername"
      :avatar="currentUserAvatar"
    ></send-message-dialog>
  </div>
</template>

<script setup lang="ts">
import type { SysUserEntity, SysUserProps, SysUserConditions } from '@herodotus/api';
import type { VDataTableHeaders } from '@/composables/declarations';

import { useAuthenticationStore } from '@herodotus/framework';
import { useTable } from '@/composables/hooks';
import { API, PAGE_NAME } from '@/configurations';

import { ChangePasswordDialog, SendMessageDialog } from './components';

defineOptions({
  name: PAGE_NAME.SYS_USER,
  components: { ChangePasswordDialog, SendMessageDialog },
});

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
  toCreate,
  deleteItemById,
  findItems,
} = useTable<SysUserConditions, SysUserEntity>(API.core.sysUser(), PAGE_NAME.SYS_USER);

const showChangePasswordDialog = shallowRef(false);
const showSendMessageToUserDialog = shallowRef(false);
const currentUserId = shallowRef('');
const currentUsername = shallowRef('');
const currentUserAvatar = shallowRef('');

const store = useAuthenticationStore();

const onChangePassword = (item: SysUserEntity) => {
  showChangePasswordDialog.value = true;
  currentUserId.value = item.userId;
};

const onSendMessageToUser = (item: SysUserEntity) => {
  showSendMessageToUserDialog.value = true;
  currentUserId.value = item.userId;
  currentUsername.value = item.username;
  currentUserAvatar.value = item.avatar as string;
};

const showMessageAction = (item: SysUserEntity) => {
  return item.userId !== store.userId;
};
</script>
