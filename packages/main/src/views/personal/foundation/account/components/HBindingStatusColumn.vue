<template>
  <v-chip v-if="bound" icon="mdi-checkbox-multiple-blank-circle" color="red" density="compact" rounded>使用中</v-chip>
  <v-chip v-else icon="mdi-checkbox-multiple-blank-circle" density="compact" rounded>未使用</v-chip>
</template>

<script setup lang="ts">
defineOptions({ name: 'HBindingStatusColumn' });

interface Props {
  bound?: boolean;
}

withDefaults(defineProps<Props>(), {
  bound: false,
});
</script>
