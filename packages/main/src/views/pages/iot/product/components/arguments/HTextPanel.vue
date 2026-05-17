<template>
  <div>
    <h-label text="数据长度" required></h-label>
    <v-text-field
      v-model="model.dataType.specs.length"
      density="comfortable"
      type="number"
      suffix="丨字节"
      :clearable="false"
      :rules="[(v: string) => !!v || '数据长度不能为空']"
    ></v-text-field>
  </div>
</template>

<script setup lang="ts">
import type { Specification, TextSpecs } from "@herodotus/api";

defineOptions({ name: "HTextPanel" });

const model = defineModel<Specification<TextSpecs>>({
  default: () => ({}),
});

onMounted(() => {
  if (!model.value.dataType.specs.length) {
    model.value.dataType.specs.length = "10240";
  }
});
</script>
