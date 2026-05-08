<template>
  <div>HEventsPanel</div>
</template>

<script setup lang="ts">
import type { TslFunctionEntity, TslArgumentEntity, Specification, Specs } from "@herodotus/api";

defineOptions({ name: "HEventsPanel" });

const entity = defineModel<TslFunctionEntity>({
  default: () => ({}),
});
</script>
