<template>
  <v-card>
    <v-card-item :title="title" :subtitle="subtitle"></v-card-item>
    <v-card-text>
      <slot></slot>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
defineOptions({ name: 'HChartCard' });

interface Props {
  title: string;
  subtitle?: string;
}

withDefaults(defineProps<Props>(), {
  subtitle: '',
});
</script>
