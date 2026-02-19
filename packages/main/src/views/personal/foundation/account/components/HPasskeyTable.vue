<template>
  <v-card title="通行密钥">
    <v-divider></v-divider>
    <v-card-title class="d-flex align-center my-2">
      <v-btn :disable="isRegisterButtonDisable" @click="open = !open">注册通行密钥</v-btn>
    </v-card-title>
    <v-card-text>
      <v-data-table-server
        v-model:items-per-page="pageSize"
        v-model:page="pageNumber"
        :items-length="totalItems"
        :headers="headers"
        :items="tableRows"
        :item-value="rowKey"
        :item-selectable="rowKey"
        :loading="loading"
        disable-sort
        hide-default-footer
        class="mb-2"
        @update:options="fetchItems"
      >
        <template #item.actions="{ item }">
          <h-action-delete-button @click="onDelete(item[rowKey])"></h-action-delete-button>
        </template>
      </v-data-table-server>
    </v-card-text>
    <v-card-text>
      <h-passkey-register-dialog v-model="open" @save="onSave"></h-passkey-register-dialog>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { HttpResult } from '@herodotus/core';
import type {
  OAuth2CredentialRecordEntity,
  OAuth2CredentialRecordConditions,
  OAuth2CredentialRecordProps,
} from '@herodotus/api';
import type { VDataTableHeaders } from '@/composables/declarations';

import { useTable, useDateTime } from '@/composables/hooks';
import { useAuthenticationStore, SecurityApiResources, usePasskey } from '@herodotus/framework';
import { toast, notify } from '@herodotus/core';
import { API, PAGE_NAME } from '@/configurations';

import HPasskeyRegisterDialog from './HPasskeyRegisterDialog.vue';

defineOptions({ name: 'HPasskeyTable', components: { HPasskeyRegisterDialog } });

const headers = ref([
  { key: 'index', align: 'center', title: '序号' },
  { key: 'label', align: 'center', title: '标签' },
  { key: 'created', align: 'center', title: '创建时间', value: (item) => defaultFormat(item.created) },
  { key: 'lastUsed', align: 'center', title: '更新时间', value: (item) => defaultFormat(item.created) },
  { key: 'signatureCount', align: 'center', title: '签名数量' },
  { key: 'actions', align: 'center', title: '操作' },
]) as Ref<Array<VDataTableHeaders>>;

const rowKey: OAuth2CredentialRecordProps = 'credentialId';

const { loading, pageNumber, pageSize, tableRows, totalItems, findItems, conditions } = useTable<
  OAuth2CredentialRecordConditions,
  OAuth2CredentialRecordEntity
>(API.core.oauth2CredentialRecord(), PAGE_NAME.OAUTH2_CREDENTIAL_RECORD, true);
const { isSupported } = usePasskey();
const { defaultFormat } = useDateTime();
const store = useAuthenticationStore();

const open = ref(false);

const fetchItems = () => {
  conditions.value.username = store.username;
  findItems();
};

const onDelete = (id: string) => {
  notify.standardDeleteNotify(() => {
    SecurityApiResources.getInstance()
      .passkey()
      .delete(id)
      .then((response) => {
        const result = response as HttpResult<string>;
        if (result.message) {
          toast.success(result.message);
        } else {
          toast.success('删除成功');
          fetchItems();
        }
      })
      .catch((error) => {
        if (error.message) {
          toast.error(error.message);
        } else {
          toast.error('删除失败');
        }
      });
  });
};

const onSave = () => {
  open.value = false;
  fetchItems();
};

const isRegisterButtonDisable = computed(() => {
  return !isSupported();
});

onMounted(() => {
  fetchItems();
});

watch(tableRows, (newValue) => {
  if (newValue) {
    newValue.forEach((row, index) => {
      //@ts-ignore
      row.index = index + 1;
    });
  }
});
</script>
