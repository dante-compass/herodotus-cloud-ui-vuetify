<template>
  <v-container class="pa-0">
    <v-row>
      <v-col xl="2" lg="2" md="4" sm="6" xs="12">
        <h-oss-bucket-list v-model="currentBucketName"></h-oss-bucket-list>
      </v-col>
      <v-col xl="10" lg="10" md="8" sm="6" xs="12">
        <h-oss-object-list v-if="currentBucketName" v-model="currentBucketName"></h-oss-object-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import type { SysRoleEntity, SysRoleConditions, SysRoleProps } from '@herodotus/api';
import type { VDataTableHeaders } from '@/composables/declarations';

import { useTable } from '@/composables/hooks';
import { API, PAGE_NAME } from '@/configurations';
import { HOssBucketList, HOssObjectList } from '../components';

defineOptions({ name: PAGE_NAME.OSS_OBJECT, components: { HOssBucketList, HOssObjectList } });

const headers = ref([
  { key: 'roleName', align: 'center', title: '角色名称' },
  { key: 'roleCode', align: 'center', title: '角色代码' },
  { key: 'description', align: 'center', title: '备注' },
  { key: 'reserved', align: 'center', title: '保留数据' },
  { key: 'status', align: 'center', title: '状态' },
  { key: 'actions', align: 'center', title: '操作' },
]) as Ref<Array<VDataTableHeaders>>;

const rowKey: SysRoleProps = 'roleId';

const {
  loading,
  pageNumber,
  pageSize,
  tableRows,
  totalPages,
  totalItems,
  toEdit,
  toAuthorize,
  deleteItemById,
  findItems,
} = useTable<SysRoleConditions, SysRoleEntity>(API.core.sysRole(), PAGE_NAME.OSS_OBJECT);

const currentBucketName = shallowRef();
</script>
