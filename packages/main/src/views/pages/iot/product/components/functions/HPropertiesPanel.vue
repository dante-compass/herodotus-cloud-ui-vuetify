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
import type { TslFunctionEntity, TslArgumentEntity, Specification, Specs } from '@herodotus/api';

import { isEmpty } from 'lodash-es';
import { useTslValidation } from '../../composables/hooks';

import { HDictionaryOption } from '@/components/library/HDictionary';
import { HArgumentPanel } from '../arguments';

defineOptions({ name: 'HPropertiesPanel' });

const entity = defineModel<TslFunctionEntity>({
  default: () =>
    ({
      dimension: 'properties',
      required: false,
      arguments: { property: {} as TslArgumentEntity },
    }) as TslFunctionEntity,
  required: true,
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
    if (newValue.identifier !== entity.value.identifier) {
      entity.value.identifier = newValue.identifier;
    }

    if (newValue.name !== entity.value.name) {
      entity.value.name = newValue.name;
    }

    entity.value.arguments.property.specs = newValue;
    entity.value.arguments.property.type = newValue.dataType.type;
    entity.value.arguments.property.identifier = newValue.identifier;
    entity.value.arguments.property.name = newValue.name;
  },
  {
    immediate: true,
    deep: true,
  },
);

onMounted(() => {
  if (!isEmpty(entity.value) && !isEmpty(entity.value.arguments) && !isEmpty(entity.value.arguments.property)) {
    argument.value = entity.value.arguments.property.specs;
  }
});

defineExpose({
  validate,
});
</script>
