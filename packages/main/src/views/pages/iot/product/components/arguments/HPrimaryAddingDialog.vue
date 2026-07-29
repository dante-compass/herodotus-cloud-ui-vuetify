<template>
  <h-dialog v-model="model" title="添加参数" @confirm="onSave" @cancel="onCancel" external-close>
    <v-form ref="primaryAddingForm">
      <h-argument-panel v-model="argument" ref="identifier" :status="status"></h-argument-panel>
    </v-form>
  </h-dialog>
</template>

<script setup lang="ts">
import type { TslStatus, Specification, Specs } from '@herodotus/api';

import { HDictionarySelect } from '@/components/library/HDictionary';
import { HArgumentPanel } from '../arguments';

defineOptions({ name: 'HPrimaryAddingDialog', components: { HDictionarySelect, HArgumentPanel } });

interface Props {
  status?: TslStatus;
}

const props = withDefaults(defineProps<Props>(), {
  status: 'create',
});

const model = defineModel<boolean>({
  required: true,
});

const emit = defineEmits<{
  save: [item: Specification<Specs>];
  cancel: [];
}>();

const primaryAddingForm = ref();

const argument = defineModel<Specification<Specs>>({
  default: () => ({ identifier: '', name: '', dataType: { type: 'int', specs: {} } }) as Specification<Specs>,
});

const onSave = async () => {
  const { valid } = await primaryAddingForm.value.validate();
  if (valid) {
    model.value = false;
    emit('save', argument.value);
  }
};

const onCancel = () => {
  model.value = false;
  emit('cancel');
};
</script>
