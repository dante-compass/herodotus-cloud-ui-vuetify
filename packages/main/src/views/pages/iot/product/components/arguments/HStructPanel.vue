<template>
  <div>
    <h-label text="JSON 对象：" required></h-label>
    <h-tsl-param-list v-model="model.dataType.specs"></h-tsl-param-list>
    <h-tsl-button text="+ 新增参数" @click="openDialog = !openDialog" />
    <h-sub-argument-dialog v-model="openDialog" @save="onAddParameter"></h-sub-argument-dialog>
  </div>
</template>

<script setup lang="ts">
import type { Specification, StructSpecs, Specs } from "@herodotus/api";

import { isEmpty } from "lodash-es";

import HSubArgumentDialog from "./HSubArgumentDialog.vue";
import { HTslButton, HTslParamList } from "../commons";

defineOptions({ name: "HStructPanel", components: { HSubArgumentDialog, HTslButton, HTslParamList } });

const model = defineModel<Specification<StructSpecs>>({
  default: () => ({}) as Specification<StructSpecs>,
});

const openDialog = ref(false);

const onAddParameter = (item: Specification<Specs>) => {
  if (isEmpty(model.value.dataType.specs)) {
    model.value.dataType.specs = [];
  }
  model.value.dataType.specs.push(item);
};
</script>
