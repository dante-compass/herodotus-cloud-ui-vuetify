<template>
  <h-authorize-form-layout :title="title" :overlay="overlay" @cancel="onReturn">
    <v-card rounded="lg">
      <v-data-table-server
        v-model="selectedItems"
        v-model:items-per-page="pageSize"
        v-model:page="pageNumber"
        :items-length="totalItems"
        :headers="headers"
        :items="tableRows"
        :item-value="rowKey"
        :item-selectable="rowKey"
        :loading="loading"
        show-select
        select-strategy="page"
        striped="even"
        hover
        hide-default-footer
        disable-sort
        return-object
        @update:options="findItems"
      ></v-data-table-server>
    </v-card>

    <template #right>
      <h-authorize-list
        v-model="selectedItems"
        prepend-title="permissionCode"
        append-title="permissionName"
        :row-key="rowKey"
        @save="onSave()"
      ></h-authorize-list>
    </template>
  </h-authorize-form-layout>
</template>

<script setup lang="ts">
import type {
  SysAttributeEntity,
  SysPermissionEntity,
  SysPermissionProps,
  SysPermissionConditions,
} from "@herodotus/api";
import type { VDataTableHeaders } from "@/composables/declarations";

import { isEmpty } from "lodash-es";
import { useTableItem, useTable } from "@/composables/hooks";
import { API, PAGE_NAME } from "@/configurations";

defineOptions({ name: PAGE_NAME.SYS_ATTRIBUTE_AUTHORIZE });

const { editedItem, overlay, title, assign, onReturn } = useTableItem<SysAttributeEntity>(
  API.core.sysAttribute(),
  PAGE_NAME.SYS_ATTRIBUTE_AUTHORIZE,
);
const { loading, pageNumber, pageSize, tableRows, totalItems, findItems } = useTable<
  SysPermissionConditions,
  SysPermissionEntity
>(API.core.sysPermission(), PAGE_NAME.SYS_PERMISSION, true);

const selectedItems = ref([]) as Ref<Array<SysPermissionEntity>>;
const rowKey: SysPermissionProps = "permissionId";

const headers = ref([
  { key: "permissionName", align: "center", title: "权限名称" },
  { key: "permissionCode", align: "center", title: "权限代码" },
]) as Ref<Array<VDataTableHeaders>>;

onMounted(() => {
  selectedItems.value = editedItem.value.permissions;
});

const onSave = () => {
  let attributeId = editedItem.value.attributeId;
  let permissions = selectedItems.value.map((item) => item[rowKey]);
  const items = !isEmpty(permissions) ? permissions : [""];
  assign({ attributeId: attributeId, permissions: items });
};
</script>
