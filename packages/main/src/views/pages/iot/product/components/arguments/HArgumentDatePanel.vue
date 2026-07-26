<template>
  <div>
    <h-label text="时间格式"></h-label>
    <v-text-field v-model="format" density="compact" disabled readonly></v-text-field>
  </div>
</template>

<script setup lang="ts">
import type { TslStatus } from '@herodotus/api';

defineOptions({ name: 'HArgumentTextPanel' });

const format = shallowRef('String类型的UTC时间戳(毫秒)');

interface Props {
  status?: TslStatus;
}

const props = withDefaults(defineProps<Props>(), {
  status: 'create',
});
</script>
