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
    reserved
    @update:options="findItems"
  >
    <template #item.requestMethod="{ item }">
      <h-column-swagger :method="item.requestMethod" :url="item.url" :description="item.description"></h-column-swagger>
    </template>

    <template #item.category="{ value }">
      <v-chip v-if="value" density="compact" rounded="lg" :color="getCategoryColor(value)" label>
        {{ getDictionaryItemDisplay("MappingCategory", value) }}
      </v-chip>
    </template>

    <template #item.actions="{ item }">
      <h-action-button
        color="amber"
        icon="mdi-shield-key"
        tooltip="配置归属权限"
        @click="toAuthorize(item)"
      ></h-action-button>
      <h-action-edit-button @click="toEdit(item)"></h-action-edit-button>
    </template>
  </h-data-table>
</template>

<script setup lang="ts">
import type { SysAttributeEntity, SysAttributeProps, SysAttributeConditions } from "@herodotus/api";
import type { VDataTableHeaders } from "@/composables/declarations";

import { useTable, useDictionary, useDateTime } from "@/composables/hooks";
import { API, PAGE_NAME } from "@/configurations";

defineOptions({ name: PAGE_NAME.SYS_ATTRIBUTE });

const headers = ref([
  { key: "requestMethod", align: "center", title: "权限接口" },
  { key: "attributeCode", align: "center", title: "默认权限代码" },
  { key: "version", align: "center", title: "版本控制" },
  { key: "category", align: "center", title: "权限类型" },
  { key: "webExpression", align: "center", title: "特定表达式" },
  { key: "updateBy", align: "center", title: "最后修改人" },
  { key: "updateTime", align: "center", title: "修改时间", value: (item) => defaultFormat(item.updateTime) },
  { key: "status", align: "center", title: "状态" },
  { key: "actions", align: "center", title: "操作" },
]) as Ref<Array<VDataTableHeaders>>;

const rowKey: SysAttributeProps = "attributeId";

const { defaultFormat } = useDateTime();
const { loading, pageNumber, pageSize, tableRows, totalPages, totalItems, toEdit, toAuthorize, findItems } = useTable<
  SysAttributeConditions,
  SysAttributeEntity
>(API.core.sysAttribute(), PAGE_NAME.SYS_ATTRIBUTE, false, ["url"], "ASC");

const { getDictionaryItemDisplay } = useDictionary("MappingCategory");

const getCategoryColor = (category: string) => {
  return category === "REST" ? "cyan" : "light-green";
};
</script>
