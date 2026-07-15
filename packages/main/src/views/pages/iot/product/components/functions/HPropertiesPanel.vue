<template>
  <v-form ref="identifier">
    <h-argument-panel v-model="argument"></h-argument-panel>
    <h-label text="读写类型:" required></h-label>
    <h-dictionary-option
      v-model="entity.accessMode"
      dictionary="AccessMode"
      default-value="rw"
      inline
      hide-details
    ></h-dictionary-option>
  </v-form>
</template>

<script setup lang="ts">
import type { TslFunctionEntity, Specification, Specs } from '@herodotus/api';

import { isEmpty } from 'lodash-es';
import { useTslValidation } from '../../composables/hooks';

import { HDictionaryOption } from '@/components/library/HDictionary';
import { HArgumentPanel } from '../arguments';

defineOptions({ name: 'HPropertiesPanel' });

const entity = defineModel<TslFunctionEntity>({
  default: () => ({}) as TslFunctionEntity,
});

const { identifier, validate } = useTslValidation();
const argument = ref({
  identifier: '',
  name: '',
  dataType: { type: 'int', specs: {} },
}) as Ref<Specification<Specs>>;

watch(
  argument,
  (newValue) => {
    entity.value.type = newValue.dataType.type;
    entity.value.specs = newValue;
    if (newValue.identifier !== entity.value.identifier) {
      entity.value.identifier = newValue.identifier;
    }

    if (newValue.name !== entity.value.name) {
      entity.value.name = newValue.name;
    }
  },
  {
    immediate: true,
    deep: true,
  },
);

onMounted(() => {
  if (!isEmpty(entity) && !isEmpty(entity.value.specs)) {
    argument.value = entity.value.specs;
  }
});

defineExpose({
  validate,
});
</script>
