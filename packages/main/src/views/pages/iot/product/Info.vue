<template>
  <h-information-form-layout :title="title" :overlay="overlay">
    <template #header>
      <v-row>
        <v-col cols="3">
          <v-list-item :title="editedItem.productKey">
            <template #prepend>
              <h-label text="Product Key：" hide-details class="mr-2"></h-label>
            </template>
            <template #append>
              <v-btn icon="mdi-delete" tooltip="复制" variant="text"></v-btn>
            </template>
          </v-list-item>
        </v-col>
        <v-col cols="3">
          <v-list-item :title="visible ? editedItem.productSecret : '*****************************'">
            <template #prepend>
              <h-label text="Product Secret：" hide-details class="mr-2"></h-label>
            </template>
            <template #append>
              <v-btn
                :icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                tooltip="显示"
                variant="text"
                @click="visible = !visible"
              ></v-btn>
            </template>
          </v-list-item>
        </v-col>
        <v-col cols="3">
          <v-list-item :title="editedItem.quantity ? editedItem.quantity : 0">
            <template #prepend>
              <h-label text="设备数量：" hide-details class="mr-2"></h-label>
            </template>
            <template #append>
              <v-btn
                :icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                tooltip="显示"
                variant="text"
                @click="visible = !visible"
              ></v-btn>
              <v-btn text="测试" tooltip="显示" @click="visible = !visible"></v-btn>
              <v-btn text="测试" tooltip="显示" @click="visible = !visible"></v-btn>
            </template>
          </v-list-item>
        </v-col>
        <v-col></v-col>
      </v-row>
    </template>

    <v-card flat>
      <v-tabs v-model="tab" class="font-weight-bold">
        <v-tab text="物模型" value="tsl"></v-tab>
        <v-tab text="实名认证" value="realname"></v-tab>
      </v-tabs>

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
    </v-card>
  </h-information-form-layout>

  <!-- <h-full-width-form-layout :title="title">
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
  </h-full-width-form-layout> -->
</template>

<script setup lang="ts">
import type { ProductEntity } from "@herodotus/api";

import { API } from "@/configurations";
import { useTableItem } from "@/composables/hooks";

import { HFunctionTable } from "./components";

defineOptions({ name: "IotProductInfo" });

const tab = shallowRef("tsl");

const { editedItem, overlay, title } = useTableItem<ProductEntity>(API.core.iotProduct());

const visible = shallowRef(false);
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
