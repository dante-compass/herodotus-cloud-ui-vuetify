<template>
  <v-radio-group v-model="currentTheme" class="mb-2" color="primary" true-icon="mdi-check-circle-outline" hide-details>
    <v-radio
      v-for="(item, i) in themeItems"
      :key="i"
      :value="item.value"
      @click="theme.setTransitionOrigin($event.target)"
    >
      <template #label>
        <v-icon :icon="item.icon" start />
        {{ item.text }}
      </template>
    </v-radio>
  </v-radio-group>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify';
import { useSystemTheme } from '@herodotus/framework';

defineOptions({ name: 'SettingThemeOption' });

const { currentTheme, systemTheme, themeItems } = useSystemTheme();
const theme = useTheme();

watchEffect(() => {
  theme.change(systemTheme.value);
});
</script>
