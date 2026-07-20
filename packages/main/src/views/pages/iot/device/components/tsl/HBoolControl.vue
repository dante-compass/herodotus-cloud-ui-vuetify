<template>
  <v-switch v-model="model" :label="model ? trueLabel : falseLabel" density="compact" hide-details></v-switch>
</template>

<script setup lang="ts">
import type { Specification, BoolSpecs } from '@herodotus/api';
import { isEmpty } from 'lodash-es';

defineOptions({ name: 'HBoolControl' });

interface Props {
  form?: boolean;
  specs: Specification<BoolSpecs>;
}

const props = withDefaults(defineProps<Props>(), {
  form: true,
});

const model = defineModel<boolean>({
  default: false,
});

const getLabel = (key: '0' | '1') => {
  if (!isEmpty(props.specs) && !isEmpty(props.specs.dataType)) {
    if (!isEmpty(props.specs.dataType.specs)) {
      return props.specs.dataType.specs[key];
    }
  }
  return '';
};

const trueLabel = computed(() => {
  return getLabel('1');
});

const falseLabel = computed(() => {
  return getLabel('0');
});
</script>
