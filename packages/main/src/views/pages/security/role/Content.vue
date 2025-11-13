<template>
  <div>ApplicationContent</div>
</template>

<script setup lang="ts">
import type { SysAttributeEntity } from '@herodotus/api';

import { useTableItem } from '@/composables/hooks';
import { API } from '@/configurations';

defineOptions({ name: 'SysAttributeContent' });

const { editedItem, operation, title, saveOrUpdate } = useTableItem<SysAttributeEntity>(
  API.core.sysAttribute(),
);

const onSave = () => {
  saveOrUpdate();
};
</script>
