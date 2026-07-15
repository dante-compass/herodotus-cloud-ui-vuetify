<template>
  <v-row>
    <v-col cols="2">
      <v-text-field
        v-model="conditions.employeeName"
        label="姓名"
        density="compact"
        hide-details
        clearable
      ></v-text-field>
    </v-col>
    <v-col cols="2">
      <v-text-field
        v-model="conditions.mobilePhoneNumber"
        label="手机号码"
        density="compact"
        hide-details
        clearable
      ></v-text-field>
    </v-col>
    <v-col cols="2">
      <v-text-field v-model="conditions.email" label="电子邮件" density="compact" hide-details clearable></v-text-field>
    </v-col>
    <v-col cols="2">
      <h-dictionary-select
        v-model="conditions.identity"
        dictionary="Identity"
        label="身份"
        density="compact"
        hide-details
      ></h-dictionary-select>
    </v-col>
    <v-col cols="2">
      <h-dictionary-select
        v-model="conditions.gender"
        dictionary="Gender"
        label="性别"
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
import type { SysEmployeeConditions } from "@herodotus/api";

defineOptions({ name: "SysElementCondition" });

const conditions = defineModel<SysEmployeeConditions>({
  default: () => ({}) as SysEmployeeConditions,
  required: true,
});

const onClear = () => {
  conditions.value = {} as SysEmployeeConditions;
};
</script>
