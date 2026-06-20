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

    <template #item.category="{ item }">
      {{ item.category ? item.category.categoryName : "" }}
    </template>

    <template #item.nodeType="{ value }">
      <v-chip v-if="value" density="compact" rounded="lg" color="cyan" label>
        {{ getDictionaryItemDisplay("NodeType", value) }}
      </v-chip>
    </template>

    <template #item.gatewayProtocol="{ value }">
      <v-chip v-if="value" density="compact" rounded="lg" color="cyan" label>
        {{ getDictionaryItemDisplay("GatewayProtocol", value) }}
      </v-chip>
    </template>

    <template #item.networkingMethod="{ value }">
      <v-chip v-if="value" density="compact" rounded="lg" color="cyan" label>
        {{ getDictionaryItemDisplay("NetworkingMethod", value) }}
      </v-chip>
    </template>

    <template #item.authenticationMode="{ value }">
      <v-chip v-if="value" density="compact" rounded="lg" color="cyan" label>
        {{ getDictionaryItemDisplay("AuthenticationMode", value) }}
      </v-chip>
    </template>

    <template #item.registration="{ item }">
      <div class="d-flex justify-center">
        <v-switch
          :model-value="item.registration"
          :label="item.registration ? '开启' : '关闭'"
          density="comfortable"
          hide-details
          inset
          @update:model-value="onRegistrationChange(item, $event)"
        ></v-switch>
      </div>
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
import type { HttpResult } from "@herodotus/core";
import type { VDataTableHeaders } from "@/composables/declarations";

import { toast } from "@herodotus/core";
import { useTable, useDictionary } from "@/composables/hooks";
import { API, PAGE_NAME } from "@/configurations";

import Search from "./Search.vue";

defineOptions({ name: PAGE_NAME.IOT_PRODUCT, components: { Search } });

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
  { key: "reserved", align: "center", title: "保留数据" },
  { key: "status", align: "center", title: "状态" },
  { key: "actions", align: "center", title: "操作" },
]) as Ref<Array<VDataTableHeaders>>;

const rowKey: ProductProps = "id";

const { getDictionaryItemDisplay } = useDictionary(
  "NodeType",
  "GatewayProtocol",
  "NetworkingMethod",
  "AuthenticationMethod",
);

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

const onRegistrationChange = (item: ProductEntity, event: boolean) => {
  item.registration = event as boolean;
  API.core
    .iotProduct()
    .toggle(item)
    .then((response) => {
      const result = response as HttpResult<ProductEntity>;
      if (result.message) {
        toast.success(result.message);
      } else {
        toast.success("操作成功");
      }
    })
    .catch((error) => {
      toast.error("操作失败");
    });
};
</script>
