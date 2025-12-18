<template>
  <v-text-field v-model="date" glow v-bind="$attrs">
    <template #prepend-inner>
      <h-date-picker v-model="date"></h-date-picker>
    </template>
  </v-text-field>
</template>

<script setup lang="ts">
import { VTextField } from 'vuetify/components';

import HDatePicker from './HDatePicker.vue';

defineOptions({ name: 'HDate', components: { VTextField, HDatePicker } });

const date = defineModel({
  type: String,
});
</script>
