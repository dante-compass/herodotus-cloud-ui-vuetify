<template>
  <h-action-button color="secondary" icon="mdi-download-box" tooltip="下载文件" v-bind="$attrs"></h-action-button>
</template>

<script setup lang="ts">
import HActionButton from './HActionButton.vue';

defineOptions({ name: 'HActionDownloadButton', components: { HActionButton } });
</script>
