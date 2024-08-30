<template>
  <div class="q-gutter-y-md">
    <h-product-condition v-model:conditions="conditions"></h-product-condition>
    <h-table
      :rows="tableRows"
      :columns="columns"
      :row-key="rowKey"
      selection="single"
      v-model:selected="selected"
      v-model:pagination="pagination"
      v-model:pageNumber="pagination.page"
      :totalPages="totalPages"
      :loading="loading"
      status
      reserved
      @request="findItems">
      <template #top-left>
        <h-button color="primary" label="新建产品" @click="toCreate" />
      </template>

      <template #body-cell-category="props">
        <q-td key="category" :props="props">
          {{ props.row.category.categoryName }}
        </q-td>
      </template>

      <template #body-cell-node="props">
        <q-td key="node" :props="props">
          {{ display('Node', props.row.node) }}
        </q-td>
      </template>

      <template #body-cell-protocol="props">
        <q-td key="protocol" :props="props">
          {{ display('Protocol', props.row.protocol) }}
        </q-td>
      </template>

      <template #body-cell-networking="props">
        <q-td key="networking" :props="props">
          {{ display('Networking', props.row.networking) }}
        </q-td>
      </template>

      <template #body-cell-registration="props">
        <q-td key="registration" :props="props">
          <q-toggle
            :modelValue="props.row.registration"
            @update:model-value="onRegistrationChange(props.row, $event)" />
        </q-td>
      </template>

      <template #body-cell-actions="props">
        <q-td key="actions" :props="props">
          <h-edit-button @click="toEdit(props.row)"></h-edit-button>
          <h-delete-button v-if="!props.row.reserved" @click="deleteItemById(props.row[rowKey])"></h-delete-button>
        </q-td>
      </template>
    </h-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import type {
  IotProductEntity,
  IotProductConditions,
  IotProductProps,
  QTableColumnProps,
  HttpResult,
} from '/@/lib/declarations';

import { useTable } from '/@/hooks';
import { CONSTANTS, useDictionaryStore } from '/@/composables/constants';
import { api, toast } from '/@/lib/utils';

import { HDeleteButton, HEditButton, HTable } from '/@/components';
import { HProductCondition } from '/@/composables/iot';

export default defineComponent({
  name: CONSTANTS.ComponentName.IOT_PRODUCT,

  components: {
    HDeleteButton,
    HEditButton,
    HTable,
    HProductCondition,
  },

  setup() {
    const {
      tableRows,
      totalPages,
      pagination,
      loading,
      toEdit,
      toCreate,
      toAuthorize,
      findItems,
      deleteItemById,
      conditions,
    } = useTable<IotProductEntity, IotProductConditions>(api.iotProduct(), CONSTANTS.ComponentName.IOT_PRODUCT);

    const selected = ref([]);
    const rowKey: IotProductProps = 'productId';

    const { display } = useDictionaryStore();

    const columns: QTableColumnProps = [
      { name: 'productKey', field: 'productKey', align: 'center', label: 'ProductKey' },
      { name: 'productName', field: 'productName', align: 'center', label: '产品名称' },
      { name: 'category', field: 'category', align: 'center', label: '所属品类' },
      { name: 'node', field: 'node', align: 'center', label: '节点类型' },
      { name: 'protocol', field: 'protocol', align: 'center', label: '网关协议' },
      { name: 'networking', field: 'networking', align: 'center', label: '联网方式' },
      { name: 'registration', field: 'registration', align: 'center', label: '开启动态注册' },
      { name: 'quantity', field: 'quantity', align: 'center', label: '设备数量' },
      { name: 'reserved', field: 'reserved', align: 'center', label: '保留数据' },
      { name: 'status', field: 'status', align: 'center', label: '状态' },
      { name: 'actions', field: 'actions', align: 'center', label: '操作' },
    ];

    const onRegistrationChange = (item: IotProductEntity, event: boolean) => {
      item.registration = event as boolean;
      api
        .iotProduct()
        .toggle(item)
        .then(response => {
          const result = response as HttpResult<IotProductEntity>;
          if (result.message) {
            toast.success(result.message);
          } else {
            toast.success('操作成功');
          }
        })
        .catch(error => {
          toast.error('操作失败');
        });
    };

    return {
      rowKey,
      selected,
      pagination,
      columns,
      tableRows,
      totalPages,
      loading,
      toCreate,
      toEdit,
      toAuthorize,
      findItems,
      deleteItemById,
      conditions,
      onRegistrationChange,
      display,
    };
  },
});
</script>
