<template>
  <v-row>
    <v-col cols="2">
      <v-text-field
        v-model="conditions.topic"
        label="Mqtt客户端ID"
        density="compact"
        hide-details
        clearable
      ></v-text-field>
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
        v-model="conditions.permission"
        dictionary="Permission"
        label="主题权限"
        density="compact"
        hide-details
      ></h-dictionary-select>
    </v-col>
    <v-col cols="2">
      <h-dictionary-select
        v-model="conditions.qos"
        dictionary="Qos"
        label="Qos"
        density="compact"
        hide-details
      ></h-dictionary-select>
    </v-col>
    <v-col cols="2">
      <h-dictionary-select
        v-model="conditions.retain"
        dictionary="Retain"
        label="保留数据"
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
import type { MqttAuthorityConditions } from "@herodotus/api";

defineOptions({ name: "SysElementCondition" });

const conditions = defineModel<MqttAuthorityConditions>({
  default: () => ({}) as MqttAuthorityConditions,
  required: true,
});

const onClear = () => {
  conditions.value = {} as MqttAuthorityConditions;
};
</script>
