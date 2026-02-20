<template>
  <v-card title="第三方账号绑定" subtitle="使用以下任一方式都可以登录到您的帐号，避免由于某个帐号失效导致无法登录">
    <v-divider></v-divider>
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
        @update:options="findItems"
      >
        <template #item.source="{ item }">
          <v-avatar size="30px">
            <img :src="getImage(item.source)" />
          </v-avatar>
        </template>

        <template #item.bound="{ value }">
          <h-binding-status-column :bound="value"></h-binding-status-column>
        </template>

        <template #item.detail="{ item }">
          <h-binding-detail-column :item="item"></h-binding-detail-column>
        </template>

        <template #item.actions="{ item }">
          <h-binding-button :item="item"></h-binding-button>
        </template>
      </v-data-table-server>
      <v-divider></v-divider>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { AccessSourceEntity, AccessSourceConditions, AccessSourceProps } from '@herodotus/api';
import type { VDataTableHeaders } from '@/composables/declarations';

import { useTable, useDateTime } from '@/composables/hooks';
import { useAuthenticationStore } from '@herodotus/framework';
import { API, PAGE_NAME } from '@/configurations';

import HBindingButton from './HBindingButton.vue';
import HBindingDetailColumn from './HBindingDetailColumn.vue';
import HBindingStatusColumn from './HBindingStatusColumn.vue';

defineOptions({ name: 'HBindingTable', components: { HBindingButton, HBindingDetailColumn, HBindingStatusColumn } });

const headers = ref([
  { key: 'index', align: 'center', title: '序号' },
  { key: 'source', align: 'center', title: 'Logo' },
  { key: 'description', align: 'center', title: '绑定账号' },
  { key: 'detail', align: 'center', title: '详情' },
  { key: 'bindingTime', align: 'center', title: '绑定时间', value: (item) => defaultFormat(item.bindingTime) },
  { key: 'bound', align: 'center', title: '状态' },
  { key: 'actions', align: 'center', title: '操作' },
]) as Ref<Array<VDataTableHeaders>>;

const rowKey: AccessSourceProps = 'id';

const { loading, pageNumber, pageSize, tableRows, totalItems, findItems, conditions } = useTable<
  AccessSourceConditions,
  AccessSourceEntity
>(API.core.socialBinding(), PAGE_NAME.SOCIAL_BINDING, true);
const { defaultFormat } = useDateTime();

const store = useAuthenticationStore();

const getImage = (source: string) => {
  const name = source.toLowerCase();
  return `/images/social/${name}.png`;
};

onMounted(() => {
  conditions.value.userId = store.userId;
  findItems();
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
