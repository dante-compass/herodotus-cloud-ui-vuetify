<template>
  <div>
    <h-label text="JSON 对象：" required></h-label>
    <h-struct-param-list v-model="model.dataType.specs"></h-struct-param-list>
    <h-tsl-button text="+ 新增参数" @click="openDialog = !openDialog" />
    <h-sub-argument-dialog v-model="openDialog" @save="onAddParameter"></h-sub-argument-dialog>
  </div>
</template>

<script setup lang="ts">
import type { Specification, StructSpecs, Specs } from "@herodotus/api";

import { isEmpty } from "lodash-es";

import HStructParamList from "./HStructParamList.vue";
import HSubArgumentDialog from "./HSubArgumentDialog.vue";
import { HTslButton } from "../commons";

defineOptions({ name: "HStructPanel", components: { HStructParamList, HSubArgumentDialog, HTslButton } });

const model = defineModel<Specification<StructSpecs>>({
  default: () => ({}),
});

const openDialog = ref(false);

const onAddParameter = (item: Specification<Specs>) => {
  if (isEmpty(model.value.dataType.specs)) {
    model.value.dataType.specs = [];
  }
  model.value.dataType.specs.push(item);
};
</script>
