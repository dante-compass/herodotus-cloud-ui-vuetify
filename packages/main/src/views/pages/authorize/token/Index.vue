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
    <template #item.actions="{ item }">
      <h-action-delete-button @click="deleteItemById(item[rowKey])"></h-action-delete-button>
    </template>
  </h-data-table>
</template>

<script setup lang="ts">
import type {
  OAuth2AuthorizationEntity,
  OAuth2AuthorizationConditions,
  OAuth2AuthorizationProps,
} from "@herodotus/api";
import type { VDataTableHeaders } from "@/composables/declarations";

import { useTable, useDateTime } from "@/composables/hooks";
import { API, PAGE_NAME } from "@/configurations";

defineOptions({ name: PAGE_NAME.OAUTH2_TOKEN });

const headers = ref([
  { key: "registeredClientId", align: "center", title: "客户端ID" },
  { key: "principalName", align: "center", title: "用户名" },
  { key: "authorizationGrantType", align: "center", title: "认证模式" },
  {
    key: "accessTokenIssuedAt",
    align: "center",
    title: "访问Token颁发时间",
    value: (item) => defaultFormat(item.accessTokenIssuedAt),
  },
  {
    key: "accessTokenExpiresAt",
    align: "center",
    title: "访问Token过期时间",
    value: (item) => defaultFormat(item.accessTokenExpiresAt),
  },
  {
    key: "refreshTokenIssuedAt",
    align: "center",
    title: "刷新Token颁发时间",
    value: (item) => defaultFormat(item.refreshTokenIssuedAt),
  },
  {
    key: "refreshTokenExpiresAt",
    align: "center",
    title: "刷新Token过期时间",
    value: (item) => defaultFormat(item.refreshTokenExpiresAt),
  },
  { key: "actions", align: "center", title: "操作" },
]) as Ref<Array<VDataTableHeaders>>;

const rowKey: OAuth2AuthorizationProps = "id";

const { loading, pageNumber, pageSize, tableRows, totalPages, totalItems, deleteItemById, findItems } = useTable<
  OAuth2AuthorizationConditions,
  OAuth2AuthorizationEntity
>(API.core.oauth2Authorization(), PAGE_NAME.OAUTH2_TOKEN, false, ["accessTokenIssuedAt"], "DESC");

const { defaultFormat } = useDateTime();
</script>
