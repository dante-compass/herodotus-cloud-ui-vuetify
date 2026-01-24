<template>
  <h-center-layout-container
    :entity="editedItem"
    :title="title"
    :overlay="overlay"
    :operation="operation"
    @save="onSave()"
  >
    <v-form ref="dictionaryForm" validate-on="blur lazy">
      <v-text-field v-model="editedItem.category" label="分类" disabled></v-text-field>
      <v-text-field
        v-model="editedItem.name"
        label="字面量 * "
        placeholder="请输入字面量"
        :rules="[(v: string) => !!v || '字面量不能为空']"
      ></v-text-field>
      <v-text-field
        v-model="editedItem.label"
        label="显示值 * "
        placeholder="请输显示值"
        :rules="[(v: string) => !!v || '显示值不能为空']"
      ></v-text-field>
    </v-form>
  </h-center-layout-container>
</template>

<script setup lang="ts">
import type { SysDictionaryEntity } from '@herodotus/api';

import { useEntityTableItem } from '@/composables/hooks';
import { API } from '@/configurations';

defineOptions({ name: 'SysDictionaryContent' });

const dictionaryForm = ref();

const { editedItem, operation, title, overlay, saveOrUpdate } =
  useEntityTableItem<SysDictionaryEntity>(API.core.sysDictionary());

const onSave = async () => {
  const { valid } = await dictionaryForm.value.validate();
  if (valid) {
    saveOrUpdate();
  }
};
</script>
