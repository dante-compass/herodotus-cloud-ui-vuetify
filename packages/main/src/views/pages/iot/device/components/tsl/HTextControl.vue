<template>
  <v-form v-if="form" ref="textControlForm">
    <v-row>
      <v-col cols="9">
        <v-text-field
          v-model="model"
          :counter="counter"
          density="comfortable"
          :rules="[(v: string) => !!v || '不能输入空值']"
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-btn prepend-icon="mdi-send" variant="tonal" @click="onSave">设置</v-btn>
      </v-col>
    </v-row>
  </v-form>
  <v-text-field
    v-else
    v-model="model"
    :counter="counter"
    density="comfortable"
    :rules="[(v: string) => !!v || '不能输入空值']"
  ></v-text-field>
</template>

<script setup lang="ts">
import type { Specification, TextSpecs } from '@herodotus/api';
import { isEmpty } from 'lodash-es';

defineOptions({ name: 'HTextControl' });

const model = defineModel<string>();

interface Props {
  form?: boolean;
  specs: Specification<TextSpecs>;
}

const props = withDefaults(defineProps<Props>(), {
  form: false,
});

const emit = defineEmits<{
  save: [];
}>();

const textControlForm = ref();

const counter = computed(() => {
  if (!isEmpty(props.specs) && !isEmpty(props.specs.dataType)) {
    return props.specs.dataType.specs.length;
  }
  return false;
});

const onSave = async () => {
  if (props.form) {
    const { valid } = await textControlForm.value.validate();
    if (valid) {
      emit('save');
    }
  }
};
</script>
