<template>
  <v-row>
    <v-col cols="2">
      <h-dictionary-select
        v-model="conditions.area"
        dictionary="Area"
        label="主题使用区域"
        density="compact"
        hide-details
      ></h-dictionary-select>
    </v-col>
    <v-col cols="2">
      <h-dictionary-select
        v-model="conditions.action"
        dictionary="Action"
        label="主题操作"
        density="compact"
        hide-details
      ></h-dictionary-select>
    </v-col>
    <v-col cols="2">
      <h-dictionary-select
        v-model="conditions.purpose"
        dictionary="Retain"
        label="主题用途"
        density="compact"
        hide-details
      ></h-dictionary-select>
    </v-col>

    <v-col></v-col>
    <v-col cols="1" class="text-end pr-0">
      <h-button color="red" icon="mdi-broom" tooltip="清空" variant="text" @click.stop="onClear()"></h-button>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import type { MqttCategoryConditions } from "@herodotus/api";

defineOptions({ name: "SysElementCondition" });

const conditions = defineModel<MqttCategoryConditions>({
  default: () => ({}) as MqttCategoryConditions,
  required: true,
});

const onClear = () => {
  conditions.value = {} as MqttCategoryConditions;
};
</script>
