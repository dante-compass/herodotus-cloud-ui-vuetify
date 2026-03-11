<template>
  <v-container class="px-0">
    <v-row align="center" justify="center">
      <v-col cols="5"><v-divider></v-divider></v-col>
      <v-col cols="2" align-self="center" class="text-center">{{ label }}</v-col>
      <v-col cols="5"><v-divider></v-divider></v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
defineOptions({ name: 'HTextDivider' });

interface Props {
  label: string;
}

defineProps<Props>();
</script>
