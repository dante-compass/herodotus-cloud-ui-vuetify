<template>
  <v-list
    v-model:activated="active"
    :lines="false"
    :items="items"
    active-strategy="single-leaf"
    open-strategy="multiple"
    select-strategy="classic"
    item-props
    activatable
    border
    mandatory
    slim
    nav
    density="comfortable"
    active-class="active_item_border"
    class="pa-0"
  >
    <template #header="{ props }">
      <v-list-item v-bind="props" class="rounded-e-xl"></v-list-item>
    </template>
    <template #item="{ props }">
      <v-list-item v-bind="props" class="rounded-e-xl"></v-list-item>
    </template>

    <template #subheader="{ props: subheaderProps }">
      <slot name="subheader" v-bind="{ subheaderProps }" />

      <v-list-subheader v-if="!$slots.subheader" class="text-high-emphasis text-uppercase font-weight-black">
        {{ subheaderProps.title }}
      </v-list-subheader>
    </template>
  </v-list>
</template>

<script setup lang="ts">
import type { MenuItem } from '@herodotus/framework';

defineOptions({ name: 'LayoutMenu' });

interface Props {
  items: MenuItem[];
}

defineProps<Props>();

const active = ref([]);
</script>

<style lang="scss" scoped>
.active_item_border {
  border-left: 4px solid rgb(var(--v-theme-on-surface-variant));
  border-left-color: currentColor;
}
</style>
