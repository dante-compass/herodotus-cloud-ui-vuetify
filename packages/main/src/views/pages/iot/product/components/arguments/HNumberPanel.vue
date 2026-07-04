<template>
  <div>
    <h-label text="取值范围："></h-label>
    <v-container class="pa-0 my-4">
      <v-row no-gutters>
        <v-col cols="5"
          ><v-text-field
            v-model="model.dataType.specs.min"
            density="compact"
            placeholder="请输入最小值"
            hide-details
          ></v-text-field
        ></v-col>
        <v-col cols="2" align-self="center" class="text-center">~</v-col>
        <v-col cols="5"
          ><v-text-field
            v-model="model.dataType.specs.max"
            density="compact"
            placeholder="请输入最大值"
            hide-details
          ></v-text-field
        ></v-col>
      </v-row>
    </v-container>
    <h-label text="步长："></h-label>
    <v-text-field v-model="model.dataType.specs.step" density="compact" placeholder="请输入步长" />
    <h-label text="单位："></h-label>
    <h-unit-select v-model="unit" density="compact"></h-unit-select>
  </div>
</template>

<script setup lang="ts">
import type { Specification, IntegerSpecs, FloatSpecs, DoubleSpecs, TslUnitEntity } from "@herodotus/api";

import { isEmpty } from "lodash-es";

import { HDictionarySelect } from "@/components/library/HDictionary";
import HUnitSelect from "./HUnitSelect.vue";

defineOptions({ name: "HNumberPanel", components: { HDictionarySelect, HUnitSelect } });

const model = defineModel<Specification<IntegerSpecs | FloatSpecs | DoubleSpecs>>({
  default: () => ({}) as Specification<IntegerSpecs | FloatSpecs | DoubleSpecs>,
});

const unit = ref<TslUnitEntity | null>(null);

watch(unit, (newValue) => {
  if (!isEmpty(newValue)) {
    model.value.dataType.specs.unit = newValue.symbol;
    model.value.dataType.specs.unitName = newValue.name;
  }
});
</script>
