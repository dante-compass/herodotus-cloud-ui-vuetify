<template>
  <h-testing-content-card title="请求响应结果：" subtitle="显示请求响应内容，方便调试和查看">
    <vue-json-pretty :data="response"></vue-json-pretty>
  </h-testing-content-card>
</template>

<script setup lang="ts">
import type { JSONDataType } from '@/composables/declarations';

import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';

import HTesingContentCard from './HTesingContentCard.vue';

defineOptions({ name: 'HTestingHttpResponse', components: { HTesingContentCard } });

const response = defineModel({
  type: Object as PropType<JSONDataType>,
  default: () => ({}),
  required: true,
});
</script>
