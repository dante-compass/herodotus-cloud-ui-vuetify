<template>
  <v-row>
    <v-col cols="2">
      <v-text-field
        v-model="conditions.productName"
        label="产品名称"
        density="compact"
        hide-details
        clearable
      ></v-text-field>
    </v-col>
    <v-col cols="2">
      <v-text-field
        v-model="conditions.productKey"
        label="Product Key"
        density="compact"
        hide-details
        clearable
      ></v-text-field>
    </v-col>
    <v-col cols="2">
      <h-dictionary-select
        v-model="conditions.nodeType"
        dictionary="NodeType"
        label="节点类型"
        density="compact"
        hide-details
      ></h-dictionary-select>
    </v-col>
    <v-col></v-col>
    <v-col cols="1" class="text-end pr-0">
      <h-icon-button color="red" icon="mdi-broom" tooltip="清空" variant="text" @click.stop="onClear()"></h-icon-button>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import type { ProductConditions } from "@herodotus/api";

defineOptions({ name: "ProductConditions" });

const conditions = defineModel<ProductConditions>({
  default: () => ({}) as ProductConditions,
  required: true,
});

const onClear = () => {
  conditions.value = {} as ProductConditions;
};
</script>
