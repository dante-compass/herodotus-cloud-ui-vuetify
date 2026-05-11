<template>
  <div>
    <h-label text="布尔值" required></h-label>
    <v-text-field
      v-model="model.dataType.specs['0']"
      density="compact"
      placeholder="如：关"
      :rules="[(v: string) => !!v || '布尔值不能为空']"
    >
      <template #prepend>
        <div class="text-subtitle1">{{ "0 - " }}</div>
      </template>
    </v-text-field>
    <v-text-field
      v-model="model.dataType.specs['1']"
      density="compact"
      placeholder="如：开"
      :rules="[(v: string) => !!v || '布尔值不能为空']"
    >
      <template #prepend>
        <div class="text-subtitle1">{{ "1 - " }}</div>
      </template>
    </v-text-field>
  </div>
</template>

<script setup lang="ts">
import type { Specification, BoolSpecs } from "@herodotus/api";

import { HDictionarySelect } from "@/components/library/HDictionary";

defineOptions({ name: "HBoolPanel", components: { HDictionarySelect } });

const model = defineModel<Specification<BoolSpecs>>({
  default: () => ({}),
});
</script>
