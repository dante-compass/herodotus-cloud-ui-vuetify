<template>
  <h-dialog v-model="openDialog" prepend-icon="mdi-email-edit">
    <div>ddddd</div>
  </h-dialog>
</template>

<script setup lang="ts">
defineOptions({ name: "HAddFunctionDialog" });

const openDialog = defineModel({
  type: Boolean,
  default: false,
  required: true,
});

</script>
