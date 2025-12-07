<template>
  <v-card class="mx-auto" rounded="xl" prepend-icon="mdi-warehouse" title="单位下设部门">
    <v-overlay v-model="loading" class="align-center justify-center" contained>
      <v-progress-circular color="primary" size="64" indeterminate></v-progress-circular>
    </v-overlay>
    <v-treeview
      v-if="!loading"
      v-model:activated="activated"
      :items="treeItems"
      item-value="id"
      item-title="name"
      activatable
      indent-lines="default"
      separate-roots
      open-all
      no-data-text="请先在右侧选择单位"
    ></v-treeview>
  </v-card>
</template>

<script setup lang="ts">
import type { SysDepartmentEntity, SysDepartmentConditions } from '@herodotus/api';

import { isArray } from 'lodash-es';
import { useTreeItem } from '@/composables/hooks';
import { API } from '@/configurations';

defineOptions({ name: 'DepartmentTree' });

interface Props {
  organizationId: string;
}

const props = withDefaults(defineProps<Props>(), {
  organizationId: '',
});

const selectedId = defineModel<string>({
  required: true,
});

const { treeItems, conditions, loading } = useTreeItem<
  SysDepartmentEntity,
  SysDepartmentConditions
>(API.core.sysDepartment());

const activated = computed({
  get: () => (selectedId.value ? [selectedId.value] : []),
  set: (value: unknown) => {
    if (value && isArray(value) && value.length > 0) {
      selectedId.value = value[0];
    } else {
      selectedId.value = '';
    }
  },
});

watch(
  () => props.organizationId,
  (newValue: string) => {
    if (newValue) {
      conditions.value.organizationId = newValue;
      selectedId.value = '';
    }
  },
);
</script>
