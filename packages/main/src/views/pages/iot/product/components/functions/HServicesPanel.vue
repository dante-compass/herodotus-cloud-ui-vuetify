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
    <h-parameters v-model="entity.arguments.serviceInputData" label="输入参数："></h-parameters>
    <h-parameters v-model="entity.arguments.serviceOutputData"></h-parameters>
  </v-form>
</template>

<script setup lang="ts">
import type { TslFunctionEntity, TslArgumentEntity } from '@herodotus/api';

import { useTslValidation } from '../../composables/hooks';

import { HDictionaryOption } from '@/components/library/HDictionary';
import { HCharacteristicPanel } from '../arguments';
import HParameters from './HParameters.vue';

defineOptions({
  name: 'HServicePanel',
  components: {
    HDictionaryOption,
    HCharacteristicPanel,
    HParameters,
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

const { identifier, validate } = useTslValidation();

/**
 * 对外暴露 validate() 方法，实现父组件调用子组件校验方法
 */
defineExpose({
  validate,
});
</script>
