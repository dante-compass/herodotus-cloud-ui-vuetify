<template>
  <v-list
    v-model:activated="active"
    :lines="false"
    :items="menuItems"
    active-strategy="single-leaf"
    open-strategy="list"
    select-strategy="classic"
    item-props
    activatable
    mandatory
    slim
    nav
    density="comfortable"
    active-class="active_item_border"
  >
    <template #header="{ props }">
      <v-list-item v-bind="props" class="rounded-e-xl"></v-list-item>
    </template>
    <template #item="{ props }">
      <v-list-item v-bind="props" class="rounded-e-xl"></v-list-item>
    </template>

    <template #subheader="{ props: subheaderProps }">
      <slot name="subheader" v-bind="{ subheaderProps }" />

      <v-list-subheader
        v-if="!$slots.subheader"
        class="text-high-emphasis text-uppercase font-weight-black"
      >
        {{ subheaderProps.title }}
      </v-list-subheader>
    </template>
  </v-list>
</template>

<script lang="ts" setup>
import { computed, shallowRef } from 'vue';
import { useElementStore } from '@herodotus/framework';

defineOptions({ name: 'AppMenu' });

const store = useElementStore();

const active = shallowRef([]);

const menuItems = computed(() => {
  return store.appMenus;
});
</script>

<style lang="scss" scoped>
.active_item_border {
  border-left: 3px solid rgb(var(--v-theme-on-surface-variant));
  border-left-color: currentColor;
}
</style>
