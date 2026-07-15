<template>
  <div class="d-flex align-center text-caption text-medium-emphasis pa-2">
    <div class="d-flex ms-auto overflow-hidden">
      <v-btn
        :text="version"
        :to="`https://gitee.com/dromara/dante-cloud/releases/tag/v${version}`"
        class="text-caption"
        prepend-icon="mdi-tag-outline"
        size="small"
        variant="text"
        slim
      ></v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'SystemVersion' });

const version = shallowRef('4.1.0.4');
</script>
