<template>
  <div>ApplicationContent</div>
</template>

<script setup lang="ts">
import type { SysAttributeEntity } from '@herodotus/api';

import { useEntityTableItem } from '@/composables/hooks';
import { API } from '@/configurations';

defineOptions({ name: 'OssBucketContent' });

const { editedItem, operation, title, saveOrUpdate } = useEntityTableItem<SysAttributeEntity>(
  API.core.sysAttribute(),
);

const onSave = () => {
  saveOrUpdate();
};
</script>
