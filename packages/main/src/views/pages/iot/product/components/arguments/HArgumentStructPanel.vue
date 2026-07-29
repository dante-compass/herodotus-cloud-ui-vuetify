<template>
  <div>
    <h-label text="JSON 对象：" required></h-label>

    <v-list :border="showBorder" density="compact" :lines="false" rounded class="py-0">
      <v-list-item v-for="(item, i) in model.dataType.specs" :key="i">
        <v-list-item-subtitle v-text="'参数名称：' + item.name"></v-list-item-subtitle>
        <template #append>
          <h-tsl-button v-if="isEdit" text="编辑" @click="onDelete(item)"></h-tsl-button>
          <h-tsl-button text="删除" @click="onDelete(item)"></h-tsl-button>
        </template>
      </v-list-item>
    </v-list>

    <h-tsl-button v-if="!isView" text="+ 新增参数" class="my-4" @click="openDialog = !openDialog" />
    <h-secondary-adding-dialog v-model="openDialog" @save="onAddParameter"></h-secondary-adding-dialog>
  </div>
</template>

<script setup lang="ts">
import type { TslStatus, Specification, StructSpecs, Specs } from '@herodotus/api';

import { isEmpty, remove } from 'lodash-es';

import { useTslStatus } from '../../composables/hooks';

import HSecondaryAddingDialog from './HSecondaryAddingDialog.vue';
import HParameterList from './HParameterList.vue';
import HTslButton from './HTslButton.vue';

defineOptions({ name: 'HArgumentStructPanel', components: { HSecondaryAddingDialog, HTslButton, HParameterList } });

interface Props {
  status?: TslStatus;
}

const props = withDefaults(defineProps<Props>(), {
  status: 'create',
});

const model = defineModel<Specification<StructSpecs>>({
  default: () => ({ identifier: '', name: '', dataType: { type: 'struct', specs: [] } }),
});

const { isView, isEdit } = useTslStatus(() => props.status);

const openDialog = ref(false);

const showBorder = computed(() => {
  return !isEmpty(model.value);
});

const onDelete = (item: Specification<Specs>) => {
  remove(model.value.dataType.specs, (i) => {
    return i.identifier === item.identifier;
  });
};
const onAddParameter = (item: Specification<Specs>) => {
  if (isEmpty(model.value.dataType.specs)) {
    model.value.dataType.specs = [];
  }
  model.value.dataType.specs.push(item);
};
</script>
