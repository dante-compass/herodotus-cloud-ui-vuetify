<template>
  <v-radio-group
    v-model="settings.theme.mode"
    class="mb-2"
    color="primary"
    true-icon="mdi-check-circle-outline"
    hide-details
  >
    <v-radio v-for="(item, i) in items" :key="i" :value="item.value">
      <template #label>
        <v-icon :icon="item.icon" start />

        {{ item.text }}
      </template>
    </v-radio>
  </v-radio-group>
</template>

<script setup lang="ts">
import { useSettingsStore } from '@herodotus/framework';

defineOptions({ name: 'HAppThemeOption' });

const settings = useSettingsStore();

const items = [
  {
    text: '浅色主题',
    icon: 'mdi-white-balance-sunny',
    value: 'light',
  },
  {
    text: '深色主题',
    icon: 'mdi-weather-night',
    value: 'dark',
  },
  {
    text: '跟随系统',
    icon: 'mdi-desktop-tower-monitor',
    value: 'system',
  },
];
</script>
