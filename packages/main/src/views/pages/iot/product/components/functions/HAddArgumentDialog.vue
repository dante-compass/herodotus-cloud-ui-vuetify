<template>
  <h-dialog v-model="model" title="添加参数" @confirm="onSave" @cancel="onCancel" external-close>
    <v-form ref="addArgumentForm">
      <h-argument-panel v-model="argument" ref="identifier"></h-argument-panel>
    </v-form>
  </h-dialog>
</template>

<script setup lang="ts">
import type { Specification, Specs } from '@herodotus/api';

import { HDictionarySelect } from '@/components/library/HDictionary';
import { HArgumentPanel } from '../arguments';

defineOptions({
  name: 'HAddArgumentDialog',
  components: {
    HDictionarySelect,
    HArgumentPanel,
  },
});

const model = defineModel<boolean>({
  required: true,
});

const emit = defineEmits<{
  save: [item: Specification<Specs>];
  cancel: [];
}>();

const addArgumentForm = ref();

const argument = ref({
  identifier: '',
  name: '',
  dataType: { type: 'int', specs: {} },
}) as Ref<Specification<Specs>>;

const onSave = async () => {
  const { valid } = await addArgumentForm.value.validate();
  if (valid) {
    model.value = false;
    emit('save', argument.value);
  }
};

const onCancel = () => {
  model.value = false;
  emit('cancel');
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
