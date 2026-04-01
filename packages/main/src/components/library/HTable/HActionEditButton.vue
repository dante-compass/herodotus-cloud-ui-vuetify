<template>
  <h-action-button color="purple" icon="mdi-pencil" tooltip="编辑" v-bind="$attrs"></h-action-button>
</template>

<script setup lang="ts">
import HActionButton from './HActionButton.vue';

defineOptions({ name: 'HActionEditButton', components: { HActionButton } });
</script>
