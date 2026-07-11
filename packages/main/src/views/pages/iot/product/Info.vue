<template>
  <h-information-form-layout :title="title" :overlay="overlay" @finish="onReturn">
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
            {{ visible ? editedItem.productSecret : "********************" }}
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
            <template #append>
              <v-btn variant="plain" text="查看详情"></v-btn>
            </template>
          </h-label-item>
        </v-col>
        <v-col></v-col>
      </v-row>
    </template>
  </h-information-form-layout>
</template>

<script setup lang="ts">
import type { ProductEntity } from "@herodotus/api";

import { API, PAGE_NAME } from "@/configurations";
import { useTableItem } from "@/composables/hooks";

import { useClipboard } from "@vueuse/core";
import { HFunctionTable } from "./components";
import { OperationEnum } from "@herodotus/core";

defineOptions({ name: PAGE_NAME.IOT_PRODUCT_INFO });

// const tab = shallowRef("tsl");

const { copy, copied, isSupported } = useClipboard({ legacy: true });
const { editedItem, overlay, title, onReturn } = useTableItem<ProductEntity>(
  API.core.iotProduct(),
  PAGE_NAME.IOT_PRODUCT_INFO,
);

const visible = shallowRef(false);
// const isShowTable = shallowRef(false);
</script>
