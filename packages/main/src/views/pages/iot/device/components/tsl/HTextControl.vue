<template>
  <v-text-field
    v-model="model"
    :counter="counter"
    density="comfortable"
    :rules="[(v: string) => !!v || '不能输入空值']"
  ></v-text-field>
</template>

<script setup lang="ts">
import type { Specification, TextSpecs } from '@herodotus/api';
import { isEmpty } from 'lodash-es';

defineOptions({ name: 'HNumberControl' });

const model = defineModel<string>();

interface Props {
  specs: Specification<TextSpecs>;
}

const props = defineProps<Props>();

const counter = computed(() => {
  if (!isEmpty(props.specs) && !isEmpty(props.specs.dataType)) {
    return props.specs.dataType.specs.length;
  }
  return false;
});
</script>
