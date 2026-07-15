<template>
  <div>
    <h-characteristic-panel v-model="model"></h-characteristic-panel>
    <h-label text="数据类型：" required></h-label>
    <h-dictionary-select
      v-model="model.dataType.type"
      dictionary="ArgumentType"
      density="compact"
    ></h-dictionary-select>
    <component :is="currentPanel" v-model="model"></component>
  </div>
</template>

<script setup lang="ts">
import type { Specification, Specs, StructSpecs } from '@herodotus/api';

import { toUpper, isEmpty } from 'lodash-es';

import { HDictionarySelect } from '@/components/library/HDictionary';

import HBoolPanel from './HBoolPanel.vue';
import HDatePanel from './HDatePanel.vue';
import HEnumPanel from './HEnumPanel.vue';
import HNumberPanel from './HNumberPanel.vue';
import HTextPanel from './HTextPanel.vue';
import HStructPanel from './HStructPanel.vue';
import HCharacteristicPanel from './HCharacteristicPanel.vue';

defineOptions({
  name: 'HArgumentPanel',
  components: {
    HCharacteristicPanel,
    HDictionarySelect,
    INT_PANEL: HNumberPanel,
    FLOAT_PANEL: HNumberPanel,
    DOUBLE_PANEL: HNumberPanel,
    DATE_PANEL: HDatePanel,
    BOOL_PANEL: HBoolPanel,
    ENUM_PANEL: HEnumPanel,
    TEXT_PANEL: HTextPanel,
    STRUCT_PANEL: HStructPanel,
  },
});

const model = defineModel<Specification<Specs>>({
  default: () => ({ identifier: '', name: '', dataType: { type: 'int', specs: {} } }) as Specification<Specs>,
});

const currentPanel = computed(() => {
  if (model.value.dataType.type) {
    return toUpper(model.value.dataType.type) + '_PANEL';
  } else {
    return 'INT_PANEL';
  }
});

/**
 * 判断当前的 model 是否为默认值。是默认值则代表是新建操作，即 model 是默认的空对象。否则，代表是编辑操作，即外部给 model 传递具体的值
 *
 * 目前采用最简单的判断方式，即 model 中 identifier 和 name 都为空值
 */
const isModelEmpty = () => {
  return isEmpty(model.value.identifier) && isEmpty(model.value.name);
};

watch(
  () => model.value.dataType.type,
  (newValue, oldValue) => {
    // 类型未实际变化则跳过（避免初始化时重复触发）

    console.log('--------', newValue);
    if (newValue === oldValue) {
      return;
    }

    // 仅在新创建的情况下，做此操作避免切换至 struts 面板时，抛出类型不匹配错误
    if (isModelEmpty()) {
      model.value = {
        identifier: '',
        name: '',
        dataType: { type: newValue, specs: newValue === 'struct' ? [] : {} },
      } as Specification<Specs>;
    }
  },
);
</script>
