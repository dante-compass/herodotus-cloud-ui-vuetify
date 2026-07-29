<template>
  <v-form ref="identifier">
    <h-argument-panel v-model="argument"></h-argument-panel>
    <h-label text="读写类型:" required></h-label>
    <h-dictionary-option
      v-model="model.accessMode"
      dictionary="AccessMode"
      default-value="rw"
      inline
      hide-details
    ></h-dictionary-option>
  </v-form>
</template>

<script setup lang="ts">
import type { TslStatus, TslFunctionEntity, TslArgumentEntity, Specification, Specs } from '@herodotus/api';

import { useTslValidation, useTslEntity } from '../../composables/hooks';

import { HDictionaryOption } from '@/components/library/HDictionary';
import { HArgumentPanel } from '../arguments';
import { isEmpty } from 'lodash-es';

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
      identifier: '',
      name: '',
      dimension: 'properties',
      required: false,
      arguments: { property: {} as TslArgumentEntity },
    }) as TslFunctionEntity,
  required: true,
});

const { identifier, validate } = useTslValidation();
const { hasProperty, getPropertyArgumentSpecs, isSpecificationNotEmpty, EMPTY_NORMAL_SPECIFICATION } = useTslEntity();

const argument = ref(EMPTY_NORMAL_SPECIFICATION) as Ref<Specification<Specs>>;
const isUpdating = shallowRef(false);

// const argument1 = computed({
//   get: () => {
//     return getPropertyArgumentSpecs(model.value);
//   },
//   set: (specification: Specification<Specs>) => {
//     model.value.identifier = specification.identifier;
//     model.value.name = specification.name;

//     model.value.arguments.property.identifier = specification.identifier;
//     model.value.arguments.property.name = specification.name;
//     model.value.arguments.property.specs = specification;
//     model.value.arguments.property.type = specification.dataType.type;

//     console.log('-----proeprty model-----', model.value);
//   },
// });

watch(
  model,
  (newValue) => {
    if (isUpdating.value) return;

    console.log('----panel model----', newValue);
    console.log('----panel model----', hasProperty(newValue));

    if (hasProperty(newValue)) {
      isUpdating.value = true;
      const specs = getPropertyArgumentSpecs(newValue);

      if (specs) {
        argument.value = specs;
      }

      console.log('---argument---', argument.value);
      isUpdating.value = false;
    }
  },
  {
    immediate: true,
    deep: true,
  },
);

watch(
  argument,
  (newValue) => {
    if (!isEmpty(newValue)) {
      if (isUpdating.value) return;

      if (newValue.identifier && newValue.name) {
        isUpdating.value = true;
        model.value.identifier = newValue.identifier;
        model.value.name = newValue.name;

        model.value.arguments.property.identifier = newValue.identifier;
        model.value.arguments.property.name = newValue.name;
        model.value.arguments.property.specs = newValue;
        model.value.arguments.property.type = newValue.dataType.type;
        isUpdating.value = false;
      }
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
