<template>
  <h-dialog v-model="openDialog" title="添加参数" @confirm="onSave">
    <v-form ref="subArgumentForm">
      <h-characteristic-panel v-model="entity"></h-characteristic-panel>
      <h-label text="数据类型" required></h-label>
      <h-dictionary-select
        v-model="entity.dataType.type"
        dictionary="ArgumentType"
        :disable-items="['struct']"
      ></h-dictionary-select>
      <component :is="currentPanel" v-model="entity"></component>
    </v-form>
  </h-dialog>
</template>

<script setup lang="ts">
import type { Specification, Specs } from "@herodotus/api";

import { computed, onUpdated, ref } from "vue";

import { toUpper } from "lodash-es";
import { useTslEntity } from "@/composables/hooks";

import { HDictionarySelect } from "@/components/library/HSelect";
import HBoolPanel from "./HBoolPanel.vue";
import HDatePanel from "./HDatePanel.vue";
import HEnumPanel from "./HEnumPanel.vue";
import HNumberPanel from "./HNumberPanel.vue";
import HTextPanel from "./HTextPanel.vue";
import HCharacteristicPanel from "./HCharacteristicPanel.vue";

defineOptions({
  name: "HSubArgumentDialog",
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
  },
});

const openDialog = defineModel<boolean>({
  required: true,
});

const emit = defineEmits(["save"]);

const { createEmptyNormalArgument } = useTslEntity();

const subArgumentForm = ref();

const entity = ref<Specification<Specs>>(createEmptyNormalArgument());

const currentPanel = computed(() => {
  if (entity.value.dataType.type) {
    return toUpper(entity.value.dataType.type) + "_PANEL";
  } else {
    return "INT_PANEL";
  }
});

const onSave = async () => {
  const { valid } = await subArgumentForm.value.validate();
  if (valid) {
    openDialog.value = false;
    emit("save", entity.value);
  }
};

onUpdated(() => {
  // 每次重新打开 Dialog，清除上次操作遗留数据
  entity.value = createEmptyNormalArgument();
});
</script>
