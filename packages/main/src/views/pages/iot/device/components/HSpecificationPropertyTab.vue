<template>HSpecificationPropertyTab</template>

<script setup lang="ts">
defineOptions({ name: 'HSpecificationPropertyTab' });

interface Props {
  productId: string;
  deviceId: string;
}

defineProps<Props>();
</script>
