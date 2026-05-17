<template>
  <v-row>
    <v-col cols="2">
      <v-text-field v-model="conditions.category" label="分类" density="compact" hide-details clearable></v-text-field>
    </v-col>
    <v-col cols="2">
      <v-text-field v-model="conditions.name" label="字面量" density="compact" hide-details clearable></v-text-field>
    </v-col>
    <v-col cols="2">
      <v-text-field v-model="conditions.label" label="显示值" density="compact" hide-details clearable></v-text-field>
    </v-col>
    <v-col></v-col>
    <v-col cols="1" class="text-end pr-0">
      <h-button color="red" icon="mdi-broom" tooltip="清空" variant="text" @click.stop="onClear()"></h-button>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import type { SysDictionaryConditions } from "@herodotus/api";

defineOptions({ name: "SysDictionaryCondition" });

const conditions = defineModel<SysDictionaryConditions>({
  default: () => ({}),
  required: true,
});

const onClear = () => {
  conditions.value = {} as SysDictionaryConditions;
};
</script>
