<template>
  <v-select
    v-model="selectedValue"
    :items="options"
    item-title="label"
    item-value="value"
    chips
    closable-chips
    v-bind="$attrs"
  >
    <template v-slot:item="{ props: itemProps, item }">
      <v-list-item v-if="showItem(item)" v-bind="itemProps"></v-list-item>
    </template>
  </v-select>
</template>

<script setup lang="ts">
import type { Dictionary } from "@herodotus/core";

import { isEmpty } from "lodash-es";
import { useDictionary } from "@/composables/hooks";

defineOptions({ name: "HDictionarySelect" });

interface Props {
  dictionary: string;
  disabledItems?: string[];
}
const props = defineProps<Props>();

const selectedValue = defineModel();

const { options } = useDictionary(props.dictionary);

const showItem = (item: Dictionary) => {
  if (isEmpty(props.disabledItems)) {
    return true;
  } else {
    return !props.disabledItems?.includes(item.value);
  }
};
</script>
