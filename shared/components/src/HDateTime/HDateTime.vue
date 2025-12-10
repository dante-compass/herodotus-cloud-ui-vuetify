<template>
  <v-text-field v-model="dateTime" glow v-bind="$attrs">
    <template #prepend-inner>
      <h-date-picker v-model="date"></h-date-picker>
    </template>

    <template #append-inner>
      <h-time-picker v-model="time"></h-time-picker>
    </template>
  </v-text-field>
</template>

<script setup lang="ts">
import { shallowRef, watch } from 'vue';
import { moment } from '@herodotus/core';
import { VTextField } from 'vuetify/components';
import HDatePicker from './HDatePicker.vue';
import HTimePicker from './HTimePicker.vue';

defineOptions({ name: 'HDateTime', components: { VTextField, HDatePicker, HTimePicker } });

const dateTime = defineModel<string>();

const time = shallowRef('');
const date = shallowRef('');

const combineDateTime = (dateStr: string, timeStr: string) => {
  // 处理空值，设置默认值
  const defaultDate = '1970-01-01'; // 或 moment().format('YYYY-MM-DD') 使用当前日期
  const defaultTime = '00:00:00';

  // 如果日期为空，使用默认日期
  const effectiveDate = dateStr && dateStr.trim() !== '' ? dateStr : defaultDate;

  // 如果时间为空，使用默认时间
  const effectiveTime = timeStr && timeStr.trim() !== '' ? timeStr : defaultTime;

  // 组合日期时间
  return moment(`${effectiveDate} ${effectiveTime}`).format('YYYY-MM-DD HH:mm:ss');
};

watch(dateTime, (newValue) => {
  if (newValue) {
    const init = moment(newValue);
    date.value = init.format('YYYY-MM-DD');
    time.value = init.format('HH:mm:ss');
  }
});

watch([date, time], ([newDate, newTime]) => {
  dateTime.value = combineDateTime(newDate, newTime);
});
</script>
