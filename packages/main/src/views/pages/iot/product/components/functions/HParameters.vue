<template>
  <div>
    <v-row>
      <v-col cols="3"><h-label :text="label"></h-label></v-col>
      <v-col cols="9" class="align-self-start">
        <h-parameter-button text="+ 添加参数" @click="isOpenDialog = !isOpenDialog"></h-parameter-button>
      </v-col>
    </v-row>

    <h-parameter-list v-if="isShowList" v-model="model" class="mb-4"></h-parameter-list>

    <h-add-argument-dialog
      v-model="isOpenDialog"
      :for-create="forCreate"
      @save="onAddParameter"
    ></h-add-argument-dialog>
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
  forCreate: boolean;
}

withDefaults(defineProps<Props>(), {
  label: '输出参数：',
  forCreate: true,
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
