<template>
  <v-card>
    <v-card-text>
      <h-data-table
        v-model:page-size="pageSize"
        v-model:page-number="pageNumber"
        v-model:total-pages="totalPages"
        v-model:total-items="totalItems"
        :headers="headers"
        :items="tableRows"
        :item-value="rowKey"
        :loading="loading"
        select-strategy="single"
        disable-sort
        @update:options="findItems"
      >
        <template #control>
          <v-btn prepend-icon="mdi-plus" text="新建功能" @click="openDialogForCreate"></v-btn>
        </template>

        <template #item.dimension="{ value }">
          <v-chip v-if="value" density="compact" rounded="lg" :color="getDimensionColor(value)" label>
            {{ getDictionaryItemDisplay('Dimension', value) }}
          </v-chip>
        </template>

        <template #item.type="{ value }">
          <v-chip v-if="value" density="compact" rounded="lg" color="purple" label>
            {{ getDictionaryItemDisplay('ArgumentType', value) }}
          </v-chip>
        </template>

        <template #item.specs="{ value }">
          <div v-if="isBoolSpec(value)">
            布尔值：
            <h-spec-chip :spec="value"></h-spec-chip>
          </div>
          <div v-else-if="isEnumSpec(value)">
            枚举值：
            <h-spec-chip :spec="value"></h-spec-chip>
          </div>
          <div v-else>{{ displayDataType(value) }}</div>
        </template>

        <template #item.actions="{ item }">
          <h-action-edit-button @click="openDialogForEdit(item)"></h-action-edit-button>
          <h-action-delete-button v-if="!item.reserved" @click="deleteItemById(item[rowKey])"></h-action-delete-button>
        </template>
      </h-data-table>
    </v-card-text>
  </v-card>
  <h-add-function-dialog
    v-model="openDialog"
    v-model:entity="entity"
    :product-id="productId"
    :product-key="productKey"
  ></h-add-function-dialog>
</template>

<script setup lang="ts">
import type { TslFunctionEntity, TslFunctionConditions, TslFunctionProps, Specification, Specs } from '@herodotus/api';
import type { VDataTableHeaders } from '@/composables/declarations';

import { useTable, useDictionary } from '@/composables/hooks';
import { API, PAGE_NAME } from '@/configurations';

import HAddFunctionDialog from './HAddFunctionDialog.vue';
import HSpecChip from './HSpecChip.vue';

defineOptions({ name: PAGE_NAME.IOT_TSL_FUNCTION, components: { HAddFunctionDialog, HSpecChip } });

interface Props {
  productKey: string;
  productId: string;
}

const props = defineProps<Props>();

const headers = ref([
  { key: 'dimension', align: 'center', title: '功能类型' },
  { key: 'name', align: 'center', title: '功能名称' },
  { key: 'identifier', align: 'center', title: '标识符' },
  { key: 'type', align: 'center', title: '数据类型' },
  { key: 'specs', align: 'left', title: '数据定义' },
  { key: 'actions', align: 'center', title: '操作' },
]) as Ref<Array<VDataTableHeaders>>;

const rowKey: TslFunctionProps = 'id';

const { loading, pageNumber, pageSize, tableRows, totalPages, totalItems, deleteItemById, findItems } = useTable<
  TslFunctionConditions,
  TslFunctionEntity
>(API.core.iotTslFunction(), PAGE_NAME.IOT_TSL_FUNCTION);

const { getDictionaryItemDisplay } = useDictionary('Dimension', 'ArgumentType', 'CallType', 'EventType');

const openDialog = shallowRef(false);
const entity = ref({}) as Ref<TslFunctionEntity>;

const isBoolSpec = (specs: Specification<Specs>) => {
  return specs.dataType.type === 'bool';
};

const isEnumSpec = (specs: Specification<Specs>) => {
  return specs.dataType.type === 'enum';
};

const displayDataType = (specs: Specification<Specs>) => {
  switch (specs.dataType.type) {
    case 'int':
    case 'float':
    case 'double':
      if (specs.dataType.specs.min && specs.dataType.specs.max) {
        return '取值范围：' + specs.dataType.specs.min + '~' + specs.dataType.specs.max;
      } else {
        return '取值范围：- ';
      }
    case 'text':
      return '数据长度：' + specs.dataType.specs.length;
    default:
      return '-';
  }
};

const getDimensionColor = (dimension: string) => {
  console.log(dimension);
  switch (dimension) {
    case 'services':
      return 'green';
    case 'events':
      return 'yellow';

    default:
      return 'blue';
  }
};

const openDialogForCreate = () => {
  entity.value = {
    dimension: 'properties',
    productId: props.productId,
    productKey: props.productKey,
  } as TslFunctionEntity;
  openDialog.value = true;
};

const openDialogForEdit = (item: TslFunctionEntity) => {
  entity.value = item;
  openDialog.value = true;
};
</script>
