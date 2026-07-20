<template>
  <v-select v-model="model" :items="items" :rules="[(v: string) => !!v || '请选择值']"></v-select>
</template>

<script setup lang="ts">
import type { Specification, BoolSpecs } from '@herodotus/api';
import { isEmpty } from 'lodash-es';

defineOptions({ name: 'HEnumControl' });

interface Props {
  specs: Specification<BoolSpecs>;
}

const props = defineProps<Props>();

const model = defineModel<number>({});

const items = computed(() => {
  if (!isEmpty(props.specs) && !isEmpty(props.specs.dataType)) {
    if (!isEmpty(props.specs.dataType.specs)) {
      return Object.entries(props.specs.dataType.specs).map(([key, value]) => ({
        title: key,
        value: Number(value),
      }));
    }
  }

  return [];
});
</script>
