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
    <h-parameters v-model="entity.arguments.eventOutputData" :for-create="forCreate"></h-parameters>
  </v-form>
</template>

<script setup lang="ts">
import type { TslFunctionEntity, TslArgumentEntity } from '@herodotus/api';

import { useTslValidation } from '../../composables/hooks';

import { HDictionaryOption } from '@/components/library/HDictionary';

import { HCharacteristicPanel } from '../arguments';
import HParameters from './HParameters.vue';

defineOptions({
  name: 'HEventsPanel',
  components: {
    HDictionaryOption,
    HCharacteristicPanel,
    HParameters,
  },
});

interface Props {
  forCreate: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  forCreate: true,
});

const entity = defineModel<TslFunctionEntity>({
  default: () =>
    ({
      dimension: 'events',
      required: false,
      arguments: { eventOutputData: [] as TslArgumentEntity[] },
    }) as TslFunctionEntity,
});

const { identifier, validate } = useTslValidation();

watch(
  entity,
  (newValue) => {
    console.log('---events---', newValue);
  },
  { deep: true },
);

/**
 * 对外暴露 validate() 方法，实现父组件调用子组件校验方法
 */
defineExpose({
  validate,
});
</script>
