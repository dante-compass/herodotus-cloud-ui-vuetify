<template>
  <div>
    <h-label text="取值范围："></h-label>
    <v-container class="pa-0 my-4">
      <v-row no-gutters>
        <v-col cols="5">
          <v-text-field
            v-model="model.dataType.specs.min"
            density="compact"
            placeholder="请输入最小值"
            :disabled="disabled"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="2" align-self="center" class="text-center">~</v-col>
        <v-col cols="5">
          <v-text-field
            v-model="model.dataType.specs.max"
            density="compact"
            placeholder="请输入最大值"
            :disabled="disabled"
            hide-details
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
    <h-label text="步长："></h-label>
    <v-text-field v-model="model.dataType.specs.step" density="compact" placeholder="请输入步长" :disabled="disabled" />
    <h-label text="单位："></h-label>
    <h-tsl-unit-select v-model="unit" density="compact" :disabled="disabled"></h-tsl-unit-select>
  </div>
</template>

<script setup lang="ts">
import type { Specification, IntegerSpecs, FloatSpecs, DoubleSpecs, TslUnitEntity, TslStatus } from '@herodotus/api';

import { isEmpty } from 'lodash-es';

import { useTslStatus, useTslEntity } from '../../composables/hooks';

import { HDictionarySelect } from '@/components/library/HDictionary';
import HTslUnitSelect from './HTslUnitSelect.vue';

defineOptions({ name: 'HArgumentNumberPanel', components: { HDictionarySelect, HTslUnitSelect } });

interface Props {
  status?: TslStatus;
}

const props = withDefaults(defineProps<Props>(), {
  status: 'create',
});

const model = defineModel<Specification<IntegerSpecs | FloatSpecs | DoubleSpecs>>({
  default: () => ({}) as Specification<IntegerSpecs | FloatSpecs | DoubleSpecs>,
});

const { disabled } = useTslStatus(() => props.status);
const { isSpecificationNotEmpty } = useTslEntity();

const unit = computed({
  get: () => {
    if (isSpecificationNotEmpty(model.value)) {
      const symbol = model.value.dataType.specs.unit;
      const name = model.value.dataType.specs.unitName;
      if (symbol && name) {
        return { name: name, symbol: symbol } as TslUnitEntity;
      }
    }
    return null;
  },
  set: (value: TslUnitEntity) => {
    if (!isEmpty(value)) {
      model.value.dataType.specs.unit = value.symbol;
      model.value.dataType.specs.unitName = value.name;
    } else {
      model.value.dataType.specs.unit = '';
      model.value.dataType.specs.unitName = '';
    }
  },
});
</script>
