<template>
  <h-information-form-layout :title="title" :overlay="overlay">
    <template #header>
      <v-row>
        <v-col cols="3">
          <h-label-item label="Product Key：" justify="end">
            {{ editedItem.productKey }}
            <template #append>
              <h-icon-button
                :disable="!isSupported"
                :icon="copied ? 'mdi-checkbox-marked-circle-auto-outline' : 'mdi-content-copy'"
                tooltip="复制"
                variant="text"
                @click="copy(editedItem.productKey)"
              ></h-icon-button>
            </template>
          </h-label-item>
        </v-col>
        <v-col cols="3">
          <h-label-item label="Product Secret：" justify="end">
            {{ editedItem.productKey }}
            <template #append>
              <h-icon-button
                :icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                tooltip="显示"
                variant="text"
                @click="visible = !visible"
              ></h-icon-button>
            </template>
          </h-label-item>
        </v-col>
        <v-col cols="3">
          <h-label-item label="设备数量：" justify="end">
            {{ editedItem.quantity ? editedItem.quantity : 0 }}
          </h-label-item>
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

import { useClipboard } from "@vueuse/core";
import { HFunctionTable } from "./components";

defineOptions({ name: "IotProductInfo" });

const tab = shallowRef("tsl");

const { copy, copied, isSupported } = useClipboard({ legacy: true });
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
