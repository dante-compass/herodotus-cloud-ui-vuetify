<template>
  <h-action-button
    v-if="status"
    color="red"
    icon="mdi-delete-forever"
    tooltip="不允许删除的数据"
  ></h-action-button>
  <h-action-button
    v-else
    color="green"
    icon="mdi-delete-empty"
    tooltip="允许删除的数据"
  ></h-action-button>
</template>

<script setup lang="ts">
import HActionButton from './HActionButton.vue';
defineOptions({ name: 'HColumnReserved', components: { HActionButton } });

interface Props {
  status?: boolean;
}

withDefaults(defineProps<Props>(), {
  status: false,
});
</script>
