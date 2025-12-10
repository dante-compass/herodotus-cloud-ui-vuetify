<template>
  <v-menu :close-on-content-click="false" activator="parent" min-width="0" v-bind="$attrs">
    <template #activator="{ props: menu }">
      <v-tooltip location="bottom">
        <template #activator="{ props: tooltip }">
          <v-icon icon="mdi-clock-time-four-outline" v-bind="mergeProps(menu, tooltip)"></v-icon>
        </template>
        <span>点击设置日期</span>
      </v-tooltip>
    </template>
    <v-time-picker v-model="time" use-seconds format="24hr"></v-time-picker>
  </v-menu>
</template>

<script setup lang="ts">
import { mergeProps } from 'vue';
import { VMenu, VTooltip, VIcon, VTimePicker } from 'vuetify/components';

defineOptions({ name: 'HTimePicker', components: { VMenu, VTooltip, VIcon, VTimePicker } });

const time = defineModel<string>();
</script>
