<template>
  <div>
    <h-label text="取值范围："></h-label>
    <v-container class="pa-0 my-4">
      <v-row no-gutters>
        <v-col cols="5"
          ><v-text-field
            v-model="entity.dataType.specs.min"
            density="compact"
            placeholder="请输入最小值"
            hide-details
          ></v-text-field
        ></v-col>
        <v-col cols="2" align-self="center" class="text-center">~</v-col>
        <v-col cols="5"
          ><v-text-field
            v-model="entity.dataType.specs.max"
            density="compact"
            placeholder="请输入最大值"
            hide-details
          ></v-text-field
        ></v-col>
      </v-row>
    </v-container>
    <h-label text="步长："></h-label>
    <v-text-field v-model="entity.dataType.specs.step" density="compact" placeholder="请输入步长" />
    <h-label text="单位："></h-label>
    <h-unit-select v-model="unit" density="compact"></h-unit-select>
  </div>
</template>

<script setup lang="ts">
import type { Specification, IntegerSpecs, FloatSpecs, DoubleSpecs, TslUnitEntity } from "@herodotus/api";

import { isEmpty } from "lodash-es";

import { HDictionarySelect } from "@/components/library/HSelect";
import HUnitSelect from "./HUnitSelect.vue";

defineOptions({
  name: "HNumberPanel",
  components: {
    HDictionarySelect,
    HUnitSelect,
  },
});

const entity = defineModel<Specification<IntegerSpecs | FloatSpecs | DoubleSpecs>>({
  default: () => ({}),
});

const unit = ref<TslUnitEntity | null>(null);

watch(unit, (newValue) => {
  if (!isEmpty(newValue)) {
    entity.value.dataType.specs.unit = newValue.symbol;
    entity.value.dataType.specs.unitName = newValue.name;
  }
});
</script>
