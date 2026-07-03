<template>
  <v-switch true-icon="mdi-check" false-icon="mdi-close" v-bind="$attrs"></v-switch>
</template>

<script setup lang="ts">

import { VSwitch } from 'vuetify/components';

defineOptions({ name: "HSwitch" });
</script>
