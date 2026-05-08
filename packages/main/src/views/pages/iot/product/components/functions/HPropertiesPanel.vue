<template>
  <div>
    <h-label text="读写类型" required></h-label>
    <h-dictionary-option
      v-model="entity.accessMode"
      dictionary="AccessMode"
      default-value="rw"
      inline
    ></h-dictionary-option>
  </div>
</template>

<script setup lang="ts">
import type { TslFunctionEntity, Specification, Specs } from "@herodotus/api";

import { isEmpty } from "lodash-es";
import { useTslEntity, useTslValidate } from "@/composables/hooks";

import { HDictionaryOption } from "@/components/library/HSelect";

defineOptions({ name: "HPropertiesPanel" });

const entity = defineModel<TslFunctionEntity>({
  default: () => ({}),
});

const { createEmptyNormalArgument } = useTslEntity();
const { identifier, validate } = useTslValidate();
const argument = ref<Specification<Specs>>(createEmptyNormalArgument());

watch(
  argument,
  (newValue) => {
    entity.value.type = newValue.dataType.type;
    entity.value.specs = newValue;
    if (newValue.identifier !== entity.value.identifier) {
      entity.value.identifier = newValue.identifier;
    }

    if (newValue.name !== entity.value.name) {
      entity.value.name = newValue.name;
    }
  },
  {
    immediate: true,
    deep: true,
  },
);

onMounted(() => {
  if (!isEmpty(entity) && !isEmpty(entity.value.specs)) {
    argument.value = entity.value.specs;
  }
});
</script>
