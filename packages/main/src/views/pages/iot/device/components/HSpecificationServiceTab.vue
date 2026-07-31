<template>
  <h-data-table
    v-model:page-size="pageSize"
    v-model:page-number="pageNumber"
    v-model:total-pages="totalPages"
    v-model:total-items="totalItems"
    :headers="headers"
    :items="tableRows"
    :item-value="rowKey"
    :loading="loading"
    :show-select="false"
    select-strategy="single"
    disable-sort
    @update:options="fetchItems"
  ></h-data-table>
</template>

<script setup lang="ts">
import type { TslFunctionProps } from '@herodotus/api';
import type { VDataTableHeaders } from '@/composables/declarations';

import { useTslFunctionTable } from '../../composables/hooks';

defineOptions({ name: 'HSpecificationPropertyTab' });

interface Props {
  productId: string;
  deviceId: string;
}

const props = defineProps<Props>();

const { loading, pageNumber, pageSize, tableRows, totalPages, totalItems, findServicesByPage } = useTslFunctionTable();

const headers = ref([
  { key: 'identifier', align: 'center', title: '服务标识符' },
  { key: 'name', align: 'center', title: '服务名称' },
  { key: 'actions', align: 'center', title: '操作' },
]) as Ref<Array<VDataTableHeaders>>;

const rowKey: TslFunctionProps = 'id';

watch(
  () => props.productId,
  (newValue) => {
    findServicesByPage(newValue);
  },
);

const fetchItems = () => {
  findServicesByPage(props.productId);
};
</script>
