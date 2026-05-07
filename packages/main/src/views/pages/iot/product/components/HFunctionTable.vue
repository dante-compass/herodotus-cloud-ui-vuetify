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
        <v-btn prepend-icon="mdi-plus" text="新建功能" @click="toCreate"> </v-btn>
      </template>

      <template #item.actions="{ item }">
        <h-action-authorize-button tooltip="配置权限" @click="toAuthorize(item)"></h-action-authorize-button>
        <h-action-edit-button @click="toEdit(item)"></h-action-edit-button>
        <h-action-delete-button v-if="!item.reserved" @click="deleteItemById(item[rowKey])"></h-action-delete-button>
      </template>
    </h-data-table>
    <h-function-table v-model="openDialog"></h-function-table>
  </div>
</template>

<script setup lang="ts">
import type { TslFunctionEntity, TslFunctionConditions, TslFunctionProps, Specification, Specs } from "@herodotus/api";
import type { VDataTableHeaders } from "@/composables/declarations";

import { useTable } from "@/composables/hooks";
import { API, PAGE_NAME } from "@/configurations";

import HAddFunctionDialog from "./HAddFunctionDialog.vue";

defineOptions({ name: PAGE_NAME.IOT_TSL_FUNCTION, components: { HAddFunctionDialog } });

const headers = ref([
  { key: "dimension", align: "center", title: "功能类型" },
  { key: "name", align: "center", title: "功能名称" },
  { key: "identifier", align: "center", title: "标识符" },
  { key: "type", align: "center", title: "数据类型" },
  { key: "specs", align: "left", title: "数据定义" },
  { key: "actions", align: "center", title: "操作" },
]) as Ref<Array<VDataTableHeaders>>;

const rowKey: TslFunctionProps = "id";

const {
  loading,
  pageNumber,
  pageSize,
  tableRows,
  totalPages,
  totalItems,
  toEdit,
  toCreate,
  toAuthorize,
  deleteItemById,
  findItems,
} = useTable<TslFunctionConditions, TslFunctionEntity>(API.core.iotTslFunction(), PAGE_NAME.IOT_TSL_FUNCTION);

const openDialog = shallowRef(false);
</script>
