<template>
  <div>
    <h-label text="功能名称：" required></h-label>
    <v-text-field
      v-model="model.name"
      density="compact"
      placeholder="请输入您的功能名称"
      :rules="[(v: string) => !!v || '功能名称不能为空']"
    ></v-text-field>
    <h-label text="标识符：" required></h-label>
    <v-text-field
      v-model="model.identifier"
      density="compact"
      placeholder="请输入您的标识符"
      :rules="[(v: string) => !!v || '标识符不能为空']"
    ></v-text-field>
  </div>
</template>

<script setup lang="ts">
import type { Characteristic } from "@herodotus/api";

defineOptions({ name: "HCharacteristicPanel" });

const model = defineModel<Characteristic>({
  default: () => ({}),
});
</script>
