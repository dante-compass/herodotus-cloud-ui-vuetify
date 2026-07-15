<template>
  <v-select
    v-model="selectedValue"
    :items="options"
    item-title="organizationName"
    item-value="organizationId"
    chips
    label="所属单位"
    placeholder="请选择所属单位"
    closable-chips
    :error="hasError"
    :error-message="errorMessage"
    v-bind="$attrs"
  ></v-select>
</template>

<script setup lang="ts">
import type { SysOrganizationEntity } from '@herodotus/api';

import { API } from '@/configurations';

defineOptions({ name: 'OrganizationSelect' });

interface Props {
  category?: number;
  errorMessage?: string;
}

const props = defineProps<Props>();

const selectedValue = defineModel();

const options = ref([]) as Ref<Array<SysOrganizationEntity>>;

const loadData = (category: number | string) => {
  API.core
    .sysOrganization()
    .fetchAll({ category: category })
    .then((result) => {
      const data = result.data as Array<SysOrganizationEntity>;
      options.value = data;
    });
};

const hasError = computed(() => {
  return props.errorMessage ? true : false;
});

watch(
  () => props.category,
  (newValue) => {
    if (newValue !== undefined) {
      loadData(newValue);
    }
  },
  {
    immediate: true,
  },
);
</script>
