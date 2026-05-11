<template>
  <div>
    <h-label text="JSON 对象：" required></h-label>
    <h-struct-param-list v-model="model.dataType.specs"></h-struct-param-list>
    <h-argument-button variant="text" text="+ 新增参数" class="px-0 mb-2" @click="openDialog = !openDialog" />
    <h-sub-argument-dialog v-model="openDialog" @save="onAddParameter"></h-sub-argument-dialog>
  </div>
</template>

<script setup lang="ts">
import type { Specification, StructSpecs, Specs } from "@herodotus/api";

import { isEmpty } from "lodash-es";

import HStructParamList from "./HStructParamList.vue";
import HSubArgumentDialog from "./HSubArgumentDialog.vue";
import HArgumentButton from "./HArgumentButton.vue";

defineOptions({ name: "HStructPanel", components: { HStructParamList, HSubArgumentDialog, HArgumentButton } });

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
