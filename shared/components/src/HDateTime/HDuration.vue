<template>
  <v-container class="pa-0">
    <v-row>
      <v-col>
        <v-number-input
          v-model="amount"
          label="数值"
          placeholder="请输入数值"
          control-variant="split"
          inset
        ></v-number-input>
      </v-col>
      <v-col>
        <v-select v-model="unit" :items="options" label="单位" clearable></v-select>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { watch, shallowRef } from "vue";
import { VContainer, VRow, VCol, VNumberInput, VSelect } from "vuetify/components";

import { moment } from "@herodotus/core";
import { DURATION_UNITS } from "@/lib/utils";

defineOptions({ name: "HDuration", components: { VContainer, VRow, VCol, VNumberInput, VSelect } });

const durationValue = defineModel<string | number>({
  required: true,
});

const amount = shallowRef(0);
const unit = shallowRef();
const options = shallowRef(DURATION_UNITS);

const convertDurationToData = (value: number | string) => {
  if (value) {
    let duration = moment.duration(value, "second");
    if (duration) {
      // @ts-ignore
      const data = duration._data;
      for (let item in data) {
        let key = item;
        let value = data[key];
        if (value) {
          amount.value = value;
          unit.value = key;
        }
      }
    }
  }
};

const convertDataToDuration = (amount: number, unit: string) => {
  if (amount && unit) {
    const u = unit as moment.unitOfTime.DurationConstructor;
    const result = moment.duration(amount, u).toISOString();
    durationValue.value = result;
  }
};

watch(
  () => durationValue.value,
  (newValue) => {
    if (newValue) {
      convertDurationToData(newValue);
    }
  },
  {
    immediate: true,
  },
);

watch(unit, (newValue) => {
  if (newValue) {
    convertDataToDuration(amount.value, newValue);
  }
});

watch(amount, (newValue) => {
  if (newValue) {
    convertDataToDuration(newValue, unit.value);
  }
});
</script>
