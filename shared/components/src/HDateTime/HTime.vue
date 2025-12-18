<template>
  <v-text-field v-model="time" glow v-bind="$attrs">
    <template #prepend-inner>
      <h-time-picker v-model="time"></h-time-picker>
    </template>
  </v-text-field>
</template>

<script setup lang="ts">
import { VTextField } from 'vuetify/components';
import HTimePicker from './HTimePicker.vue';

defineOptions({ name: 'HTime', components: { VTextField, HTimePicker } });

const time = defineModel<string>();
</script>
