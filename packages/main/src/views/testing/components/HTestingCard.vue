<template>
  <v-card class="mb-4" border="dashed md" v-bind="$attrs">
    <v-card-text> <slot></slot></v-card-text>
  </v-card>
</template>

<script setup lang="ts">
defineOptions({ name: "HTestingCard" });
</script>
