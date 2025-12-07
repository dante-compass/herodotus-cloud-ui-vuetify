<template>
  <v-card class="mx-auto" rounded="xl" prepend-icon="mdi-domain" title="单位列表">
    <v-sheet class="pa-4">
      <h-dictionary-select
        v-model="conditions.category"
        dictionary="OrganizationCategory"
        label="组织类别"
      ></h-dictionary-select>
    </v-sheet>

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
      open-all
      separate-roots
    ></v-treeview>
  </v-card>
</template>

<script setup lang="ts">
import type { SysOrganizationEntity, SysOrganizationConditions } from '@herodotus/api';

import { isArray } from 'lodash-es';
import { useTreeItem } from '@/composables/hooks';
import { API } from '@/configurations';

defineOptions({ name: 'OrganizationTree' });

const selectedId = defineModel<string>({
  required: true,
});

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

const { treeItems, conditions, loading } = useTreeItem<
  SysOrganizationEntity,
  SysOrganizationConditions
>(API.core.sysOrganization());
</script>
