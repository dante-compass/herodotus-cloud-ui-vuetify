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

interface Props {
  forCreate: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  forCreate: true,
});

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
  entity,
  (newValue) => {
    if (!props.forCreate) {
      if (!isEmpty(newValue) && !isEmpty(newValue.arguments) && !isEmpty(newValue.arguments.property)) {
        argument.value = newValue.arguments.property.specs;
      }
    }
  },
  { deep: true, immediate: true },
);

watch(
  argument,
  (newValue) => {
    if (newValue.identifier && newValue.name) {
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
    }
  },
  {
    immediate: true,
    deep: true,
  },
);

defineExpose({
  validate,
});
</script>
