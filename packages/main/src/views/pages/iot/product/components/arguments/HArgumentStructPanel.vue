<template>
  <div>
    <h-label text="JSON 对象：" required></h-label>
    <h-parameter-list v-model="model.dataType.specs"></h-parameter-list>
    <h-parameter-button v-if="!isView" text="+ 新增参数" @click="openDialog = !openDialog" />
    <h-sub-argument-dialog v-model="openDialog" @save="onAddParameter"></h-sub-argument-dialog>
  </div>
</template>

<script setup lang="ts">
import type { TslStatus, Specification, StructSpecs, Specs } from '@herodotus/api';

import { isEmpty } from 'lodash-es';

import { useTslStatus } from '../../composables/hooks';

import HSubArgumentDialog from './HSubArgumentDialog.vue';
import { HParameterButton, HParameterList } from '../commons';

defineOptions({ name: 'HArgumentStructPanel', components: { HSubArgumentDialog, HParameterButton, HParameterList } });

interface Props {
  status?: TslStatus;
}

const props = withDefaults(defineProps<Props>(), {
  status: 'create',
});

const model = defineModel<Specification<StructSpecs>>({
  default: () => ({}) as Specification<StructSpecs>,
});

const { isView } = useTslStatus(props.status);

const openDialog = ref(false);

const onAddParameter = (item: Specification<Specs>) => {
  if (isEmpty(model.value.dataType.specs)) {
    model.value.dataType.specs = [];
  }
  model.value.dataType.specs.push(item);
};
</script>
