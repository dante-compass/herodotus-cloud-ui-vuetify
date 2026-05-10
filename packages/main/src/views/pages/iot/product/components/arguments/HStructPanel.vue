<template>
  <div>
    <h-label text="JSON 对象：" required></h-label>
    <h-struct-param-list v-model="entity.dataType.specs"></h-struct-param-list>
    <v-btn variant="text" text="+ 新增参数" class="px-0 mb-2" @click="openSubArgumentDialog = !openSubArgumentDialog" />
    <h-sub-argument-dialog v-model="openSubArgumentDialog" @save="onAddParameter"></h-sub-argument-dialog>
  </div>
</template>

<script setup lang="ts">
import type { Specification, StructSpecs, Specs } from "@herodotus/api";

import { isEmpty } from "lodash-es";

import HStructParamList from "./HStructParamList.vue";
import HSubArgumentDialog from "./HSubArgumentDialog.vue";

defineOptions({ name: "HStructPanel", components: { HStructParamList, HSubArgumentDialog } });

const entity = defineModel<Specification<StructSpecs>>({
  default: () => ({}),
});

const openSubArgumentDialog = ref(false);

const onAddParameter = (item: Specification<Specs>) => {
  console.log("----struct----", item);

  if (isEmpty(entity.value.dataType.specs)) {
    entity.value.dataType.specs = [];
  }
  entity.value.dataType.specs.push(item);
};
</script>
