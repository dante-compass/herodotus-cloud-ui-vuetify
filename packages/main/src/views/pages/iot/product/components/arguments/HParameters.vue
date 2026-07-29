<template>
  <div>
    <v-row>
      <v-col cols="3"><h-label :text="label"></h-label></v-col>
      <v-col cols="9" class="align-self-start">
        <h-tsl-button text="+ 添加参数" @click="isOpenDialog = !isOpenDialog"></h-tsl-button>
      </v-col>
    </v-row>

    <v-list :border="showBorder" density="compact" :lines="false" rounded class="py-0">
      <v-list-item v-for="(item, i) in model" :key="i">
        <v-list-item-subtitle v-text="'参数名称：' + item.name"></v-list-item-subtitle>
        <template #append>
          <h-tsl-button v-if="isEdit" text="编辑" @click="onDelete(item)"></h-tsl-button>
          <h-tsl-button text="删除" @click="onDelete(item)"></h-tsl-button>
        </template>
      </v-list-item>
    </v-list>

    <h-parameter-list v-if="isShowList" v-model="model" class="mb-4"></h-parameter-list>

    <h-primary-adding-dialog v-model="isOpenDialog" :status="status" @save="onAddParameter"></h-primary-adding-dialog>
  </div>
</template>

<script setup lang="ts">
import type { TslStatus, TslArgumentEntity, Specification, Specs } from '@herodotus/api';

import { isEmpty, remove } from 'lodash-es';

import { useTslEntity, useTslStatus } from '../../composables/hooks';

import HPrimaryAddingDialog from './HPrimaryAddingDialog.vue';
import HParameterList from './HParameterList.vue';
import HTslButton from './HTslButton.vue';

defineOptions({ name: 'HParameters', components: { HParameterList, HTslButton, HPrimaryAddingDialog } });

interface Props {
  label?: string;
  status?: TslStatus;
}

const props = withDefaults(defineProps<Props>(), {
  label: '输出参数：',
  status: 'create',
});

const model = defineModel<Array<TslArgumentEntity>>({
  default: () => [],
});

const { isEdit } = useTslStatus(() => props.status);

const isOpenDialog = shallowRef<boolean>(false);

const isShowList = computed(() => {
  return !isEmpty(model.value) && model.value.length >= 1;
});

const showBorder = computed(() => {
  return !isEmpty(model.value);
});

const onDelete = (item: TslArgumentEntity | Specification<Specs>) => {
  remove(model.value, (i) => {
    return i.identifier === item.identifier;
  });
};

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
