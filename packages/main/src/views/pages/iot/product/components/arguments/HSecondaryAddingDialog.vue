<template>
  <h-dialog v-model="model" title="添加参数" @confirm="onSave">
    <v-form ref="secondaryAddingForm">
      <h-characteristic-panel v-model="argument" :status="status"></h-characteristic-panel>
      <h-label text="数据类型" required></h-label>
      <h-dictionary-select
        v-model="argument.dataType.type"
        dictionary="ArgumentType"
        :disabled-items="['struct']"
        :disabled="disabled"
      ></h-dictionary-select>
      <component :is="currentPanel" v-model="argument" :status="status"></component>
    </v-form>
  </h-dialog>
</template>

<script setup lang="ts">
import type { TslStatus, Specification, Specs } from '@herodotus/api';

import { toUpper } from 'lodash-es';

import { useTslStatus } from '../../composables/hooks';

import { HDictionarySelect } from '@/components/library/HDictionary';
import HArgumentBoolPanel from './HArgumentBoolPanel.vue';
import HArgumentDatePanel from './HArgumentDatePanel.vue';
import HArgumentEnumPanel from './HArgumentEnumPanel.vue';
import HArgumentNumberPanel from './HArgumentNumberPanel.vue';
import HArgumentTextPanel from './HArgumentTextPanel.vue';
import HCharacteristicPanel from './HCharacteristicPanel.vue';

defineOptions({
  name: 'HSecondaryAddingDialog',
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
  },
});

interface Props {
  status?: TslStatus;
}

const props = withDefaults(defineProps<Props>(), {
  status: 'create',
});

const model = defineModel<boolean>({
  required: true,
});

const emit = defineEmits(['save']);

const { disabled } = useTslStatus(() => props.status);

const secondaryAddingForm = ref();
const argument = ref({
  identifier: '',
  name: '',
  dataType: { type: 'int', specs: {} },
}) as Ref<Specification<Specs>>;

const currentPanel = computed(() => {
  if (argument.value.dataType.type) {
    return toUpper(argument.value.dataType.type) + '_PANEL';
  } else {
    return 'INT_PANEL';
  }
});

const onSave = async () => {
  const { valid } = await secondaryAddingForm.value.validate();
  if (valid) {
    model.value = false;
    emit('save', argument.value);
  }
};

onUpdated(() => {
  // 每次重新打开 Dialog，清除上次操作遗留数据
  argument.value = {
    identifier: '',
    name: '',
    dataType: { type: 'int', specs: {} },
  } as Specification<Specs>;
});
</script>
