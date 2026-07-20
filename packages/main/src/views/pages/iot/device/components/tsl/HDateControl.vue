<template>
  <v-form >
    <h-date-time
      v-model="dateTime"
      placeholder="请选择时间"
      density="compact"
      :rules="[(v: string) => !!v || '请选择时间']"
    ></h-date-time>
  </v-form>
  <h-date-time
    v-model="dateTime"
    placeholder="请选择时间"
    density="compact"
    :rules="[(v: string) => !!v || '请选择时间']"
  ></h-date-time>
</template>

<script setup lang="ts">
import { moment } from '@herodotus/core';

defineOptions({ name: 'HDateControl' });

const timestamp = defineModel<string>();

const dateTime = computed({
  get: () => (timestamp.value ? moment(Number(timestamp.value)).format('YYYY-MM-DD HH:mm:ss') : ''),
  set: (value: string) => {
    if (value) {
      // （小写x）以毫秒为单位，返回值为字符串类型
      timestamp.value = moment(value).format('x');
    } else {
      timestamp.value = '';
    }
  },
});
</script>
