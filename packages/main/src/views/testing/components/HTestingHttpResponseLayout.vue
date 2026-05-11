<template>
  <v-row>
    <v-col cols="8">
      <slot></slot>
    </v-col>
    <v-col cols="4" sm="4">
      <h-testing-http-response v-model="response"></h-testing-http-response>
      <slot name="extend"></slot>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import type { JSONDataType } from "@/composables/declarations";

import HTestingHttpResponse from "./HTestingHttpResponse.vue";

defineOptions({ name: "HTestingHttpResponseLayout", components: { HTestingHttpResponse } });

const response = defineModel<JSONDataType>("response", {
  default: () => ({}),
  required: true,
});
</script>
