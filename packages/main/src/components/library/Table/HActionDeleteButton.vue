<template>
  <h-action-button color="red" icon="mdi-delete" tooltip="删除" v-bind="$attrs"></h-action-button>
</template>

<script setup lang="ts">
import HActionButton from './HActionButton.vue';

defineOptions({ name: 'HActionDeleteButton', components: { HActionButton } });
</script>
