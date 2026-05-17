<template>
  <h-full-width-form-layout :title="title">
    <v-card flat>
      <v-card-item>
        <v-tabs v-model="tab" class="font-weight-bold">
          <v-tab text="物模型" value="tsl"></v-tab>
          <v-tab text="实名认证" value="realname"></v-tab>
        </v-tabs>
      </v-card-item>
    </v-card>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item value="tsl">
        <h-function-table
          v-if="isShowTable"
          :product-id="editedItem.id"
          :product-key="editedItem.productKey"
        ></h-function-table>
      </v-tabs-window-item>
      <v-tabs-window-item value="realname">
        <v-card flat>
          <v-card-text>Lorem ipsum dolor sit amet consectetur adipisicing elit.</v-card-text>
        </v-card>
      </v-tabs-window-item>
    </v-tabs-window>
  </h-full-width-form-layout>
</template>

<script setup lang="ts">
import type { ProductEntity } from "@herodotus/api";

import { API } from "@/configurations";
import { useTableItem } from "@/composables/hooks";

import { HFunctionTable } from "./components";

defineOptions({ name: "IotProductInfo" });

const tab = shallowRef("tsl");

const { editedItem, operation, title } = useTableItem<ProductEntity>(API.core.iotProduct());

const isShowTable = shallowRef(false);

onMounted(() => {
  console.log("-----ddd----", editedItem.value.id);
  console.log("-----ddd----", editedItem.value.productKey);
  if (editedItem.value.id && editedItem.value.productKey) {
    isShowTable.value = true;
  } else {
    false;
  }
});
</script>
