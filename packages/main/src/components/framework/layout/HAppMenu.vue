<template>
  <v-list
    v-model:activated="active"
    :nav="nav"
    :lines="false"
    :items="menuItems"
    color="primary"
    active-strategy="single-leaf"
    open-strategy="list"
    select-strategy="classic"
    item-props
    activatable
    mandatory
    slim
    density="compact"
  >
    <template #header="{ props }">
      <v-list-item v-bind="props" class="rounded-pill"> </v-list-item>
    </template>
    <template #item="{ props }">
      <v-list-item v-bind="props" class="rounded-pill"> </v-list-item>
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
import { useMenuForVuetify } from '@herodotus/framework';

defineOptions({ name: 'HAppMenu' });

defineProps({
  nav: { type: Boolean, default: false },
});

const { getMenuItems } = useMenuForVuetify();

const active = shallowRef([]);

const menuItems = computed(() => {
  return getMenuItems();
});
</script>
