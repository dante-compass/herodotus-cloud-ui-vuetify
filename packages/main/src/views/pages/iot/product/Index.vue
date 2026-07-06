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
  <!-- <h-data-iterator
    v-model:page-size="pageSize"
    v-model:page-number="pageNumber"
    v-model:total-pages="totalPages"
    v-model:total-items="totalItems"
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

    <template #item="{ item }">
      <v-card border>
        <v-card-item>
          <template #prepend>
            <v-icon icon="mdi-cube-outline" size="x-large" color="primary" class="mr-2"></v-icon>
          </template>

          <v-card-title class="py-2">{{ item.raw.productKey }}</v-card-title>

          <template #append>
            <v-btn prepend-icon="mdi-circle" size="small"> Share </v-btn>
          </template>
        </v-card-item>

        <v-card-text>
          <v-row>
            <v-col cols="1"></v-col>
            <v-col cols="5">
              <div class="text-caption text-grey">设备类型：</div>
              <div class="text-body-2 font-weight-bold text-grey-darken-2">
                {{ getDictionaryItemDisplay("NodeType", item.raw.nodeType) }}
              </div>
            </v-col>
            <v-col cols="6">
              <div class="text-caption text-grey">接入方式：</div>
              <div class="text-body-2 font-weight-bold text-grey-darken-2">
                {{ getDictionaryItemDisplay("NetworkingMethod", item.raw.networkingMethod) }}
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="1"></v-col>
            <v-col cols="5">
              <div class="text-caption text-grey">网关协议：</div>
              <div class="text-body-2 font-weight-bold text-grey-darken-2">
                {{ getDictionaryItemDisplay("GatewayProtocol", item.raw.gatewayProtocol) }}
              </div>
            </v-col>
            <v-col cols="6">
              <div class="text-caption text-grey">认证方式：</div>
              <div class="text-body-2 font-weight-bold text-grey-darken-2">
                {{ getDictionaryItemDisplay("AuthenticationMode", item.raw.authenticationMode) }}
              </div>
            </v-col>
          </v-row>
          <v-divider class="mt-2"></v-divider>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <h-action-edit-button @click="toEdit(item.raw)"></h-action-edit-button>
          <h-action-info-button @click="toInfo(item.raw)"></h-action-info-button>
          <h-action-delete-button
            v-if="!item.raw.reserved"
            @click="deleteItemById(item.raw[rowKey])"
          ></h-action-delete-button>
        </v-card-actions>
      </v-card>
    </template>
  </h-data-iterator> -->
</template>

<script setup lang="ts">
import type { ProductEntity, ProductConditions, ProductProps } from "@herodotus/api";
import type { HttpResult } from "@herodotus/core";
import type { VDataTableHeaders } from "@/composables/declarations";

import { toast } from "@herodotus/core";
import { useSettingsStore } from "@herodotus/framework";
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
