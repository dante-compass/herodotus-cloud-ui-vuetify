<template>
  <v-toolbar color="primary">
    <v-toolbar-title>已配置</v-toolbar-title>
    <h-icon-button icon="mdi-content-save-cog" tooltip="保存" @click="onSave()"></h-icon-button>
    <h-icon-button icon="mdi-delete-empty" tooltip="清空" @click="onClear()"></h-icon-button>
  </v-toolbar>
</template>

<script setup lang="ts">
defineOptions({ name: "HAuthorizeHeader" });

const emit = defineEmits<{
  save: [];
  clear: [];
}>();

const onSave = () => {
  emit("save");
};

const onClear = () => {
  emit("clear");
};
</script>
