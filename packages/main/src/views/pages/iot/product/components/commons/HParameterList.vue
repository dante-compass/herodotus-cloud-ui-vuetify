<template>
  <v-list :border="showBorder" density="compact" :lines="false" rounded class="py-0">
    <v-list-item v-for="(item, i) in model" :key="i">
      <v-list-item-subtitle v-text="'参数名称：' + item.name"></v-list-item-subtitle>
      <template #append>
        <h-parameter-button text="删除" @click="onDelete(item)"></h-parameter-button>
      </template>
    </v-list-item>
  </v-list>
</template>

<script setup lang="ts">
import type { TslArgumentEntity, Specification, Specs } from '@herodotus/api';

import { remove, isEmpty } from 'lodash-es';

import HParameterButton from './HParameterButton.vue';

defineOptions({ name: 'HParameterList', components: { HParameterButton } });

const model = defineModel<Array<TslArgumentEntity | Specification<Specs>>>({
  default: () => [],
});

const showBorder = computed(() => {
  return !isEmpty(model.value);
});

const onDelete = (item: TslArgumentEntity | Specification<Specs>) => {
  remove(model.value, (i) => {
    return i.identifier === item.identifier;
  });
};
</script>
