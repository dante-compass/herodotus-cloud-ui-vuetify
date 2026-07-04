<template>
  <v-row>
    <v-col cols="2">
      <v-text-field
        v-model="conditions.clientId"
        label="Mqtt客户端ID"
        density="compact"
        hide-details
        clearable
      ></v-text-field>
    </v-col>
    <v-col cols="2">
      <v-text-field
        v-model="conditions.username"
        label="Mqtt用户名"
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
import type { MqttAccountConditions } from "@herodotus/api";

defineOptions({ name: "SysElementCondition" });

const conditions = defineModel<MqttAccountConditions>({
  default: () => ({}) as MqttAccountConditions,
  required: true,
});

const onClear = () => {
  conditions.value = {} as MqttAccountConditions;
};
</script>
