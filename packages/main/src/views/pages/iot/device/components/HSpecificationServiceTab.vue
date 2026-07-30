<template>HSpecificationServiceTab</template>

<script setup lang="ts">
defineOptions({ name: 'HSpecificationServiceTab' });

interface Props {
  productId: string;
  deviceId: string;
}

defineProps<Props>();
</script>
