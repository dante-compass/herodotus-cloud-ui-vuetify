<template>
  <h-detail-container v-bind="$attrs">
    <v-container>
      <v-row>
        <v-col></v-col>
        <v-col>
          <slot></slot>
          <v-text-field
            v-model="entity.description"
            label="备注"
            placeholder="请输入备注"
          ></v-text-field>
          <v-text-field
            v-model.number="entity.ranking"
            label="排序值"
            placeholder="请输入排序值"
            type="number"
          />
          <h-dictionary-select
            v-model="entity.status"
            dictionary="DataItemStatus"
            label="数据状态"
          ></h-dictionary-select>
          <v-divider></v-divider>
          <v-switch v-model="entity.reserved" label="是否为保留数据"></v-switch>
          <div>
            <h-button color="red" @click="onFinish()">取消</h-button>
            <h-button color="primary" class="ml-2" @click="onSave()">保存</h-button>
            <slot name="button"></slot>
          </div>
        </v-col>
        <v-col></v-col>
      </v-row>
    </v-container>
  </h-detail-container>
</template>

<script setup lang="ts">
import type { AbstractSysEntity } from '@herodotus/core';

import { useEditFinish } from '@herodotus/framework';

import HDetailContainer from './HDetailContainer.vue';
import { HDictionarySelect } from '../library/Select';

defineOptions({
  name: 'HCenterLayoutConstainer',
  components: { HDetailContainer, HDictionarySelect },
});

interface Props {
  entity: AbstractSysEntity;
}

withDefaults(defineProps<Props>(), {
  entity: () => ({}) as AbstractSysEntity,
});

const emit = defineEmits<{
  save: [];
}>();

const { onFinish } = useEditFinish();

const onSave = async () => {
  emit('save');
};
</script>
