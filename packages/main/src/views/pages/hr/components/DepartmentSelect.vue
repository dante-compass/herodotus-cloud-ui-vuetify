<template>
  <v-select
    v-model="selectedValue"
    :items="options"
    item-title="departmentName"
    item-value="departmentId"
    chips
    closable-chips
    :error="hasError"
    :error-message="errorMessage"
    v-bind="$attrs"
  ></v-select>
</template>

<script setup lang="ts">
import type { SysDepartmentEntity } from '@herodotus/api';

import { API } from '@/configurations';
import { isEmpty } from 'lodash-es';

defineOptions({ name: 'DepartmentSelect' });

interface Props {
  organizationId?: string;
  errorMessage?: string;
}

const props = withDefaults(defineProps<Props>(), {
  organizationId: '',
});

const selectedValue = defineModel();

const options = ref([]) as Ref<Array<SysDepartmentEntity>>;

const loadData = (organizationId: string) => {
  API.core
    .sysDepartment()
    .fetchAll({ organizationId })
    .then((result) => {
      const data = result.data as Array<SysDepartmentEntity>;
      if (!isEmpty(data)) {
        options.value = data;
      }
    });
};

const hasError = computed(() => {
  return props.errorMessage ? true : false;
});

watch(
  () => props.organizationId,
  (newValue) => {
    if (newValue) {
      loadData(newValue);
    }
  },
  {
    immediate: true,
  },
);
</script>
