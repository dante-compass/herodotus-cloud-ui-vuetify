<template>
  <h-dialog v-model="model" prepend-icon="mdi-function" title="添加物模型功能" @confirm="onSave">
    <h-label text="功能类型：" required></h-label>
    <h-dictionary-toggle
      class="q-mb-md"
      v-model="entity.dimension"
      dictionary="Dimension"
      default-value="properties"
    ></h-dictionary-toggle>
    <component :is="currentPanel" v-model="entity" ref="identifier"></component>
    <h-label text="描述："></h-label>
    <v-textarea
      v-model="entity.description"
      placeholder="请输入描述内容"
      maxlength="100"
      counter
      single-line
    ></v-textarea>
  </h-dialog>
</template>

<script setup lang="ts">
import type { TslFunctionEntity, TslArgumentEntity } from '@herodotus/api';

import { toUpper } from 'lodash-es';
import { toast } from '@herodotus/core';

import { useTslValidation } from '../composables/hooks';
import { API } from '@/configurations';
import { HDictionaryToggle } from '@/components/library/HDictionary';

import HPropertiesPanel from './functions/HPropertiesPanel.vue';
import HEventsPanel from './functions/HEventsPanel.vue';
import HServicesPanel from './functions/HServicesPanel.vue';

defineOptions({
  name: 'HAddFunctionDialog',
  components: {
    HDictionaryToggle,
    EVENTS_PANEL: HEventsPanel,
    PROPERTIES_PANEL: HPropertiesPanel,
    SERVICES_PANEL: HServicesPanel,
  },
});

interface Props {
  productKey: string;
  productId: string;
}

const props = defineProps<Props>();

const model = defineModel<boolean>({
  default: false,
  required: true,
});

const entity = defineModel<TslFunctionEntity>('entity', {
  default: () =>
    ({
      dimension: 'properties',
      required: false,
      arguments: {
        property: {} as TslArgumentEntity,
        eventOutputData: [] as TslArgumentEntity[],
        serviceOutputData: [] as TslArgumentEntity[],
        serviceInputData: [] as TslArgumentEntity[],
      },
    }) as TslFunctionEntity,
  required: true,
});

const emit = defineEmits(['success']);
const { identifier, getValidator } = useTslValidation();

const currentPanel = computed(() => {
  if (entity.value.dimension) {
    return toUpper(entity.value.dimension) + '_PANEL';
  } else {
    return 'PROPERTIES_PANEL';
  }
});

const onSave = () => {
  const valid = getValidator();
  valid.then((result) => {
    if (result) {
      API.core
        .iotTslFunction()
        .saveOrUpdate(entity.value)
        .then((result) => {
          model.value = false;
          emit('success');
          toast.success('添加成功！');
        })
        .catch((error) => {
          model.value = false;
          toast.error(error.message);
        });
    }
  });
};
</script>
