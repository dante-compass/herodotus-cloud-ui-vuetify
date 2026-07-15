<template>
  <v-row>
    <v-col cols="2">
      <v-text-field v-model="conditions.path" label="请求路径" density="compact" hide-details clearable></v-text-field>
    </v-col>
    <v-col cols="2">
      <v-text-field v-model="conditions.title" label="组件标题" density="compact" hide-details clearable></v-text-field>
    </v-col>
    <v-col></v-col>
    <v-col cols="1" class="text-end pr-0">
      <h-icon-button color="red" icon="mdi-broom" tooltip="清空" variant="text" @click.stop="onClear()"></h-icon-button>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import type { SysElementConditions } from "@herodotus/api";

defineOptions({ name: "SysElementCondition" });

const conditions = defineModel<SysElementConditions>({
  default: () => ({}) as SysElementConditions,
  required: true,
});

const onClear = () => {
  conditions.value = {} as SysElementConditions;
};
</script>
