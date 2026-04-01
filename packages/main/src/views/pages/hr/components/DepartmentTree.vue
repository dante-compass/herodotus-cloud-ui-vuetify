<template>
  <v-card class="mx-auto" prepend-icon="mdi-warehouse" title="下设部门">
    <v-divider></v-divider>

    <v-sheet>
      <v-overlay v-model="loading" class="align-center justify-center" contained>
        <v-progress-circular color="primary" indeterminate></v-progress-circular>
      </v-overlay>
      <v-treeview
        v-if="!loading && !hasNoDepartments"
        v-model:activated="activated"
        :items="treeItems"
        item-value="id"
        item-title="name"
        activatable
        indent-lines="default"
        density="compact"
        open-all
        separate-roots
        return-object
        rounded
        slim
      ></v-treeview>
    </v-sheet>
    <v-list v-if="hasNoDepartments" density="compact">
      <v-list-item title="没有数据"></v-list-item>
    </v-list>
  </v-card>
</template>

<script setup lang="ts">
import type { Tree } from '@herodotus/core';
import type { SysDepartmentEntity, SysDepartmentConditions } from '@herodotus/api';

import { isArray, isEmpty } from 'lodash-es';
import { useTreeItem } from '@/composables/hooks';
import { API } from '@/configurations';

defineOptions({ name: 'DepartmentTree' });

interface Props {
  organizationId: string;
}

const props = withDefaults(defineProps<Props>(), {
  organizationId: '',
});

const selectedValue = defineModel({
  type: Object as PropType<Tree>,
  required: true,
  default: () => {},
});

const { treeItems, conditions, loading } = useTreeItem<SysDepartmentConditions, SysDepartmentEntity>(
  API.core.sysDepartment(),
  false,
);

const activated = computed({
  get: () => (!isEmpty(selectedValue.value) ? [selectedValue.value] : []),
  set: (value: unknown) => {
    if (value && isArray(value) && value.length > 0) {
      selectedValue.value = value[0];
    } else {
      selectedValue.value = {} as Tree;
    }
  },
});

const hasNoDepartments = computed(() => {
  return isEmpty(treeItems.value);
});

watch(
  () => props.organizationId,
  (newValue: string) => {
    if (newValue) {
      conditions.value.organizationId = newValue;
      selectedValue.value = {} as Tree;
    }
  },
);
</script>
