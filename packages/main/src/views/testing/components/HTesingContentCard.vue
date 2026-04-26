<template>
  <v-card rounded="lg" v-bind="$attrs">
    <v-card-item><slot></slot></v-card-item>
  </v-card>
</template>

<script setup lang="ts">
defineOptions({ name: 'HTesingContentCard' });
</script>
