<template>
  <v-card class="mx-auto" rounded="xl" prepend-icon="mdi-domain" title="单位列表">
    <v-sheet class="pa-4">
      <h-dictionary-select
        v-model="conditions.category"
        dictionary="OrganizationCategory"
        label="组织类别"
        hide-details
      ></h-dictionary-select>
    </v-sheet>

    <v-sheet>
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
        return-object
        rounded
      ></v-treeview>

      <v-overlay v-model="loading" class="align-center justify-center" contained>
        <v-progress-circular color="primary" size="64" indeterminate></v-progress-circular>
      </v-overlay>
    </v-sheet>
  </v-card>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { Tree } from '@herodotus/core';
import type { SysOrganizationEntity, SysOrganizationConditions } from '@herodotus/api';

import { isArray, isEmpty } from 'lodash-es';
import { useTreeItem } from '@/composables/hooks';
import { API } from '@/configurations';

defineOptions({ name: 'OrganizationTree' });

const selectedValue = defineModel({
  type: Object as PropType<Tree>,
  required: true,
  default: () => {},
});

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

const { treeItems, conditions, loading } = useTreeItem<
  SysOrganizationEntity,
  SysOrganizationConditions
>(API.core.sysOrganization());
</script>
