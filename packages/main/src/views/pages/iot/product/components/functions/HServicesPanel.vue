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
    <h-tsl-param-list v-if="isShowInput" v-model="entity.arguments.serviceInputData"></h-tsl-param-list>
    <h-tsl-button text="+ 添加参数" @click="isOpenInputDialog = !isOpenInputDialog" />
    <h-add-argument-dialog v-model="isOpenInputDialog" @save="onAddInputParameter"></h-add-argument-dialog>
    <h-label text="输出参数"></h-label>
    <h-tsl-param-list v-if="isShowOutput" v-model="entity.arguments.serviceOutputData"></h-tsl-param-list>
    <h-tsl-button text="+ 添加参数" @click="isOpenOutDialog = !isOpenOutDialog" />
    <h-add-argument-dialog v-model="isOpenOutDialog" @save="onAddOutputParameter"></h-add-argument-dialog>
  </v-form>
</template>

<script setup lang="ts">
import type { TslFunctionEntity, TslArgumentEntity, Specification, Specs } from '@herodotus/api';

import { computed, shallowRef } from 'vue';

import { isEmpty } from 'lodash-es';
import { useTslValidation } from '../../composables/hooks';

import { HDictionaryOption } from '@/components/library/HDictionary';
import { HCharacteristicPanel } from '../arguments';
import { HTslButton, HTslParamList } from '../commons';
import HAddArgumentDialog from './HAddArgumentDialog.vue';

defineOptions({
  name: 'HServicePanel',
  components: {
    HDictionaryOption,
    HCharacteristicPanel,
    HTslButton,
    HTslParamList,
    HAddArgumentDialog,
  },
});

const entity = defineModel<TslFunctionEntity>({
  default: () =>
    ({
      dimension: 'services',
      required: false,
      arguments: {
        serviceOutputData: [] as TslArgumentEntity[],
        serviceInputData: [] as TslArgumentEntity[],
      },
    }) as TslFunctionEntity,
});

const isOpenInputDialog = shallowRef<boolean>(false);
const isOpenOutDialog = shallowRef<boolean>(false);
const { identifier, validate } = useTslValidation();

const isShowOutput = computed(() => {
  return !isEmpty(entity.value.arguments.serviceOutputData);
});

const isShowInput = computed(() => {
  return !isEmpty(entity.value.arguments.serviceInputData);
});

const onAddParameter = (item: Specification<Specs>, isOutput = true) => {
  const attribute = {
    identifier: item.identifier,
    name: item.name,
    type: item.dataType.type,
    specs: item,
  } as TslArgumentEntity;

  if (isOutput) {
    if (isEmpty(entity.value.arguments.serviceOutputData)) {
      entity.value.arguments.serviceOutputData = [];
    }
    entity.value.arguments.serviceOutputData.push(attribute);
  } else {
    if (isEmpty(entity.value.arguments.serviceInputData)) {
      entity.value.arguments.serviceInputData = [];
    }
    entity.value.arguments.serviceInputData.push(attribute);
  }
};

const onAddOutputParameter = (item: Specification<Specs>) => {
  onAddParameter(item, true);
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
