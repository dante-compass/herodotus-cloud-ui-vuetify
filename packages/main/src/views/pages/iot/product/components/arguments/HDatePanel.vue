<template>
  <div>
    <h-label text="时间格式"></h-label>
    <v-text-field v-model="format" density="compact" disabled readonly></v-text-field>
  </div>
</template>

<script setup lang="ts">
import type { Specification, DateSpecs } from "@herodotus/api";
import { shallowRef } from "vue";

defineOptions({
  name: "HTextPanel",
});

const entity = defineModel<Specification<DateSpecs>>({
  default: () => ({}),
});

const format = shallowRef("String类型的UTC时间戳(毫秒)");
</script>
