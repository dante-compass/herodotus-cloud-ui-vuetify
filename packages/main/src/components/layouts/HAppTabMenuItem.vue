<template>
  <v-list-item v-bind="$attrs">
    <template #prepend>
      <v-icon :icon="icon"></v-icon>
    </template>

    <v-list-item-title>{{ title }}</v-list-item-title>
  </v-list-item>
</template>

<script setup lang="ts">
defineOptions({ name: 'HAppTabMenuItem' });

interface Props {
  icon: string;
  title: string;
}

defineProps<Props>();
</script>
