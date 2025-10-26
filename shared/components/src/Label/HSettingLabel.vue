<template>
  <div class="d-flex mb-3 w-100">
    <div class="flex-1-1-0">
      <v-label :text="title" class="mb-1 font-weight-medium">
        <slot name="title"></slot>
      </v-label>
      <v-messages :messages="text" active />
    </div>

    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'HSettingLabel' });

interface Props {
  title: string;
  text?: string;
}

defineProps<Props>();
</script>
