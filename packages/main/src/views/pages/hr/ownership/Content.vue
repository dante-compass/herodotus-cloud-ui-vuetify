<template>
  <h-full-width-form-layout title="配置人员归属" :overlay="overlay" @cancel="onReturn">
    <h-data-table
      v-model="selectedItems"
      v-model:page-size="pageSize"
      v-model:page-number="pageNumber"
      v-model:total-pages="totalPages"
      v-model:total-items="totalItems"
      :headers="headers"
      :items="tableRows"
      :item-value="rowKey"
      :loading="loading"
      select-strategy="page"
      disable-sort
      @update:options="findItems"
      class="mb-4"
    >
      <template #search>
        <employee-search v-model="conditions"></employee-search>
      </template>

      <template #item.gender="{ value }">
        <v-chip v-if="value" density="compact" rounded="lg" color="blue" label>
          {{ getDictionaryItemDisplay("Gender", value) }}
        </v-chip>
      </template>

      <template #item.identity="{ value }">
        <v-chip v-if="value" density="compact" rounded="lg" color="orange" label>
          {{ getDictionaryItemDisplay("Identity", value) }}
        </v-chip>
      </template>
    </h-data-table>
    <template #button>
      <v-btn class="ml-sm" @click="onSave()">保存</v-btn>
    </template>
  </h-full-width-form-layout>
</template>

<script setup lang="ts">
import type { VDataTableHeaders } from "@/composables/declarations";
import type { HttpResult } from "@herodotus/core";
import type {
  SysEmployeeEntity,
  SysEmployeeConditions,
  SysEmployeeProps,
  SysEmployeeAllocatable,
} from "@herodotus/api";

import { isEmpty } from "lodash-es";
import { toast } from "@herodotus/core";
import { useTableItem } from "@/composables/hooks";
import { API, PAGE_NAME } from "@/configurations";
import { useTable, useDictionary } from "@/composables/hooks";

import { EmployeeSearch } from "../components";

defineOptions({ name: PAGE_NAME.SYS_OWNERSHIP_CONTENT, components: { EmployeeSearch } });

const headers = ref([
  { key: "employeeName", align: "center", title: "人员姓名" },
  { key: "identity", align: "center", title: "身份" },
  { key: "gender", align: "center", title: "性别" },
  { key: "description", align: "center", title: "备注" },
  { key: "reserved", align: "center", title: "保留数据" },
  { key: "status", align: "center", title: "状态" },
  { key: "actions", align: "center", title: "操作" },
]) as Ref<Array<VDataTableHeaders>>;

const rowKey: SysEmployeeProps = "employeeId";

const selectedItems = ref<SysEmployeeEntity[]>([]);

const { getDictionaryItemDisplay } = useDictionary("Gender", "Identity");
const { editedItem, overlay, onReturn } = useTableItem<SysEmployeeAllocatable>(
  API.core.sysEmployeeAllocatable(),
  PAGE_NAME.SYS_OWNERSHIP_CONTENT,
);

const { pageSize, pageNumber, totalItems, tableRows, totalPages, loading, conditions, findItems } = useTable<
  SysEmployeeConditions,
  SysEmployeeEntity
>(API.core.sysEmployee(), PAGE_NAME.SYS_EMPLOYEE);

const onSave = () => {
  if (isEmpty(selectedItems.value)) {
    toast.warning("您还没有选择任何人员！");
  } else {
    overlay.value = true;
    API.core
      .sysEmployee()
      .saveAllocatable({
        organizationId: editedItem.value.organizationId,
        departmentId: editedItem.value.departmentId,
        employees: selectedItems.value,
      })
      .then((response) => {
        const result = response as HttpResult<string>;
        overlay.value = false;
        onReturn();
        if (result.message) {
          toast.success(result.message);
        } else {
          toast.success("保存成功");
        }
      })
      .catch(() => {
        overlay.value = false;
        onReturn();
        toast.error("保存失败");
      });
  }
};
</script>
