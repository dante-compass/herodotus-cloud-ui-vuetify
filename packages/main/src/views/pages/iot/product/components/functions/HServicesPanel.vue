<template>
  <div>HServicesPanel</div>
</template>

<script setup lang="ts">
import type { TslFunctionEntity, TslArgumentEntity, Specification, Specs } from "@herodotus/api";

defineOptions({ name: "HServicesPanel" });

const entity = defineModel<TslFunctionEntity>({
  default: () => ({}),
});
</script>
