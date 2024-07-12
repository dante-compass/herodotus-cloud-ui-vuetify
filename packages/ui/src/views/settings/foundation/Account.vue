<template>
  <q-card>
    <q-tabs
      v-model="tab"
      shrink
      inline-label
      outside-arrows
      mobile-arrows
      dense
      active-color="red"
      align="left"
      :class="[$q.dark.isActive ? 'bg-dark text-white q-pt-xs' : 'bg-white text-grey-8 q-pt-xs']">
      <q-tab name="account" label="账号信息" />
      <q-tab name="realname" label="实名认证" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="account">
        <div class="text-h6 q-mb-md">账号信息</div>
        <div class="text-h6 q-mb-md">第三方账号绑定</div>
        <div class="text-body2 q-mb-md">使用以下任一方式都可以登录到您的帐号，避免由于某个帐号失效导致无法登录</div>
        <q-table :rows="tableRows" :columns="columns" :row-key="rowKey" flat bordered hide-bottom :loading="loading">
          <template #body-cell-source="props">
            <q-td key="source" :props="props">
              <q-avatar size="30px">
                <img :src="getImage(props.row.source)" />
              </q-avatar>
            </q-td>
          </template>
          <template #body-cell-bound="props">
            <q-td key="bound" :props="props">
              <h-binding-status-column :bound="props.row.bound"></h-binding-status-column>
            </q-td>
          </template>
          <template #body-cell-actions="props">
            <q-td key="actions" :props="props">
              <h-binding-button :item="props.row"></h-binding-button>
            </q-td>
          </template>
        </q-table>
      </q-tab-panel>

      <q-tab-panel name="realname">
        <div class="text-h6">实名认证</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, watch, onMounted } from 'vue';

import type {
  AccessSourceEntity,
  AccessSourceConditions,
  AccessSourceProps,
  QTableColumnProps
} from '/@/lib/declarations';

import { ComponentNameEnum } from '/@/lib/enums';
import { api, getSocialLogo } from '/@/lib/utils';
import { useTable } from '/@/hooks';
import { useAuthenticationStore } from '/@/stores';

import { HBindingButton, HBindingStatusColumn } from './components';

export default defineComponent({
  name: 'FoundationAccount',

  components: {
    HBindingButton,
    HBindingStatusColumn
  },

  setup(props) {
    const tab = ref('account');
    const store = useAuthenticationStore();

    const { tableRows, pagination, loading, findItems, conditions } = useTable<
      AccessSourceEntity,
      AccessSourceConditions
    >(api.socialBinding(), ComponentNameEnum.SOCIAL_BINDING, true);

    const rowKey: AccessSourceProps = 'id';

    const columns: QTableColumnProps = [
      {
        name: 'index',
        label: '序号',
        field: 'index'
      },
      { name: 'source', field: 'source', align: 'center', label: '账号' },
      { name: 'description', field: 'description', align: 'center', label: '绑定账号信息' },
      { name: 'bound', field: 'bound', align: 'center', label: '状态' },
      { name: 'status', field: 'status', align: 'center', label: '状态' },
      { name: 'actions', field: 'actions', align: 'center', label: '操作' }
    ];

    const getImage = (source: string) => {
      const name = source.toLowerCase();
      return getSocialLogo(name);
    };

    onMounted(() => {
      conditions.value.userId = store.userId;
      findItems({ pagination: pagination.value, getCellValue: (col: any, row: any) => {} });
    });

    watch(tableRows, newValue => {
      if (newValue) {
        newValue.forEach((row, index) => {
          row.index = index + 1;
        });
      }
    });

    return { tab, tableRows, columns, rowKey, pagination, loading, getImage };
  }
});
</script>
