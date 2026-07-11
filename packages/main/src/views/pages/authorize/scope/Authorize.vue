<template>
  <h-authorize-form-layout :title="title" :overlay="overlay">
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
import type { HttpResult } from "@herodotus/core";
import type {
  OAuth2ScopeEntity,
  OAuth2ScopeAssignedBody,
  SysPermissionEntity,
  SysPermissionProps,
  SysPermissionConditions,
  OAuth2PermissionBody,
} from "@herodotus/api";
import type { VDataTableHeaders } from "@/composables/declarations";

import { toast } from "@herodotus/core";
import { useEditFinish } from "@herodotus/framework";
import { useTableItem, useTable } from "@/composables/hooks";
import { API, PAGE_NAME } from "@/configurations";

defineOptions({ name: PAGE_NAME.OAUTH2_SCOPE_AUTHORIZE });

const { editedItem, title, overlay } = useTableItem<OAuth2ScopeEntity>(
  API.core.oauth2Scope(),
  PAGE_NAME.OAUTH2_SCOPE_AUTHORIZE,
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

const { onFinish } = useEditFinish();

onMounted(() => {
  selectedItems.value = editedItem.value.permissions;
});

const onSave = () => {
  let scopeId = editedItem.value.scopeId;
  let permissions: Array<OAuth2PermissionBody> = selectedItems.value.map((item) => {
    return {
      permissionId: item.permissionId,
      permissionCode: item.permissionCode,
      permissionName: item.permissionName,
    };
  });
  let data: OAuth2ScopeAssignedBody = { scopeId: scopeId, permissions: permissions };
  API.core
    .oauth2Scope()
    .assigned(data)
    .then((response) => {
      const result = response as HttpResult<OAuth2ScopeEntity>;
      overlay.value = false;
      onFinish();
      if (result.message) {
        toast.success(result.message);
      } else {
        toast.success("保存成功");
      }
    })
    .catch(() => {
      overlay.value = false;
      onFinish();
      toast.error("保存失败");
    });
};
</script>
