<template>
  <div>
    <h-characteristic-panel v-model="entity"></h-characteristic-panel>
    <h-label text="数据类型：" required></h-label>
    <h-dictionary-select
      v-model="entity.dataType.type"
      dictionary="ArgumentType"
      density="compact"
    ></h-dictionary-select>
    <component :is="currentPanel" v-model="entity"></component>
  </div>
</template>

<script lang="ts">
import { useTslEntity } from "@/composables/hooks";
const { createEmptyNormalArgument } = useTslEntity();
</script>

<script setup lang="ts">
import type { Specification, Specs } from "@herodotus/api";

import { toUpper } from "lodash-es";
import { HDictionarySelect } from "@/components/library/HSelect";

import HBoolPanel from "./HBoolPanel.vue";
import HDatePanel from "./HDatePanel.vue";
import HEnumPanel from "./HEnumPanel.vue";
import HNumberPanel from "./HNumberPanel.vue";
import HTextPanel from "./HTextPanel.vue";
import HStructPanel from "./HStructPanel.vue";
import HCharacteristicPanel from "./HCharacteristicPanel.vue";

defineOptions({
  name: "HArgumentPanel",
  components: {
    HCharacteristicPanel,
    HDictionarySelect,
    INT_PANEL: HNumberPanel,
    FLOAT_PANEL: HNumberPanel,
    DOUBLE_PANEL: HNumberPanel,
    DATE_PANEL: HDatePanel,
    BOOL_PANEL: HBoolPanel,
    ENUM_PANEL: HEnumPanel,
    TEXT_PANEL: HTextPanel,
    STRUCT_PANEL: HStructPanel,
  },
});

const entity = defineModel<Specification<Specs>>({
  default: () => createEmptyNormalArgument(),
});

const currentPanel = computed(() => {
  if (entity.value.dataType.type) {
    return toUpper(entity.value.dataType.type) + "_PANEL";
  } else {
    return "INT_PANEL";
  }
});
</script>
