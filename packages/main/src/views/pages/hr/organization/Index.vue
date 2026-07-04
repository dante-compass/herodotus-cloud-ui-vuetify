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
    <template #control>
      <v-btn prepend-icon="mdi-plus" text="新建单位" @click="toCreate"></v-btn>
    </template>

    <template #item.actions="{ item }">
      <h-action-edit-button @click="toEdit(item)"></h-action-edit-button>
      <h-action-delete-button v-if="!item.reserved" @click="deleteItemById(item[rowKey])"></h-action-delete-button>
    </template>
  </h-data-table>
</template>

<script setup lang="ts">
import type { SysOrganizationEntity, SysOrganizationConditions, SysOrganizationProps } from "@herodotus/api";
import type { VDataTableHeaders } from "@/composables/declarations";

import { useTable, useDateTime } from "@/composables/hooks";
import { API, PAGE_NAME } from "@/configurations";

defineOptions({ name: PAGE_NAME.SYS_ORGANIZATION });

const headers = ref([
  { key: "organizationName", align: "center", title: "单位名称" },
  { key: "shortName", align: "center", title: "单位简称" },
  { key: "partitionCode", align: "center", title: "分区代码" },
  { key: "description", align: "center", title: "备注" },
  { key: "updateBy", align: "center", title: "最后修改人" },
  { key: "updateTime", align: "center", title: "修改时间", value: (item) => defaultFormat(item.updateTime) },
  { key: "reserved", align: "center", title: "保留数据" },
  { key: "status", align: "center", title: "状态" },
  { key: "actions", align: "center", title: "操作" },
]) as Ref<Array<VDataTableHeaders>>;

const rowKey: SysOrganizationProps = "organizationId";

const { defaultFormat } = useDateTime();
const {
  loading,
  pageNumber,
  pageSize,
  tableRows,
  totalPages,
  totalItems,
  toEdit,
  toCreate,
  deleteItemById,
  findItems,
} = useTable<SysOrganizationConditions, SysOrganizationEntity>(API.core.sysOrganization(), PAGE_NAME.SYS_ORGANIZATION);
</script>
