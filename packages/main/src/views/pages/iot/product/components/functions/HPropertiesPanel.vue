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
import type { TslStatus, TslFunctionEntity, TslArgumentEntity, Specification, Specs } from '@herodotus/api';

import { isEmpty, isEqual } from 'lodash-es';
import { useTslValidation, useTslEntity } from '../../composables/hooks';

import { HDictionaryOption } from '@/components/library/HDictionary';
import { HArgumentPanel } from '../arguments';

defineOptions({ name: 'HPropertiesPanel' });

interface Props {
  status?: TslStatus;
}

const props = withDefaults(defineProps<Props>(), {
  status: 'create',
});

const model = defineModel<TslFunctionEntity>({
  default: () =>
    ({
      dimension: 'properties',
      required: false,
      arguments: { property: {} as TslArgumentEntity },
    }) as TslFunctionEntity,
  required: true,
});

const { identifier, validate } = useTslValidation();
const { hasProperties } = useTslEntity();

const argument = ref({
  identifier: '',
  name: '',
  dataType: { type: 'int', specs: {} },
}) as Ref<Specification<Specs>>;

const argument = computed({
  get: () => {
    if (hasProperties(model.value)) {
      return model.value.arguments.property.specs;
    }
    return {
      identifier: '',
      name: '',
      dataType: { type: 'int', specs: {} },
    } as Specification<Specs>;
  },
  set: (value: Specification<Specs>) => {
    if (!isEmpty(value)) {
      if (model.value.identifier !== value.identifier) {
        model.value.identifier = value.identifier;
        model.value.arguments.property.identifier = value.identifier;
      }

      if (model.value.name !== value.name) {
        model.value.name = value.name;
        model.value.arguments.property.name = value.name;
      }

      model.value.arguments.property.specs = value;
      model.value.arguments.property.type = value.dataType.type;
    }
  },
});

watch(
  model,
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
      if (newValue.identifier !== model.value.identifier) {
        model.value.identifier = newValue.identifier;
      }

      if (newValue.name !== model.value.name) {
        model.value.name = newValue.name;
      }
      model.value.arguments.property.identifier = newValue.identifier;
      model.value.arguments.property.name = newValue.name;
    }

    model.value.arguments.property.specs = newValue;
    model.value.arguments.property.type = newValue.dataType.type;
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
