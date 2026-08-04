<template>
  <v-card flat>
    <v-table class="text-body-small" density="compact">
      <tbody>
        <tr align="right" v-for="(item, index) in arguments" :key="index">
          <th style="width: 30%">{{ item.name }}（{{ item.identifier }}）：</th>

          <td style="width: 70%" :class="[{ 'pr-0': isStruct(item) }]">
            <component :is="getComponent(item.type)" v-model="entity[item.identifier]" :specs="item.specs"></component>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>

<script setup lang="ts">
import type { Component } from 'vue';
import type { TslArgumentEntity } from '@herodotus/api';

import { isEmpty, get } from 'lodash-es';

import { useTslEntity } from '../../../composables/hooks';

import HBoolControl from './HBoolControl.vue';
import HDateControl from './HDateControl.vue';
import HEnumControl from './HEnumControl.vue';
import HNumberControl from './HNumberControl.vue';
import HTextControl from './HTextControl.vue';
import HStructControl from './HStructControl.vue';

defineOptions({
  name: 'HServiceControl',
  components: { HBoolControl, HDateControl, HEnumControl, HNumberControl, HTextControl, HStructControl },
});

interface Props {
  arguments: TslArgumentEntity[];
}

const props = withDefaults(defineProps<Props>(), {
  arguments: () => [],
});

const model = defineModel<Record<string, any>>({
  default: () => ({}),
});

const { createDefaultValue } = useTslEntity();

const componentMap: Record<string, Component> = {
  int: HNumberControl,
  float: HNumberControl,
  double: HNumberControl,
  bool: HBoolControl,
  enum: HEnumControl,
  text: HTextControl,
  date: HDateControl,
  struct: HStructControl,
};

const entity = ref({}) as Ref<Record<string, any>>;

const getComponent = (type: string) => componentMap[type];

const isStruct = (item: TslArgumentEntity) => {
  return item.type === 'struct';
};

watch(
  () => props.arguments,
  (newValue) => {
    if (!isEmpty(newValue)) {
      if (isEmpty(model.value)) {
        // 如果 model 为空，则生成属性以及对应的默认值
        entity.value = Object.fromEntries(newValue.map((item) => [item.identifier, createDefaultValue(item.type)]));
      } else {
        // 如果 model 有值，则根据 identifier 取到对应的值，并设置给 entity。找不到对应属性则设置为默认值。
        entity.value = Object.fromEntries(
          newValue.map((item) => [item.identifier, get(model.value, item.identifier, createDefaultValue(item.type))]),
        );
      }
    }
  },
  { immediate: true, deep: true },
);
</script>
