<template>
  <div>
    <h-setting-label
      title="主题"
      text="自定义你的系统是明亮还是黑暗的主题，或者两者的结合"
    ></h-setting-label>

    <setting-theme-option></setting-theme-option>

    <v-divider class="mt-4 mb-3" />
  </div>
</template>

<script lang="ts" setup>
import SettingThemeOption from './SettingThemeOption.vue';

defineOptions({ name: 'SettingOptions', components: { SettingThemeOption } });
</script>
