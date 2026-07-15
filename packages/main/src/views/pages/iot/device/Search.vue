<template>
  <v-row>
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
      <v-text-field
        v-model="conditions.deviceName"
        label="Device Name"
        density="compact"
        hide-details
        clearable
      ></v-text-field>
    </v-col>
    <v-col cols="2">
      <v-text-field
        v-model="conditions.clientId"
        label="Client Id"
        density="compact"
        hide-details
        clearable
      ></v-text-field>
    </v-col>
    <v-col></v-col>
    <v-col cols="1" class="text-end pr-0">
      <h-icon-button color="red" icon="mdi-broom" tooltip="清空" variant="text" @click.stop="onClear()"></h-icon-button>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import type { DeviceConditions } from "@herodotus/api";

defineOptions({ name: "MqttAuthorityConditions" });

const conditions = defineModel<DeviceConditions>({
  default: () => ({}) as DeviceConditions,
  required: true,
});

const onClear = () => {
  conditions.value = {} as DeviceConditions;
};
</script>
