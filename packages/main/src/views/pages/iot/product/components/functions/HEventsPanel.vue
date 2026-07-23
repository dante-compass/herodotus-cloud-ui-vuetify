<template>
  <v-form ref="identifier">
    <h-characteristic-panel v-model="entity"></h-characteristic-panel>
    <h-label text="事件类型:" required></h-label>
    <h-dictionary-option
      v-model="entity.eventType"
      dictionary="EventType"
      default-value="info"
      inline
    ></h-dictionary-option>
    <h-label text="输出参数:"></h-label>
    <h-tsl-param-list v-if="showParameters" v-model="entity.arguments.eventOutputData"></h-tsl-param-list>
    <h-tsl-button text="+ 添加参数" @click="isOpenDialog = !isOpenDialog" />
    <h-add-argument-dialog v-model="isOpenDialog" @save="onAddParameter"></h-add-argument-dialog>
  </v-form>
</template>

<script setup lang="ts">
import type { TslFunctionEntity, TslArgumentEntity, Specification, Specs } from '@herodotus/api';

import { computed, shallowRef } from 'vue';

import { isEmpty } from 'lodash-es';
import { useTslValidation } from '../../composables/hooks';

import { HDictionaryOption } from '@/components/library/HDictionary';
import { HTslButton, HTslParamList } from '../commons';

import { HCharacteristicPanel } from '../arguments';
import HAddArgumentDialog from './HAddArgumentDialog.vue';

defineOptions({
  name: 'HEventsPanel',
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
      dimension: 'events',
      required: false,
      arguments: { eventOutputData: [] as TslArgumentEntity[] },
    }) as TslFunctionEntity,
});

const isOpenDialog = shallowRef<boolean>(false);
const { identifier, validate } = useTslValidation();

const showParameters = computed(() => {
  return !isEmpty(entity.value.arguments.eventOutputData);
});

const onAddParameter = (item: Specification<Specs>) => {
  const attribute = {
    identifier: item.identifier,
    name: item.name,
    type: item.dataType.type,
    specs: item,
  } as TslArgumentEntity;

  if (isEmpty(entity.value.arguments.eventOutputData)) {
    entity.value.arguments.eventOutputData = [];
  }
  entity.value.arguments.eventOutputData.push(attribute);
};

/**
 * 对外暴露 validate() 方法，实现父组件调用子组件校验方法
 */
defineExpose({
  validate,
});
</script>
