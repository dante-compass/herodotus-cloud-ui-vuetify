<template>
  <div>
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
      @update:options="fetchItems"
    >
      <template #control>
        <v-btn prepend-icon="mdi-plus" text="新建功能" @click="openDialogForCreate"></v-btn>
      </template>

      <template #item.dimension="{ value }">
        <v-chip v-if="value" density="compact" rounded="lg" :color="getDimensionColor(value)" label>
          {{ getDictionaryItemDisplay('Dimension', value) }}
        </v-chip>
      </template>

      <template #item.type="{ item }">
        <v-chip v-if="getType(item)" density="compact" rounded="lg" color="purple" label>
          {{ getType(item) }}
        </v-chip>
      </template>

      <template #item.specs="{ item }">
        <div v-if="isBoolSpec(item)">
          布尔值：
          <h-spec-chip :spec="getSpecs(item)"></h-spec-chip>
        </div>
        <div v-else-if="isEnumSpec(item)">
          枚举值：
          <h-spec-chip :spec="getSpecs(item)"></h-spec-chip>
        </div>
        <div v-else>{{ displayDataType(item) }}</div>
      </template>

      <template #item.actions="{ item }">
        <h-action-edit-button @click="openDialogForEdit(item)"></h-action-edit-button>
        <h-action-delete-button v-if="!item.reserved" @click="deleteItemById(item[rowKey])"></h-action-delete-button>
      </template>
    </h-data-table>
  </div>
  <h-add-function-dialog
    v-model="openDialog"
    v-model:entity="entity"
    :product-id="productId"
    :product-key="productKey"
  ></h-add-function-dialog>
</template>

<script setup lang="ts">
import type {
  TslFunctionEntity,
  TslFunctionConditions,
  TslFunctionProps,
  TslArgumentEntity,
  Specification,
  BoolSpecs,
  EnumSpecs,
} from '@herodotus/api';
import type { VDataTableHeaders } from '@/composables/declarations';

import { useTable, useDictionary } from '@/composables/hooks';
import { useTslEntity } from '../composables/hooks';
import { API, PAGE_NAME } from '@/configurations';

import HAddFunctionDialog from './HAddFunctionDialog.vue';
import HSpecChip from './HSpecChip.vue';
import { isEmpty } from 'lodash-es';

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

const {
  loading,
  pageNumber,
  pageSize,
  tableRows,
  totalPages,
  totalItems,
  conditions,
  deleteItemById,
  findItems,
  findItemsByPage,
} = useTable<TslFunctionConditions, TslFunctionEntity>(API.core.iotTslFunction(), PAGE_NAME.IOT_TSL_FUNCTION);

const { getDictionaryItemDisplay } = useDictionary('Dimension', 'ArgumentType', 'CallType', 'EventType');
const { getArgumentSpecs, getArgumentType } = useTslEntity();

const openDialog = shallowRef(false);
const entity = ref({}) as Ref<TslFunctionEntity>;

const isBoolSpec = (item: TslFunctionEntity) => {
  const specs = getArgumentSpecs(item);
  return !isEmpty(specs) && specs.dataType.type === 'bool';
};

const isEnumSpec = (item: TslFunctionEntity) => {
  const specs = getArgumentSpecs(item);
  return !isEmpty(specs) && specs.dataType.type === 'enum';
};

const displayDataType = (item: TslFunctionEntity) => {
  const specs = getArgumentSpecs(item);
  if (!isEmpty(specs)) {
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
  }

  return '-';
};

const getSpecs = (item: TslFunctionEntity) => {
  return getArgumentSpecs(item) as Specification<BoolSpecs> | Specification<EnumSpecs>;
};

const getType = (item: TslFunctionEntity) => {
  const type = getArgumentType(item);
  if (!isEmpty(type)) {
    return getDictionaryItemDisplay('ArgumentType', type);
  }
  return null;
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
    required: false,
    arguments: {
      property: {} as TslArgumentEntity,
      eventOutputData: [] as TslArgumentEntity[],
      serviceOutputData: [] as TslArgumentEntity[],
      serviceInputData: [] as TslArgumentEntity[],
    },
  } as TslFunctionEntity;
  openDialog.value = true;
};

const openDialogForEdit = (item: TslFunctionEntity) => {
  entity.value = item;
  openDialog.value = true;
};

const fetchItems = () => {
  if (props.productId) {
    findItemsByPage(pageNumber.value, pageSize.value, { productId: props.productId });
  }
};
</script>
