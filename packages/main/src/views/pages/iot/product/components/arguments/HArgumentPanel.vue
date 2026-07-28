<template>
  <div>
    <h-characteristic-panel v-model="argument" :status="status"></h-characteristic-panel>
    <h-label text="数据类型：" required></h-label>
    <h-dictionary-select
      v-model="argument.dataType.type"
      dictionary="ArgumentType"
      density="compact"
      :disabled="disabled"
    ></h-dictionary-select>
    <component :is="currentPanel" v-model="argument" :status="status"></component>
  </div>
</template>

<script setup lang="ts">
import type { TslStatus, Specification, Specs } from '@herodotus/api';

import { toUpper, isEmpty } from 'lodash-es';

import { useTslStatus } from '../../composables/hooks';

import { HDictionarySelect } from '@/components/library/HDictionary';

import HArgumentBoolPanel from './HArgumentBoolPanel.vue';
import HArgumentDatePanel from './HArgumentDatePanel.vue';
import HArgumentEnumPanel from './HArgumentEnumPanel.vue';
import HArgumentNumberPanel from './HArgumentNumberPanel.vue';
import HArgumentTextPanel from './HArgumentTextPanel.vue';
import HArgumentStructPanel from './HArgumentStructPanel.vue';
import HCharacteristicPanel from './HCharacteristicPanel.vue';

defineOptions({
  name: 'HArgumentPanel',
  components: {
    HCharacteristicPanel,
    HDictionarySelect,
    INT_PANEL: HArgumentNumberPanel,
    FLOAT_PANEL: HArgumentNumberPanel,
    DOUBLE_PANEL: HArgumentNumberPanel,
    DATE_PANEL: HArgumentDatePanel,
    BOOL_PANEL: HArgumentBoolPanel,
    ENUM_PANEL: HArgumentEnumPanel,
    TEXT_PANEL: HArgumentTextPanel,
    STRUCT_PANEL: HArgumentStructPanel,
  },
});

interface Props {
  status?: TslStatus;
}

const props = withDefaults(defineProps<Props>(), {
  status: 'create',
});

const argument = defineModel<Specification<Specs>>({
  default: () => ({ identifier: '', name: '', dataType: { type: 'int', specs: {} } }) as Specification<Specs>,
});

const { disabled } = useTslStatus(props.status);

const currentPanel = computed(() => {
  if (argument.value.dataType.type) {
    return toUpper(argument.value.dataType.type) + '_PANEL';
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
  return isEmpty(argument.value.identifier) && isEmpty(argument.value.name);
};

watch(
  () => argument.value.dataType.type,
  (newValue, oldValue) => {
    // 类型未实际变化则跳过（避免初始化时重复触发）
    if (newValue === oldValue) {
      return;
    }

    // 仅在新创建的情况下，做此操作避免切换至 struts 面板时，抛出类型不匹配错误
    if (isModelEmpty()) {
      argument.value = {
        identifier: '',
        name: '',
        dataType: { type: newValue, specs: newValue === 'struct' ? [] : {} },
      } as Specification<Specs>;
    }
  },
);
</script>
