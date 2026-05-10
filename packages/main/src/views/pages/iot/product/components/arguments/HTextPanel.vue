<template>
  <div>
    <h-label text="数据长度" required></h-label>
    <v-text-field
      v-model="entity.dataType.specs.length"
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

const entity = defineModel<Specification<TextSpecs>>({
  default: () => ({}),
});

onMounted(() => {
  if (!entity.value.dataType.specs.length) {
    entity.value.dataType.specs.length = "10240";
  }
});
</script>
