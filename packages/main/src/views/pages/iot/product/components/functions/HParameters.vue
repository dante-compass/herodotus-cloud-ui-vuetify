<template>
  <div>
    <h-label :text="label"></h-label>
    <h-parameter-list v-if="isShowList" v-model="model"></h-parameter-list>
    <h-parameter-button text="+ 添加参数" @click="isOpenDialog = !isOpenDialog"></h-parameter-button>
    <h-add-argument-dialog v-model="isOpenDialog" @save="onAddParameter"></h-add-argument-dialog>
  </div>
</template>

<script setup lang="ts">
import type { TslArgumentEntity, Specification, Specs } from '@herodotus/api';

import { isEmpty } from 'lodash-es';

import HParameterButton from './HParameterButton.vue';
import HParameterList from './HParameterList.vue';
import HAddArgumentDialog from './HAddArgumentDialog.vue';

defineOptions({ name: 'HParameters', components: { HParameterButton, HParameterList, HAddArgumentDialog } });

interface Props {
  label?: string;
}

withDefaults(defineProps<Props>(), {
  label: '输出参数：',
});

const model = defineModel<Array<TslArgumentEntity>>({
  default: () => [],
});

const isOpenDialog = shallowRef<boolean>(false);

const isShowList = computed(() => {
  return !isEmpty(model.value) && model.value.length >= 1;
});

const onAddParameter = (item: Specification<Specs>) => {
  const argument = {
    identifier: item.identifier,
    name: item.name,
    type: item.dataType.type,
    specs: item,
  } as TslArgumentEntity;

  if (isEmpty(model.value)) {
    model.value = [];
  }
  // 直接使用 model.value.push 无法触发响应式
  model.value = [...model.value, argument];
};
</script>
