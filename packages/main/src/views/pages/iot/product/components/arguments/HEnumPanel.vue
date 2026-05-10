<template>
  <div><h-label text="布尔值" required></h-label></div>
</template>

<script setup lang="ts">
import type { TslArgumentEntity } from "@herodotus/api";

import { HDictionarySelect } from "@/components/library/HSelect";

defineOptions({
  name: "HEnumPanel",
  components: {
    HDictionarySelect,
  },
});

const entity = defineModel<TslArgumentEntity>({
  default: () => ({}),
});
</script>
