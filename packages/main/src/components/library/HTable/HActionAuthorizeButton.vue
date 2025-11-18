<template>
  <h-action-button color="amber" icon="mdi-shield-edit" v-bind="$attrs"></h-action-button>
</template>

<script setup lang="ts">
import HActionButton from './HActionButton.vue';

defineOptions({ name: 'HActionAuthorizeButton', components: { HActionButton } });
</script>
