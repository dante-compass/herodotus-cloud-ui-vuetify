<template>
  <h-testing-card title="请求响应结果：" subtitle="显示请求响应内容，方便调试和查看">
    <vue-json-pretty show-icon show-line-number :data="response"></vue-json-pretty>
  </h-testing-card>
</template>

<script setup lang="ts">
import type { JSONDataType } from "@/composables/declarations";

import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";

import HTestingCard from "./HTestingCard.vue";

defineOptions({ name: "HTestingHttpResponse", components: { HTestingCard } });

const response = defineModel<JSONDataType>({
  default: () => ({}),
  required: true,
});
</script>
