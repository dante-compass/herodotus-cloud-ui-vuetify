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
    select-strategy="single"
    disable-sort
    @update:options="findItems"
  >
    <template #search>
      <search v-model="conditions"></search>
    </template>

    <template #control>
      <v-btn prepend-icon="mdi-plus" text="新建产品" @click="toCreate"></v-btn>
    </template>

    <template #item.actions="{ item }">
      <h-action-edit-button @click="toEdit(item)"></h-action-edit-button>
      <h-action-info-button @click="toInfo(item)"></h-action-info-button>
      <h-action-delete-button v-if="!item.reserved" @click="deleteItemById(item[rowKey])"></h-action-delete-button>
    </template>
  </h-data-table>
</template>

<script setup lang="ts">
import type { ProductEntity, ProductConditions, ProductProps } from "@herodotus/api";
import type { VDataTableHeaders } from "@/composables/declarations";

import { useTable, useDateTime } from "@/composables/hooks";
import { API, PAGE_NAME } from "@/configurations";

import Search from "./Search.vue";

defineOptions({ name: PAGE_NAME.IOT_PRODUCT });

const headers = ref([
  { key: "productKey", align: "center", title: "ProductKey" },
  { key: "productName", align: "center", title: "产品名称" },
  { key: "category", align: "center", title: "所属品类" },
  { key: "nodeType", align: "center", title: "节点类型" },
  { key: "gatewayProtocol", align: "center", title: "网关协议" },
  { key: "networkingMethod", align: "center", title: "联网方式" },
  { key: "authenticationMethod", align: "center", title: "认证方式" },
  { key: "registration", align: "center", title: "开启动态注册" },
  { key: "release", align: "center", title: "是否发布" },
  { key: "quantity", align: "center", title: "设备数量" },
  { key: "updateBy", align: "center", title: "最后修改人" },
  { key: "updateTime", align: "center", title: "修改时间", value: (item) => defaultFormat(item.updateTime) },
  { key: "reserved", align: "center", title: "保留数据" },
  { key: "status", align: "center", title: "状态" },
  { key: "actions", align: "center", title: "操作" },
]) as Ref<Array<VDataTableHeaders>>;

const rowKey: ProductProps = "id";

const { defaultFormat } = useDateTime();

const {
  loading,
  pageNumber,
  pageSize,
  tableRows,
  totalPages,
  totalItems,
  conditions,
  toEdit,
  toCreate,
  toInfo,
  deleteItemById,
  findItems,
} = useTable<ProductConditions, ProductEntity>(API.core.iotProduct(), PAGE_NAME.IOT_PRODUCT);
</script>
