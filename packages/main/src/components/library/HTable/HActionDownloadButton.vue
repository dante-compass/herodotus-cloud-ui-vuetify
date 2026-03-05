<template>
  <h-action-button color="indigo" icon="mdi-cloud-download" tooltip="下载文件" v-bind="$attrs"></h-action-button>
</template>

<script setup lang="ts">
import HActionButton from './HActionButton.vue';

defineOptions({ name: 'HActionDownloadButton', components: { HActionButton } });
</script>
