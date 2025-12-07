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

defineOptions({ name: 'DepartmentSelect' });

interface Props {
  organizationId?: string;
  errorMessage?: string;
}

const props = withDefaults(defineProps<Props>(), {
  organizationId: '',
});

const selectedValue = defineModel({
  type: String,
});

const options = ref([]) as Ref<Array<SysDepartmentEntity>>;

const loadData = (organizationId: number | string) => {
  API.core
    .sysDepartment()
    .fetchAll({ organizationId })
    .then((result) => {
      const data = result.data as Array<SysDepartmentEntity>;
      options.value = data;
    });
};

const hasError = computed(() => {
  return props.errorMessage ? true : false;
});

onMounted(() => {
  loadData(props.organizationId);
});

watch(
  () => props.organizationId,
  (newValue) => {
    loadData(newValue);
  },
  {
    immediate: true,
  },
);
</script>
