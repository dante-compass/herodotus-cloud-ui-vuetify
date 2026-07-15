<template>
  <v-number-input
    v-model="model"
    :max="max"
    :min="min"
    :step="step"
    :precision="precision"
    density="comfortable"
  ></v-number-input>
</template>

<script setup lang="ts">
import type { Specification, IntegerSpecs, FloatSpecs, DoubleSpecs } from '@herodotus/api';
import { isEmpty } from 'lodash-es';

defineOptions({ name: 'HNumberControl' });

const model = defineModel<number>();

interface Props {
  specs: Specification<IntegerSpecs | FloatSpecs | DoubleSpecs>;
}

const props = defineProps<Props>();

const min = computed(() => {
  if (!isEmpty(props.specs) && !isEmpty(props.specs.dataType)) {
    if (props.specs.dataType.type === 'int') {
      return Number.parseInt(props.specs.dataType.specs.min);
    } else {
      return Number.parseFloat(props.specs.dataType.specs.min);
    }
  }
  return undefined;
});

const max = computed(() => {
  if (!isEmpty(props.specs) && !isEmpty(props.specs.dataType)) {
    if (props.specs.dataType.type === 'int') {
      return Number.parseInt(props.specs.dataType.specs.max);
    } else {
      return Number.parseFloat(props.specs.dataType.specs.max);
    }
  }
  return undefined;
});
const step = computed(() => {
  if (!isEmpty(props.specs) && !isEmpty(props.specs.dataType)) {
    if (props.specs.dataType.type === 'int') {
      return Number.parseInt(props.specs.dataType.specs.step);
    } else {
      return Number.parseFloat(props.specs.dataType.specs.step);
    }
  }
  return undefined;
});

const precision = computed(() => {
  if (!isEmpty(props.specs) && !isEmpty(props.specs.dataType)) {
    if (props.specs.dataType.type !== 'int') {
      return 2;
    }
  }
  return 0;
});
</script>
