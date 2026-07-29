<template>
  <div>
    <h-label text="数据长度" required></h-label>
    <v-number-input
      v-model="content"
      density="comfortable"
      :disabled="disabled"
      :min="0"
      :max="max"
      :step="10"
    ></v-number-input>
  </div>
</template>

<script setup lang="ts">
import type { TslStatus, Specification, TextSpecs } from '@herodotus/api';

defineOptions({ name: 'HArgumentTextPanel' });

import { useTslEntity, useTslStatus } from '../../composables/hooks';

interface Props {
  status?: TslStatus;
}

const props = withDefaults(defineProps<Props>(), {
  status: 'create',
});

const model = defineModel<Specification<TextSpecs>>({
  default: () => ({}) as Specification<TextSpecs>,
});

const { disabled } = useTslStatus(() => props.status);
const { isSpecificationNotEmpty } = useTslEntity();

const max = shallowRef(10240);

const content = computed({
  get: () =>
    isSpecificationNotEmpty(model.value) && model.value.dataType.specs.length
      ? Number(model.value.dataType.specs.length)
      : max.value,
  set: (value: number) => {
    if (value) {
      model.value.dataType.specs.length = String(value);
    } else {
      model.value.dataType.specs.length = String(max.value);
    }
  },
});
</script>
