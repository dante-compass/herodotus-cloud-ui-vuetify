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
    <template #item.lastUsed="{ value }">
      {{ defaultFormat(value) }}
    </template>

    <template #item.actions="{ item }">
      <h-action-delete-button @click="deleteItemById(item[deleteKey])"></h-action-delete-button>
    </template>
  </h-data-table>
</template>

<script setup lang="ts">
import type {
  OAuth2PersistentTokenEntity,
  OAuth2PersistentTokenConditions,
  OAuth2PersistentTokenProps,
} from "@herodotus/api";
import type { VDataTableHeaders } from "@/composables/declarations";

import { useTable, useDateTime } from "@/composables/hooks";
import { API, PAGE_NAME } from "@/configurations";

defineOptions({ name: PAGE_NAME.OAUTH2_PERSISTENT });

const headers = ref([
  { key: "series", align: "center", title: "Remember Me ID" },
  { key: "username", align: "center", title: "用户名" },
  { key: "token", align: "center", title: "Token 值" },
  { key: "lastUsed", align: "center", title: "上次使用时间" },
  { key: "actions", field: "actions", align: "center", title: "操作" },
]) as Ref<Array<VDataTableHeaders>>;

const rowKey: OAuth2PersistentTokenProps = "series";
const deleteKey: OAuth2PersistentTokenProps = "username";

const { loading, pageNumber, pageSize, tableRows, totalPages, totalItems, deleteItemById, findItems } = useTable<
  OAuth2PersistentTokenConditions,
  OAuth2PersistentTokenEntity
>(API.core.oauth2PersistentToken(), PAGE_NAME.OAUTH2_PERSISTENT, false, ["lastUsed"], "DESC");

const { defaultFormat } = useDateTime();
</script>
