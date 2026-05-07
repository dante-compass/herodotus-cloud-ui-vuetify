<template>
  <h-action-button color="light-blue" icon="mdi-clipboard-text" tooltip="查看信息" v-bind="$attrs"></h-action-button>
</template>

<script setup lang="ts">
import HActionButton from "./HActionButton.vue";

defineOptions({ name: "HActionEditButton", components: { HActionButton } });
</script>
