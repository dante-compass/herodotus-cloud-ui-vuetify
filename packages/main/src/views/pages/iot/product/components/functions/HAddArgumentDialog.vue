<template>
  <h-dialog v-model="model" title="添加参数" @confirm="onSave" external-close>
    <v-form ref="addArgumentForm">
      <h-argument-panel v-model="entity" ref="identifier"></h-argument-panel>
    </v-form>
  </h-dialog>
</template>

<script setup lang="ts">
import type { Specification, Specs } from "@herodotus/api";

import { useTslEmptyArgument } from "../../composables/hooks";

import { HDictionarySelect } from "@/components/library/HDictionary";
import { HArgumentPanel } from "../arguments";

defineOptions({
  name: "HAddArgumentDialog",
  components: {
    HDictionarySelect,
    HArgumentPanel,
  },
});

const model = defineModel<boolean>({
  required: true,
});

const emit = defineEmits(["save"]);

const { createEmptyNormalArgument } = useTslEmptyArgument();

const addArgumentForm = ref();

const entity = ref<Specification<Specs>>(createEmptyNormalArgument());

const onSave = async () => {
  const { valid } = await addArgumentForm.value.validate();
  if (valid) {
    model.value = false;
    emit("save", entity.value);
  }
};

onUpdated(() => {
  // 每次重新打开 Dialog，清除上次操作遗留数据
  entity.value = createEmptyNormalArgument();
});
</script>
