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
      <v-btn prepend-icon="mdi-plus" text="添加设备" @click="toCreate"></v-btn>
    </template>

    <template #item.product="{ item }">
      {{ item.product.productName }}
    </template>

    <template #item.actions="{ item }">
      <h-action-edit-button @click="toEdit(item)"></h-action-edit-button>
      <h-action-info-button @click="toInfo(item)"></h-action-info-button>
      <h-action-delete-button v-if="!item.reserved" @click="deleteItemById(item[rowKey])"></h-action-delete-button>
    </template>
  </h-data-table>
</template>

<script setup lang="ts">
import type { DeviceEntity, DeviceConditions, DeviceProps } from "@herodotus/api";
import type { VDataTableHeaders } from "@/composables/declarations";

import { useTable, useDateTime } from "@/composables/hooks";
import { API, PAGE_NAME } from "@/configurations";

import Search from "./Search.vue";

defineOptions({ name: PAGE_NAME.IOT_DEVICE, components: { Search } });

const headers = ref([
  { key: "deviceName", align: "center", title: "设备名称" },
  { key: "product", align: "center", title: "设备所属产品" },
  { key: "clientId", align: "center", title: "Client ID" },
  { key: "enabled", align: "center", title: "启用/禁用" },
  { key: "activated", align: "center", title: "是否激活" },
  { key: "updateBy", align: "center", title: "最后修改人" },
  { key: "updateTime", align: "center", title: "修改时间", value: (item) => defaultFormat(item.updateTime) },
  { key: "reserved", align: "center", title: "保留数据" },
  { key: "actions", align: "center", title: "操作" },
]) as Ref<Array<VDataTableHeaders>>;

const rowKey: DeviceProps = "id";

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
} = useTable<DeviceConditions, DeviceEntity>(API.core.iotDevice(), PAGE_NAME.IOT_DEVICE);
</script>
