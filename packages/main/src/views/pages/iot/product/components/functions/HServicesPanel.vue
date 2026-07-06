<template>
  <v-form ref="identifier">
    <h-characteristic-panel v-model="entity"></h-characteristic-panel>
    <h-label text="调用方式：" required></h-label>
    <h-dictionary-option
      v-model="entity.callType"
      dictionary="CallType"
      default-value="async"
      inline
    ></h-dictionary-option>
    <h-label text="输入参数："></h-label>
    <h-tsl-param-list v-if="isShowInput" v-model="input"></h-tsl-param-list>
    <h-tsl-button text="+ 添加参数" @click="isOpenInputDialog = !isOpenInputDialog" />
    <h-add-argument-dialog v-model="isOpenInputDialog" @save="onAddInputParameter"></h-add-argument-dialog>
    <h-label text="输出参数"></h-label>
    <h-tsl-param-list v-if="isShowOutput" v-model="output"></h-tsl-param-list>
    <h-tsl-button text="+ 添加参数" @click="isOpenOutDialog = !isOpenOutDialog" />
    <h-add-argument-dialog v-model="isOpenOutDialog" @save="onAddOutputParameter"></h-add-argument-dialog>
  </v-form>
</template>

<script setup lang="ts">
import type { TslFunctionEntity, TslArgumentEntity, Specification, Specs } from "@herodotus/api";

import { computed, shallowRef } from "vue";

import { isEmpty, filter, matches } from "lodash-es";
import { useTslValidation } from "../../composables/hooks";

import { HDictionaryOption } from "@/components/library/HDictionary";
import { HCharacteristicPanel } from "../arguments";
import { HTslButton, HTslParamList } from "../commons";
import HAddArgumentDialog from "./HAddArgumentDialog.vue";

defineOptions({
  name: "HServicePanel",
  components: {
    HDictionaryOption,
    HCharacteristicPanel,
    HTslButton,
    HTslParamList,
    HAddArgumentDialog,
  },
});

const entity = defineModel<TslFunctionEntity>({
  default: () => ({}) as TslFunctionEntity,
});

const isOpenInputDialog = shallowRef<boolean>(false);
const isOpenOutDialog = shallowRef<boolean>(false);
const { identifier, validate } = useTslValidation();

const output = computed(() => {
  return filter(entity.value.arguments, matches({ output: true }));
});

const input = computed(() => {
  return filter(entity.value.arguments, matches({ output: false }));
});

const isShowOutput = computed(() => {
  return !isEmpty(output.value);
});

const isShowInput = computed(() => {
  return !isEmpty(input.value);
});

const onAddParameter = (item: Specification<Specs>, isOutput = true) => {
  const attribute = {
    identifier: item.identifier,
    name: item.name,
    output: isOutput,
    type: item.dataType.type,
    specs: item,
  } as TslArgumentEntity;

  if (isEmpty(entity.value.arguments)) {
    entity.value.arguments = [];
  }

  entity.value.arguments.push(attribute);
};

const onAddOutputParameter = (item: Specification<Specs>) => {
  onAddParameter(item);
};

const onAddInputParameter = (item: Specification<Specs>) => {
  onAddParameter(item, false);
};

/**
 * 对外暴露 validate() 方法，实现父组件调用子组件校验方法
 */
defineExpose({
  validate,
});
</script>
