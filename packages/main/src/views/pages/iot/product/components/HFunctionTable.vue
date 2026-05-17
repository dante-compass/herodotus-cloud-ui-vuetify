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
      @update:options="findItems"
    >
      <template #control>
        <v-btn prepend-icon="mdi-plus" text="新建功能" @click="openDialogForCreate"> </v-btn>
      </template>

      <template #item.dimension="{ value }">
        <v-chip v-if="value" density="compact" rounded="lg" color="cyan" label>
          {{ getDictionaryItemDisplay("Dimension", value) }}
        </v-chip>
      </template>

      <template #item.type="{ value }">
        {{ displayArgumentType(value) }}
      </template>

      <template #item.specs="{ value }">
        {{ displayDataType(value) }}
      </template>

      <template #item.actions="{ item }">
        <h-action-edit-button @click="openDialogForEdit(item)"></h-action-edit-button>
        <h-action-delete-button v-if="!item.reserved" @click="deleteItemById(item[rowKey])"></h-action-delete-button>
      </template>
    </h-data-table>

    <h-add-function-dialog
      v-model="openDialog"
      v-model:entity="entity"
      :product-id="productId"
      :product-key="productKey"
    ></h-add-function-dialog>
  </div>
</template>

<script setup lang="ts">
import type { TslFunctionEntity, TslFunctionConditions, TslFunctionProps, Specification, Specs } from "@herodotus/api";
import type { VDataTableHeaders } from "@/composables/declarations";

import { useTable, useDictionary } from "@/composables/hooks";
import { API, PAGE_NAME } from "@/configurations";

import HAddFunctionDialog from "./HAddFunctionDialog.vue";

defineOptions({ name: PAGE_NAME.IOT_TSL_FUNCTION, components: { HAddFunctionDialog } });

interface Props {
  productKey: string;
  productId: string;
}

const props = defineProps<Props>();

const headers = ref([
  { key: "dimension", align: "center", title: "功能类型" },
  { key: "name", align: "center", title: "功能名称" },
  { key: "identifier", align: "center", title: "标识符" },
  { key: "type", align: "center", title: "数据类型" },
  { key: "specs", align: "left", title: "数据定义" },
  { key: "actions", align: "center", title: "操作" },
]) as Ref<Array<VDataTableHeaders>>;

const rowKey: TslFunctionProps = "id";

const { loading, pageNumber, pageSize, tableRows, totalPages, totalItems, deleteItemById, findItems } = useTable<
  TslFunctionConditions,
  TslFunctionEntity
>(API.core.iotTslFunction(), PAGE_NAME.IOT_TSL_FUNCTION);

const { getDictionaryItemDisplay } = useDictionary("Dimension", "ArgumentType", "CallType", "EventType");

const openDialog = shallowRef(false);
const entity = ref({}) as Ref<TslFunctionEntity>;

const displayArgumentType = (item: TslFunctionEntity) => {
  if (item.dimension === "properties") {
    return getDictionaryItemDisplay("ArgumentType", item.type);
  } else {
    return "-";
  }
};

const convertRecordToMap = (obj: Record<string, string>) => {
  const result: Array<string> = [];
  Object.keys(obj).forEach((key) => {
    result.push([key, obj[key]].join(" ~ "));
  });
  return result.join(" <br/> ");
};

const displayDataType = (attribute: Specification<Specs>) => {
  switch (attribute.dataType.type) {
    case "int":
    case "float":
    case "double":
      return "取值范围：" + attribute.dataType.specs.min + "~" + attribute.dataType.specs.max;
    case "bool":
      return "布尔值：" + convertRecordToMap(attribute.dataType.specs);
    case "enum":
      return "枚举值：" + convertRecordToMap(attribute.dataType.specs);
    case "text":
      return "数据长度：" + attribute.dataType.specs.length;
    default:
      return "-";
  }
};

const openDialogForCreate = () => {
  entity.value = {
    dimension: "properties",
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
