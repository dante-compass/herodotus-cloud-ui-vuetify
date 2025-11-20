<template>
  <v-overlay v-model="overlay" class="align-center justify-center">
    <v-progress-circular color="primary" size="64" indeterminate></v-progress-circular>
  </v-overlay>
</template>

<script setup lang="ts">
defineOptions({ name: 'loading' });


</script>
