<template>
  <v-menu :close-on-content-click="false" activator="parent" v-bind="$attrs">
    <template #activator="{ props: menu }">
      <v-tooltip location="bottom">
        <template #activator="{ props: tooltip }">
          <v-icon icon="mdi-calendar" v-bind="mergeProps(menu, tooltip)"></v-icon>
        </template>
        <span>点击设置日期</span>
      </v-tooltip>
    </template>
    <v-date-picker
      v-model="datePicker"
      show-week
      show-adjacent-months
      first-day-of-week="1"
      weeks-in-month="dynamic"
    ></v-date-picker>
  </v-menu>
</template>

<script setup lang="ts">
import { mergeProps, computed } from 'vue';
import { useDate } from 'vuetify';
import { VMenu, VTooltip, VIcon, VDatePicker } from 'vuetify/components';
import { moment } from '@herodotus/core';

defineOptions({ name: 'HDatePicker', components: { VMenu, VTooltip, VIcon, VDatePicker } });

const date = defineModel({ type: String });

const adapter = useDate();

const datePicker = computed({
  get: () => (date.value ? adapter.parseISO(date.value) : ''),
  set: (value: string) => {
    if (value) {
      date.value = moment(value).format('YYYY-MM-DD');
    } else {
      date.value = value;
    }
  },
});
</script>
