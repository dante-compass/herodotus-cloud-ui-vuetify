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
    <h-unit-select v-model="unit" density="compact"></h-unit-select>
  </div>
</template>

<script setup lang="ts">
import type { Specification, IntegerSpecs, FloatSpecs, DoubleSpecs, TslUnitEntity, TslStatus } from '@herodotus/api';

import { isEmpty } from 'lodash-es';

import { useTslStatus, useTslEntity } from '../../composables/hooks';

import { HDictionarySelect } from '@/components/library/HDictionary';
import HUnitSelect from './HUnitSelect.vue';

defineOptions({ name: 'HNumberPanel', components: { HDictionarySelect, HUnitSelect } });

interface Props {
  status?: TslStatus;
}

const props = withDefaults(defineProps<Props>(), {
  status: 'create',
});

const model = defineModel<Specification<IntegerSpecs | FloatSpecs | DoubleSpecs>>({
  default: () => ({}) as Specification<IntegerSpecs | FloatSpecs | DoubleSpecs>,
});

const { isCreate, isEdit, isView, disabled } = useTslStatus(props.status);
const { hasSpecs } = useTslEntity();

const unit = ref<TslUnitEntity | null>(null);

watch(unit, (newValue, oldValue) => {
  if (!isEmpty(newValue)) {
    model.value.dataType.specs.unit = newValue.symbol;
    model.value.dataType.specs.unitName = newValue.name;
  }
});

onMounted(() => {
  if (hasSpecs(model.value)) {
    const symbol = model.value.dataType.specs.unit;

    const name = model.value.dataType.specs.unitName;
    if (symbol && name) {
      unit.value = { name: name, symbol: symbol } as TslUnitEntity;
    }
  }
});
</script>
