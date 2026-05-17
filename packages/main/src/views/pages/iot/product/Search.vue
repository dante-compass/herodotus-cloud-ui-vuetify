<template>
  <v-row>
    <v-col cols="2">
      <v-text-field
        v-model="conditions.productKey"
        label="ProductKey"
        density="compact"
        hide-details
        clearable
      ></v-text-field>
    </v-col>
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
        v-model="conditions.categoryName"
        label="品类名称"
        density="compact"
        hide-details
        clearable
      ></v-text-field>
    </v-col>
    <v-col></v-col>
    <v-col cols="1" class="text-end pr-0">
      <h-button color="red" icon="mdi-broom" tooltip="清空" variant="text" @click.stop="onClear()"></h-button>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import type { ProductConditions } from "@herodotus/api";

defineOptions({ name: "SysElementCondition" });

const conditions = defineModel<ProductConditions>({
  default: () => ({}),
  required: true,
});

const onClear = () => {
  conditions.value = {} as ProductConditions;
};
</script>
